# main.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from app.services.calcul_horaires_entre_gares import ServiceHorairesComplet
from database import get_db

router = APIRouter()

class HoraireResponse(BaseModel):
    ligne_id: str
    arret_depart_id: str
    arret_arrivee_id: str
    direction: str
    heure_depart: str
    heure_arrivee: str
    duree_minutes: int
    date_validite: str

class CalculHorairesResponse(BaseModel):
    success: bool
    ligne_id: str
    arret_depart_id: str
    arret_arrivee_id: str
    direction_auto: str
    date_recherche: str
    temps_trajet_minutes: int
    nombre_horaires: int
    horaires: List[HoraireResponse]
    error: Optional[str] = None

@router.get("/api/horaires", response_model=CalculHorairesResponse)
def calculer_horaires(
    ligne_id: str,
    arret_depart_id: str,
    arret_arrivee_id: str,
    date_recherche: str,
    db: Session = Depends(get_db)
):
    """
    GET - Calcule automatiquement les horaires entre 2 gares
    - Détermine automatiquement la direction
    - Calcule tous les horaires de la journée
    """
    try:
        service = ServiceHorairesComplet(db)
        result = service.calculer_horaires_auto_direction(
            ligne_id=ligne_id,
            arret_depart_id=arret_depart_id,
            arret_arrivee_id=arret_arrivee_id,
            date_recherche=date_recherche
        )
        
        if not result["success"]:
            raise HTTPException(status_code=400, detail=result["error"])
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur interne du serveur: {str(e)}")