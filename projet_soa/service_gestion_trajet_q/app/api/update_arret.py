from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
import uuid
from datetime import datetime

from database import get_db
from app.schemas.update_arret import ArretUpdate  # Votre schéma existant
from app.models import Arret  # Votre modèle Arret

router = APIRouter()

@router.put("/arrets/{arret_id}")
def update_arret(arret_id: str, update_data: ArretUpdate, db: Session = Depends(get_db)):
    """Met à jour un arrêt existant - SEULS LES CHAMPS FOURNIS SONT MIS À JOUR"""
    try:
        arret = db.query(Arret).filter(Arret.id == arret_id).first()
        if not arret:
            raise HTTPException(status_code=404, detail="Arrêt non trouvé")
        
        # Mettre à jour seulement les champs qui sont fournis (non None)
        if update_data.nom is not None:
            arret.nom = update_data.nom
        if update_data.ville is not None:
            arret.ville = update_data.ville
        if update_data.latitude is not None:
            arret.latitude = update_data.latitude
        if update_data.longitude is not None:
            arret.longitude = update_data.longitude
        if update_data.code is not None:
            arret.code = update_data.code
        if update_data.adresse is not None:
            arret.adresse = update_data.adresse
        
            
        arret.updated_at = datetime.now()
        
        db.commit()
        db.refresh(arret)
        
        return {
            "message": "Arrêt mis à jour avec succès",
            "arret_id": arret_id
        }
        
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Erreur d'intégrité - vérifiez les données")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")