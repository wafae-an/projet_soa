from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
import uuid
from datetime import datetime

from app.models import Ligne, LigneArret
from app.schemas.ligne_arrets import LigneCreate


class LigneService:
    @staticmethod
    def create_ligne_with_arrets(db: Session, ligne_data: LigneCreate):
        """
        Crée une nouvelle ligne avec ses arrêts
        
        Args:
            ligne_data: Données de la ligne validées par le schéma Pydantic
        """
        try:
            # Créer la ligne
            ligne_id = str(uuid.uuid4())
            nouvelle_ligne = Ligne(
                id=ligne_id,
                numero=ligne_data.numero,
                nom=ligne_data.nom,
                ville=ligne_data.ville,
                active=True,
                created_at=datetime.now()
            )
            
            db.add(nouvelle_ligne)
            
            # Créer les arrêts de la ligne
            for arret_data in ligne_data.arrets:
                ligne_arret_id = str(uuid.uuid4())
                ligne_arret = LigneArret(
                    id=ligne_arret_id,
                    ligne_id=ligne_id,
                    arret_id=arret_data.arret_id,
                    ordre=arret_data.ordre,
                    temps_vers_prochain=arret_data.temps_vers_prochain,
                    distance_vers_prochain=arret_data.distance_vers_prochain,
                    direction=arret_data.direction
                )
                db.add(ligne_arret)
            
            db.commit()
            return {"message": "Ligne créée avec succès", "ligne_id": ligne_id}
            
        except IntegrityError:
            db.rollback()
            raise ValueError("Erreur d'intégrité - vérifiez les données")
        except Exception as e:
            db.rollback()
            raise e