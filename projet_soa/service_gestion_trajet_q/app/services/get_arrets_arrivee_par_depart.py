# services/arret_service.py
from sqlalchemy.orm import Session
from typing import List, Dict, Any

class ArretService:
    
    @staticmethod
    def get_arrets_arrivee_par_depart(db: Session, ligne_id: str, arret_depart_id: str) -> Dict[str, Any]:
        """
        Récupère tous les arrêts d'arrivée possibles pour une ligne
        Exclut uniquement l'arrêt de départ choisi
        """
        from services.ligne_arret_service import LigneArretService
        
        # Récupérer tous les arrêts de la ligne dans l'ordre
        ligne_data = LigneArretService.get_arrets_par_ligne_ordre(db, ligne_id)
        
        if not ligne_data:
            return None
        
        # Filtrer pour exclure l'arrêt de départ
        arrets_arrivee = [arret for arret in ligne_data["arrets"] if arret["id"] != arret_depart_id]
        
        # Construire la réponse
        result = {
            "ligne": ligne_data["ligne"],
            "arret_depart": next(
                (arret for arret in ligne_data["arrets"] if arret["id"] == arret_depart_id), 
                None
            ),
            "arrets_arrivee": arrets_arrivee
        }
        
        return result