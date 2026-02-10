# routers/bus.py
from fastapi import APIRouter, HTTPException, Query, Depends
from sqlalchemy.orm import Session
from typing import List, Optional
from database import get_db
from pydantic import BaseModel
from app.models.bus import Bus

router = APIRouter(prefix="/bus", tags=["bus"])

class BusSimpleResponse(BaseModel):
    id: int
    numero_immatriculation: str
    modele: str
    capacite: int
    ville: str
    ligne_id: str
    conducteur_id: Optional[int]
    statut: str

    class Config:
        from_attributes = True

class BusAssignmentResponse(BaseModel):
    bus_disponibles: List[BusSimpleResponse]  # conducteur_id est NULL
    bus_assignes_au_conducteur: List[BusSimpleResponse]  # assignés au conducteur spécifié
    total_disponibles: int
    total_assignes: int

@router.get(
    "/assignment-status/{ligne_id}",
    response_model=BusAssignmentResponse,
    summary="Bus disponibles et bus assignés à un conducteur spécifique",
    description="Retourne les bus disponibles (sans conducteur) et les bus assignés à un conducteur spécifique pour une ligne donnée"
)
async def get_bus_assignment_status(
    ligne_id: str,
    conducteur_id: Optional[int] = Query(None, description="ID du conducteur spécifique"),
    db: Session = Depends(get_db)
):
    try:
        # Récupérer directement les bus disponibles (conducteur_id NULL) de la ligne
        bus_disponibles = db.query(Bus).filter(
            Bus.ligne_id == ligne_id,
            Bus.conducteur_id.is_(None),  # Uniquement les bus sans conducteur
            Bus.statut == 'en_service'
        ).all()
        
        # Récupérer les bus assignés au conducteur spécifique de la même ligne
        bus_assignes_au_conducteur = []
        if conducteur_id:
            bus_assignes_au_conducteur = db.query(Bus).filter(
                Bus.ligne_id == ligne_id,
                Bus.conducteur_id == conducteur_id,  # Uniquement les bus de ce conducteur
                Bus.statut == 'en_service'
            ).all()
        
        return BusAssignmentResponse(
            bus_disponibles=bus_disponibles,
            bus_assignes_au_conducteur=bus_assignes_au_conducteur,
            total_disponibles=len(bus_disponibles),
            total_assignes=len(bus_assignes_au_conducteur)
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erreur lors de la récupération des bus: {str(e)}"
        )

# Endpoint simple pour récupérer tous les bus (optionnel)
@router.get(
    "/simple",
    response_model=List[BusSimpleResponse],
    summary="Récupérer tous les bus simplement",
    description="Retourne la liste de tous les bus avec les informations basiques"
)
async def get_all_bus_simple(
    ligne_id: Optional[str] = Query(None, description="Filtrer par ligne"),
    conducteur_id: Optional[int] = Query(None, description="Filtrer par conducteur"),
    db: Session = Depends(get_db)
):
    try:
        query = db.query(Bus)
        
        # Appliquer les filtres si fournis
        if ligne_id:
            query = query.filter(Bus.ligne_id == ligne_id)
        if conducteur_id:
            query = query.filter(Bus.conducteur_id == conducteur_id)
        
        buses = query.all()
        return buses

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erreur lors de la récupération des bus: {str(e)}"
        )