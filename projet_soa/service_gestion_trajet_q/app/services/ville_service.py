# services/ville_service.py
from sqlalchemy.orm import Session
from sqlalchemy import distinct
from typing import List
from app.models.ligne import Ligne

class VilleService:
    
    @staticmethod
    def get_villes_desservies(db: Session) -> List[str]:
        """
        Récupère toutes les villes distinctes depuis la table lignes
        """
        villes = db.query(
            distinct(Ligne.ville)
        ).filter(
            Ligne.active == True
        ).order_by(
            Ligne.ville
        ).all()
        
        return [ville[0] for ville in villes]