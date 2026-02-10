from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
import uuid
from app.models.arret import Arret
from app.schemas.arret_create import ArretCreate

class ArretService:
    @staticmethod
    def create_arret(db: Session, arret_data: ArretCreate):
        """
        Crée un nouvel arrêt avec toutes les informations
        
        Args:
            arret_data: Données de l'arrêt validées par le schéma Pydantic
        """
        try:
            # Générer un ID unique
            arret_id = str(uuid.uuid4())
            
            # Créer l'arrêt
            nouvel_arret = Arret(
                id=arret_id,
                nom=arret_data.nom,
                ville=arret_data.ville,
                latitude=arret_data.latitude,
                longitude=arret_data.longitude,
                code=arret_data.code,
                adresse=arret_data.adresse,
                
            )
            
            db.add(nouvel_arret)
            db.commit()
            db.refresh(nouvel_arret)
            
            return {
                "message": "Arrêt créé avec succès",
                "arret_id": arret_id,
                "arret": nouvel_arret
            }
            
        except IntegrityError:
            db.rollback()
            raise ValueError("Erreur: Un arrêt avec cet ID ou code existe déjà")
        except Exception as e:
            db.rollback()
            raise e

    @staticmethod
    def get_arret_by_id(db: Session, arret_id: str):
        """Récupère un arrêt par son ID"""
        return db.query(Arret).filter(Arret.id == arret_id).first()