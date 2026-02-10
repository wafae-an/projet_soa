from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from app.schemas.ligne_arrets import LigneCreate
from app.services.add_ligne import LigneService

router = APIRouter()

@router.post("/lignes")
def create_ligne(ligne_data: LigneCreate, db: Session = Depends(get_db)):
    """Crée une nouvelle ligne avec ses arrêts"""
    try:
        result = LigneService.create_ligne_with_arrets(db, ligne_data)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")