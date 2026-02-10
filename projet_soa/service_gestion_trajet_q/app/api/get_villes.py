# api/villes.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from app.services.ville_service import VilleService

router = APIRouter()

@router.get("/villes", response_model=dict)
def get_villes(db: Session = Depends(get_db)):
    """
    Récupère la liste de toutes les villes desservies
    """
    villes = VilleService.get_villes_desservies(db)
    
    return {
        "success": True,
        "data": villes,
        "count": len(villes)
    }