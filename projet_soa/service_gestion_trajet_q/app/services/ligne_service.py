# services/ligne_service.py
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from app.models.ligne import Ligne
from app.models.arret import Arret
from app.models.ligne_arret import LigneArret

class LigneService:
    
    @staticmethod
    def get_lignes_avec_arrets(db: Session, ville: str) -> List[Dict[str, Any]]:
        """
        Récupère les lignes d'une ville avec les noms des arrêts ordonnés
        """
        try:
            # Récupérer les lignes actives de la ville
            lignes = db.query(Ligne).filter(
                Ligne.ville == ville,
                Ligne.active == True
            ).order_by(Ligne.numero).all()
            
            result = []
            
            for ligne in lignes:
                # Récupérer les noms des arrêts dans l'ordre
                arrets_query = db.query(
                    Arret.nom,
                    LigneArret.ordre
                ).join(
                    LigneArret, LigneArret.arret_id == Arret.id
                ).filter(
                    LigneArret.ligne_id == ligne.id
                ).order_by(
                    LigneArret.ordre
                ).all()
                
                # Extraire seulement les noms des arrêts ordonnés
                noms_arrets = [arret_nom for arret_nom, ordre in arrets_query]
                
                # Construire la réponse pour la ligne
                ligne_data = {
                    "id": ligne.id,
                    "numero": ligne.numero,
                    "nom": ligne.nom,
                    "ville": ligne.ville,
                    "arrets": noms_arrets,
                    "nombre_arrets": len(noms_arrets)
                }
                
                result.append(ligne_data)
            
            return result
            
        except Exception as e:
            print(f"Erreur dans get_lignes_avec_arrets: {str(e)}")
            raise e