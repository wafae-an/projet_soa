# api/lignes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from database import get_db
from app.services.ligne_service import LigneService
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/villes/{ville_nom}/lignes", response_model=dict)
def get_lignes_avec_noms_arrets(ville_nom: str, db: Session = Depends(get_db)):
    """
    Récupère les lignes d'une ville avec les noms des arrêts
    """
    try:
        logger.info(f"Récupération des lignes avec arrêts pour: {ville_nom}")
        
        # Normaliser le nom de la ville
        ville_normalisee = ville_nom.strip().capitalize()
        
        # Appeler le service
        lignes = LigneService.get_lignes_avec_arrets(db, ville_normalisee)
        
        logger.info(f"Nombre de lignes trouvées: {len(lignes)}")
        
        return {
            "success": True,
            "data": lignes,
            "count": len(lignes),
            "ville": ville_normalisee
        }
        
    except Exception as e:
        logger.error(f"Erreur dans get_lignes_avec_noms_arrets: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Erreur interne: {str(e)}")