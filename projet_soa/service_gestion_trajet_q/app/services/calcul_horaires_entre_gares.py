# service_horaires_complet.py
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, time
from typing import List, Dict, Any
from sqlalchemy import text
from decimal import Decimal

class ServiceHorairesComplet:
    def __init__(self, db: Session):
        self.db = db
    
    def calculer_horaires_auto_direction(
        self, 
        ligne_id: str, 
        arret_depart_id: str, 
        arret_arrivee_id: str, 
        date_recherche: str
    ) -> Dict[str, Any]:
        """
        Service principal qui :
        1. Détermine automatiquement la direction
        2. Calcule tous les horaires entre les 2 gares
        """
        
        try:
            # ÉTAPE 1: Détermination automatique de la direction
            direction = self._determiner_direction_auto(ligne_id, arret_depart_id, arret_arrivee_id)
            
            # ÉTAPE 2: Récupération du template horaire
            template = self._get_template_horaire(ligne_id, direction, date_recherche)
            
            # ÉTAPE 3: Calcul du temps de trajet
            temps_trajet = self._calculer_temps_trajet(ligne_id, arret_depart_id, arret_arrivee_id, direction)
            
            # ÉTAPE 4: Calcul du décalage depuis le départ
            decalage_depart = self._calculer_decalage_depuis_depart(ligne_id, arret_depart_id, direction)
            
            # ÉTAPE 5: Génération de tous les horaires
            horaires = self._generer_tous_les_horaires(
                template, decalage_depart, temps_trajet, 
                ligne_id, arret_depart_id, arret_arrivee_id, direction, date_recherche
            )
            
            return {
                "success": True,
                "ligne_id": ligne_id,
                "arret_depart_id": arret_depart_id,
                "arret_arrivee_id": arret_arrivee_id,
                "direction_auto": direction,
                "date_recherche": date_recherche,
                "temps_trajet_minutes": temps_trajet,
                "nombre_horaires": len(horaires),
                "horaires": horaires
            }
            
        except Exception as e:
            self.db.rollback()
            return {
                "success": False,
                "error": str(e)
            }
    
    def _determiner_direction_auto(self, ligne_id: str, depart_id: str, arrivee_id: str) -> str:
        """Détermine automatiquement ALLER ou RETOUR"""
        
        if depart_id == arrivee_id:
            raise ValueError("La gare de départ et d'arrivée doivent être différentes")
        
        # Récupérer l'ordre des gares dans le sens ALLER
        query = text("""
            SELECT arret_id, ordre 
            FROM ligne_arrets 
            WHERE ligne_id = :ligne_id AND direction = 'ALLER'
            AND arret_id IN (:depart_id, :arrivee_id)
        """)
        result = self.db.execute(query, {
            'ligne_id': ligne_id,
            'depart_id': depart_id,
            'arrivee_id': arrivee_id
        })
        gares = result.fetchall()
        
        if len(gares) != 2:
            raise ValueError("Une ou plusieurs gares non trouvées dans la ligne")
        
        # Trouver les ordres
        ordre_depart = None
        ordre_arrivee = None
        
        for arret_id, ordre in gares:
            if arret_id == depart_id:
                ordre_depart = ordre
            if arret_id == arrivee_id:
                ordre_arrivee = ordre
        
        if ordre_depart is None or ordre_arrivee is None:
            raise ValueError("Impossible de déterminer l'ordre des gares")
        
        # Déterminer la direction
        if ordre_depart < ordre_arrivee:
            return "ALLER"
        else:
            return "RETOUR"
    
    def _get_template_horaire(self, ligne_id: str, direction: str, date_str: str) -> Dict:
        """Récupère le template horaire pour la ligne et la date"""
        jour_semaine = self._get_jour_semaine(date_str)
        
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
            raise ValueError(f"Aucun horaire trouvé pour {ligne_id} - {direction}")
        
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
        
        # Convertir les valeurs SQL en objets time Python et int
        return {
            'heure_premier_depart': self._convert_to_time(template[0]),
            'heure_dernier_depart': self._convert_to_time(template[1]),
            'frequence': self._convert_to_int(template[2])
        }
    
    def _convert_to_time(self, value) -> time:
        """Convertit une valeur SQL en objet datetime.time"""
        if isinstance(value, time):
            return value
        elif isinstance(value, timedelta):
            # Si c'est un timedelta, le convertir en time
            total_seconds = int(value.total_seconds())
            hours = (total_seconds // 3600) % 24
            minutes = (total_seconds % 3600) // 60
            seconds = total_seconds % 60
            return time(hours, minutes, seconds)
        elif isinstance(value, str):
            # Si c'est une chaîne, la parser
            return datetime.strptime(value, '%H:%M:%S').time()
        else:
            raise ValueError(f"Type non supporté pour conversion en time: {type(value)}")
    
    def _convert_to_int(self, value) -> int:
        """Convertit une valeur SQL en entier Python"""
        if isinstance(value, int):
            return value
        elif isinstance(value, Decimal):
            return int(value)
        elif isinstance(value, float):
            return int(value)
        elif isinstance(value, str):
            return int(value)
        else:
            raise ValueError(f"Type non supporté pour conversion en int: {type(value)}")
    
    def _calculer_temps_trajet(self, ligne_id: str, depart_id: str, arrivee_id: str, direction: str) -> int:
        """Calcule le temps de trajet entre deux gares"""
        
        # Récupérer l'ordre des gares dans ALLER
        query = text("""
            SELECT ordre, arret_id 
            FROM ligne_arrets 
            WHERE ligne_id = :ligne_id AND direction = 'ALLER'
            ORDER BY ordre
        """)
        result = self.db.execute(query, {'ligne_id': ligne_id})
        gares_aller = result.fetchall()
        
        # Créer un mapping arret_id → ordre
        ordre_par_arret = {}
        for ordre, arret_id in gares_aller:
            ordre_par_arret[arret_id] = ordre
        
        # Vérifier que les arrêts existent
        if depart_id not in ordre_par_arret or arrivee_id not in ordre_par_arret:
            raise ValueError("Gare de départ ou d'arrivée non trouvée")
        
        ordre_depart = ordre_par_arret[depart_id]
        ordre_arrivee = ordre_par_arret[arrivee_id]
        
        # Pour RETOUR, inverser les ordres pour le calcul
        if direction == "RETOUR":
            # En RETOUR, on part d'un ordre supérieur vers un ordre inférieur
            if ordre_depart <= ordre_arrivee:
                raise ValueError("Pour RETOUR, l'ordre départ doit être > ordre arrivée")
            
            # Mais le temps de trajet est le même que ALLER dans l'autre sens
            # On calcule ALLER(ordre_arrivee → ordre_depart)
            ordre_min = ordre_arrivee
            ordre_max = ordre_depart
        else:  # ALLER
            if ordre_depart >= ordre_arrivee:
                raise ValueError("Pour ALLER, l'ordre départ doit être < ordre arrivée")
            
            ordre_min = ordre_depart
            ordre_max = ordre_arrivee
        
        # Calculer le temps total (toujours avec direction='ALLER')
        query = text("""
            SELECT SUM(temps_vers_prochain) 
            FROM ligne_arrets 
            WHERE ligne_id = :ligne_id AND direction = 'ALLER'
            AND ordre >= :ordre_min AND ordre < :ordre_max
        """)
        result = self.db.execute(query, {
            'ligne_id': ligne_id,
            'ordre_min': ordre_min,
            'ordre_max': ordre_max
        })
        temps_result = result.fetchone()
        
        # Convertir le résultat en int
        temps = temps_result[0] if temps_result[0] else 0
        return self._convert_to_int(temps)
    
    def _calculer_decalage_depuis_depart(self, ligne_id: str, arret_id: str, direction: str) -> int:
        """Calcule le décalage depuis la gare de départ principale"""
        
        # Récupérer l'ordre de la gare dans ALLER
        query = text("""
            SELECT ordre FROM ligne_arrets 
            WHERE ligne_id = :ligne_id AND arret_id = :arret_id AND direction = 'ALLER'
        """)
        result = self.db.execute(query, {
            'ligne_id': ligne_id,
            'arret_id': arret_id
        })
        ordre_result = result.fetchone()
        
        if not ordre_result:
            raise ValueError(f"Gare {arret_id} non trouvée dans {ligne_id}")
        
        ordre_gare = ordre_result[0]
        
        if direction == "ALLER":
            # Pour ALLER : temps depuis le premier arrêt (ordre=1)
            if ordre_gare == 1:
                return 0
            
            query = text("""
                SELECT SUM(temps_vers_prochain) 
                FROM ligne_arrets 
                WHERE ligne_id = :ligne_id AND direction = 'ALLER'
                AND ordre >= 1 AND ordre < :ordre_gare
            """)
            result = self.db.execute(query, {
                'ligne_id': ligne_id,
                'ordre_gare': ordre_gare
            })
            
        else:  # RETOUR
            # Pour RETOUR : temps depuis le DERNIER arrêt du RETOUR
            # Mais comme on n'a pas de données RETOUR, on calcule depuis le dernier arrêt d'ALLER
            
            # D'abord, trouver le dernier ordre
            query_max = text("""
                SELECT MAX(ordre) FROM ligne_arrets 
                WHERE ligne_id = :ligne_id AND direction = 'ALLER'
            """)
            result_max = self.db.execute(query_max, {'ligne_id': ligne_id})
            max_ordre = result_max.fetchone()[0]
            
            # Pour RETOUR, le "premier départ" est au dernier arrêt d'ALLER
            # Le décalage = temps du dernier arrêt jusqu'à notre arrêt (en sens inverse)
            
            if ordre_gare == max_ordre:
                # Si on part du dernier arrêt, pas de décalage
                return 0
            
            # Temps depuis le dernier arrêt jusqu'à notre arrêt (en sens inverse)
            # = temps total de notre arrêt jusqu'au dernier arrêt (en ALLER)
            query = text("""
                SELECT SUM(temps_vers_prochain) 
                FROM ligne_arrets 
                WHERE ligne_id = :ligne_id AND direction = 'ALLER'
                AND ordre >= :ordre_gare AND ordre < :max_ordre
            """)
            result = self.db.execute(query, {
                'ligne_id': ligne_id,
                'ordre_gare': ordre_gare,
                'max_ordre': max_ordre
            })
        
        temps_result = result.fetchone()
        temps = temps_result[0] if temps_result[0] else 0
        return self._convert_to_int(temps)
    
    def _generer_tous_les_horaires(
        self, template: Dict, decalage: int, temps_trajet: int,
        ligne_id: str, depart_id: str, arrivee_id: str, direction: str, date_recherche: str
    ) -> List[Dict]:
        """Génère tous les horaires du début à la fin du service"""
        
        # Ajuster l'heure de premier départ pour la gare spécifique
        premier_depart_gare = self._ajuster_heure(template['heure_premier_depart'], decalage)
        
        # L'heure de dernier départ reste celle du template
        dernier_depart_service = template['heure_dernier_depart']
        
        # Générer tous les horaires de départ
        horaires_depart = self._generer_horaires_depart(
            premier_depart_gare, dernier_depart_service, template['frequence']
        )
        
        # Calculer les horaires d'arrivée
        horaires_complets = []
        for heure_depart in horaires_depart:
            heure_arrivee = self._ajuster_heure(heure_depart, temps_trajet)
            
            horaires_complets.append({
                'ligne_id': ligne_id,
                'arret_depart_id': depart_id,
                'arret_arrivee_id': arrivee_id,
                'direction': direction,
                'heure_depart': heure_depart.strftime('%H:%M:%S'),
                'heure_arrivee': heure_arrivee.strftime('%H:%M:%S'),
                'duree_minutes': temps_trajet,
                'date_validite': date_recherche
            })
        
        return horaires_complets
    
    def _generer_horaires_depart(self, heure_premier: time, heure_dernier: time, frequence: int) -> List[time]:
        """Génère tous les horaires de départ"""
        horaires = []
        
        # Convertir les time en datetime pour les calculs
        heure_courante = datetime.combine(datetime.today(), heure_premier)
        derniere_heure = datetime.combine(datetime.today(), heure_dernier)
        
        while heure_courante <= derniere_heure:
            # Ajouter l'heure (time) à la liste
            horaires.append(heure_courante.time())
            heure_courante += timedelta(minutes=frequence)
            
            # Sécurité pour éviter les boucles infinies
            if len(horaires) > 200:
                break
        
        return horaires
    
    def _ajuster_heure(self, heure_base: time, minutes_ajout: int) -> time:
        """Ajoute des minutes à une heure"""
        try:
            # Vérifier que l'heure_base est bien un time
            if not isinstance(heure_base, time):
                raise ValueError(f"Type d'heure_base invalide. Attendu: datetime.time, Reçu: {type(heure_base)}")
            
            # S'assurer que minutes_ajout est un entier
            minutes_ajout = self._convert_to_int(minutes_ajout)
            
            # Convertir l'heure en datetime pour pouvoir ajouter des minutes
            base_datetime = datetime.combine(datetime.today(), heure_base)
            nouvelle_heure = base_datetime + timedelta(minutes=minutes_ajout)
            return nouvelle_heure.time()
            
        except Exception as e:
            raise ValueError(f"Erreur ajustement heure: {heure_base} + {minutes_ajout}min - {str(e)}")
    
    def _get_jour_semaine(self, date_str: str) -> str:
        """Convertit une date en jour de la semaine"""
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