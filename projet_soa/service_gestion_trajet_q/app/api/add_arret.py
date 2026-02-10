from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from app.schemas.arret_create import ArretCreate
from app.services.add_arret import ArretService

router = APIRouter()

@router.post("/arrets/")
def create_arret(arret_data: ArretCreate, db: Session = Depends(get_db)):
    try:
        result = ArretService.create_arret(db, arret_data)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erreur serveur")