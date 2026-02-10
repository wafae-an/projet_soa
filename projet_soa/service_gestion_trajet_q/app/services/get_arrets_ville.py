# Note: pour builder et lancer le service via Docker Compose, voir les commentaires en tête de docker-compose.yml
from sqlalchemy.orm import Session
from typing import List, Optional
from app.models import Arret, LigneArret, Ligne
from sqlalchemy.orm import joinedload

class ArretService:
    @staticmethod
    def get_arrets_by_ville(db: Session, ville: str) -> List[dict]:
        """Récupère tous les arrêts d'une ville avec leurs lignes associées"""
        arrets = db.query(Arret)\
                  .filter(Arret.ville == ville)\
                  .all()
        
        result = []
        for arret in arrets:
            # Récupérer les lignes associées à cet arrêt
            ligne_arrets = db.query(LigneArret)\
                            .join(Ligne, LigneArret.ligne_id == Ligne.id)\
                            .filter(LigneArret.arret_id == arret.id)\
                            .all()
            
            lignes_associees = []
            for la in ligne_arrets:
                ligne = db.query(Ligne).filter(Ligne.id == la.ligne_id).first()
                if ligne:
                    lignes_associees.append({
                        "ligne_id": ligne.id,
                        "numero": ligne.numero,
                        "nom_ligne": ligne.nom,
                        "ordre": la.ordre,
                        "direction": la.direction
                    })
            
            # Inclure tous les champs avec des valeurs par défaut si None
            result.append({
                "id": arret.id,
                "nom": arret.nom,
                "ville": arret.ville,
                "latitude": arret.latitude,
                "longitude": arret.longitude,
                "actif": arret.actif if arret.actif is not None else True,
                "code": arret.code if arret.code else f"CODE_{arret.id}",
                "adresse": arret.adresse if arret.adresse else "Adresse non spécifiée",
               
                "lignes": sorted(lignes_associees, key=lambda x: x["ordre"])
            })
        
        return result