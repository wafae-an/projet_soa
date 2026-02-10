from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from app.services.get_arrets_ville import ArretService

router = APIRouter()

@router.get("/villes/{ville}/arrets")
def get_arrets_ville(ville: str, db: Session = Depends(get_db)):
    """Récupère tous les arrêts d'une ville"""
    arrets = ArretService.get_arrets_by_ville(db, ville)
    return arrets