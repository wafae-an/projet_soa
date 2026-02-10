# calcul_horaires.py
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, time
from typing import List, Dict, Optional
from sqlalchemy import text

class CalculateurHoraires:
    def __init__(self, db: Session):
        self.db = db
    
    def get_jour_semaine(self, date_str: str) -> str:
        """
        Convertit une date en jour de la semaine pour la base de données
        """
        date_obj = datetime.strptime(date_str, '%Y-%m-%d')
        jours = {
            1: 'lundi',
            2: 'mardi', 
            3: 'mercredi',
            4: 'jeudi',
            5: 'vendredi',
            6: 'samedi',
            7: 'dimanche'
        }
        return jours[date_obj.isoweekday()]
    
    def calculer_temps_trajet(self, ligne_id: str, arret_depart_id: str, arret_arrivee_id: str, direction: str) -> int:
        """
        Calcule le temps de trajet entre deux gares sur une ligne
        """
        try:
            # Récupérer l'ordre des deux gares
            query = text("""
                SELECT ordre, arret_id 
                FROM ligne_arrets 
                WHERE ligne_id = :ligne_id AND direction = :direction
                ORDER BY ordre
            """)
            result = self.db.execute(query, {
                'ligne_id': ligne_id, 
                'direction': direction
            })
            gares = result.fetchall()
            
            # Trouver les ordres de départ et d'arrivée
            ordre_depart = None
            ordre_arrivee = None
            
            for ordre, arret_id in gares:
                if arret_id == arret_depart_id:
                    ordre_depart = ordre
                if arret_id == arret_arrivee_id:
                    ordre_arrivee = ordre
            
            if ordre_depart is None or ordre_arrivee is None:
                raise ValueError("Gare de départ ou d'arrivée non trouvée dans la ligne")
            
            if ordre_depart >= ordre_arrivee:
                raise ValueError("La gare de départ doit être avant la gare d'arrivée dans cette direction")
            
            # Calculer le temps total
            query = text("""
                SELECT SUM(temps_vers_prochain) 
                FROM ligne_arrets 
                WHERE ligne_id = :ligne_id AND direction = :direction 
                AND ordre >= :ordre_depart AND ordre < :ordre_arrivee
            """)
            result = self.db.execute(query, {
                'ligne_id': ligne_id,
                'direction': direction,
                'ordre_depart': ordre_depart,
                'ordre_arrivee': ordre_arrivee
            })
            temps_result = result.fetchone()
            
            return temps_result[0] if temps_result[0] else 0
            
        except Exception as e:
            self.db.rollback()
            raise e
    
    def get_template_horaire(self, ligne_id: str, direction: str, date_str: str) -> Dict:
        """
        Récupère le template d'horaire pour une ligne, direction et date
        """
        jour_semaine = self.get_jour_semaine(date_str)
        
        query = text("""
            SELECT heure_premier_depart, heure_dernier_depart, frequence,
                   lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche
            FROM templates_horaires 
            WHERE ligne_id = :ligne_id AND direction = :direction
        """)
        result = self.db.execute(query, {
            'ligne_id': ligne_id, 
            'direction': direction
        })
        template = result.fetchone()
        
        if not template:
            raise ValueError(f"Aucun template d'horaire trouvé pour {ligne_id} - {direction}")
        
        # Vérifier si le service est actif ce jour
        jours_actifs = {
            'lundi': bool(template[3]),
            'mardi': bool(template[4]),
            'mercredi': bool(template[5]),
            'jeudi': bool(template[6]),
            'vendredi': bool(template[7]),
            'samedi': bool(template[8]),
            'dimanche': bool(template[9])
        }
        
        if not jours_actifs[jour_semaine]:
            raise ValueError(f"Aucun service pour {ligne_id} le {jour_semaine}")
        
        return {
            'heure_premier_depart': template[0],
            'heure_dernier_depart': template[1],
            'frequence': template[2]
        }
    
    def calculer_decalage_depuis_depart(self, ligne_id: str, arret_id: str, direction: str) -> int:
        """
        Calcule le décalage temporel depuis la gare de départ principale
        """
        try:
            # Trouver l'ordre de la gare
            query = text("""
                SELECT ordre FROM ligne_arrets 
                WHERE ligne_id = :ligne_id AND arret_id = :arret_id AND direction = :direction
            """)
            result = self.db.execute(query, {
                'ligne_id': ligne_id,
                'arret_id': arret_id,
                'direction': direction
            })
            ordre_result = result.fetchone()
            
            if not ordre_result:
                raise ValueError(f"Gare {arret_id} non trouvée dans la ligne {ligne_id}")
            
            ordre_gare = ordre_result[0]
            
            # Si c'est la première gare, décalage = 0
            if ordre_gare == 1:
                return 0
            
            # Calculer le temps cumulé depuis le départ
            query = text("""
                SELECT SUM(temps_vers_prochain) 
                FROM ligne_arrets 
                WHERE ligne_id = :ligne_id AND direction = :direction 
                AND ordre >= 1 AND ordre < :ordre_gare
            """)
            result = self.db.execute(query, {
                'ligne_id': ligne_id,
                'direction': direction,
                'ordre_gare': ordre_gare
            })
            temps_result = result.fetchone()
            
            return temps_result[0] if temps_result[0] else 0
            
        except Exception as e:
            self.db.rollback()
            raise e
    
    def ajuster_heure(self, heure_base: time, minutes_ajout: int) -> time:
        """
        Ajoute des minutes à une heure et retourne un objet time
        """
        base_datetime = datetime.combine(datetime.today(), heure_base)
        nouvelle_heure = base_datetime + timedelta(minutes=minutes_ajout)
        return nouvelle_heure.time()
    
    def generer_horaires_depart(self, heure_premier: time, heure_dernier: time, frequence: int) -> List[time]:
        """
        Génère tous les horaires de départ entre première et dernière heure
        """
        horaires = []
        
        heure_courante = datetime.combine(datetime.today(), heure_premier)
        derniere_heure = datetime.combine(datetime.today(), heure_dernier)
        
        while heure_courante.time() <= heure_dernier:
            horaires.append(heure_courante.time())
            heure_courante += timedelta(minutes=frequence)
            
            # Éviter une boucle infinie
            if len(horaires) > 200:
                break
        
        return horaires
    
    def calculer_horaires_entre_gares(
        self,
        ligne_id: str,
        arret_depart_id: str,
        arret_arrivee_id: str,
        date_recherche: str,
        direction: str = 'ALLER',
        heure_debut: Optional[str] = None,
        heure_fin: Optional[str] = None
    ) -> List[Dict]:
        """
        Calcule tous les horaires possibles entre deux gares pour une journée
        
        Args:
            ligne_id: ID de la ligne
            arret_depart_id: ID de la gare de départ
            arret_arrivee_id: ID de la gare d'arrivée
            date_recherche: Date au format 'YYYY-MM-DD'
            direction: 'ALLER' ou 'RETOUR'
            heure_debut: Heure de début de recherche (format 'HH:MM:SS') - optionnel
            heure_fin: Heure de fin de recherche (format 'HH:MM:SS') - optionnel
        
        Returns:
            Liste des horaires avec départ et arrivée
        """
        try:
            # 1. Récupérer le template d'horaire
            template = self.get_template_horaire(ligne_id, direction, date_recherche)
            
            # 2. Calculer le décalage pour la gare de départ
            decalage_depart = self.calculer_decalage_depuis_depart(ligne_id, arret_depart_id, direction)
            
            # 3. Calculer le temps de trajet entre les deux gares
            temps_trajet = self.calculer_temps_trajet(ligne_id, arret_depart_id, arret_arrivee_id, direction)
            
            # 4. Calculer les heures ajustées pour la gare de départ
            premier_depart_gare = self.ajuster_heure(template['heure_premier_depart'], decalage_depart)
            dernier_depart_gare = self.ajuster_heure(template['heure_dernier_depart'], decalage_depart)
            
            # 5. Appliquer les filtres heure_debut/heure_fin si spécifiés
            if heure_debut:
                heure_debut_obj = datetime.strptime(heure_debut, '%H:%M:%S').time()
                premier_depart_gare = max(premier_depart_gare, heure_debut_obj)
            
            if heure_fin:
                heure_fin_obj = datetime.strptime(heure_fin, '%H:%M:%S').time()
                dernier_depart_gare = min(dernier_depart_gare, heure_fin_obj)
            
            # 6. Générer les horaires de départ
            horaires_depart = self.generer_horaires_depart(
                premier_depart_gare, 
                dernier_depart_gare, 
                template['frequence']
            )
            
            # 7. Calculer les horaires d'arrivée
            horaires_complets = []
            for heure_depart in horaires_depart:
                heure_arrivee = self.ajuster_heure(heure_depart, temps_trajet)
                horaires_complets.append({
                    'ligne_id': ligne_id,
                    'arret_depart_id': arret_depart_id,
                    'arret_arrivee_id': arret_arrivee_id,
                    'direction': direction,
                    'heure_depart': heure_depart.strftime('%H:%M:%S'),
                    'heure_arrivee': heure_arrivee.strftime('%H:%M:%S'),
                    'duree_minutes': temps_trajet,
                    'date_validite': date_recherche
                })
            
            return horaires_complets
            
        except Exception as e:
            self.db.rollback()
            raise e


# Fonction principale pour utilisation externe
def calculer_horaires_entre_gares(
    db: Session,
    ligne_id: str,
    arret_depart_id: str,
    arret_arrivee_id: str,
    date_recherche: str,
    direction: str = 'ALLER',
    heure_debut: Optional[str] = None,
    heure_fin: Optional[str] = None
) -> List[Dict]:
    """
    Fonction principale pour calculer les horaires entre deux gares
    """
    calculateur = CalculateurHoraires(db)
    return calculateur.calculer_horaires_entre_gares(
        ligne_id=ligne_id,
        arret_depart_id=arret_depart_id,
        arret_arrivee_id=arret_arrivee_id,
        date_recherche=date_recherche,
        direction=direction,
        heure_debut=heure_debut,
        heure_fin=heure_fin
    )


# Exemple d'utilisation
if __name__ == "__main__":
    from database import SessionLocal  # Importez votre SessionLocal
    
    # Test de la fonction
    with SessionLocal() as db:
        try:
            horaires = calculer_horaires_entre_gares(
                db=db,
                ligne_id="RABAT-TEMMARA",
                arret_depart_id="RABAT",
                arret_arrivee_id="OUSIS",
                date_recherche="2024-01-15",  # Un lundi
                direction="ALLER",
                heure_debut="06:00:00",
                heure_fin="20:00:00"
            )
            
            print(f"Nombre d'horaires trouvés: {len(horaires)}")
            for horaire in horaires[:5]:  # Afficher les 5 premiers
                print(f"Départ: {horaire['heure_depart']} - Arrivée: {horaire['heure_arrivee']} - Durée: {horaire['duree_minutes']}min")
                
        except Exception as e:
            print(f"Erreur: {e}")