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

class BusAssignmentUpdate(BaseModel):
    conducteur_id: int
    bus_ids: List[int]  # La nouvelle liste des IDs de bus assignés

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

@router.put(
    "/update-assignments/{ligne_id}",
    summary="Mettre à jour les assignations de bus pour un conducteur",
    description="Compare la nouvelle liste avec les assignations existantes et met à jour uniquement les changements"
)
async def update_bus_assignments(
    ligne_id: str,
    assignment_data: BusAssignmentUpdate,
    db: Session = Depends(get_db)
):
    try:
        conducteur_id = assignment_data.conducteur_id
        nouvelles_bus_ids = set(assignment_data.bus_ids)
        
        # 1. Récupérer les bus actuellement assignés à ce conducteur sur cette ligne
        bus_actuellement_assignes = db.query(Bus).filter(
            Bus.ligne_id == ligne_id,
            Bus.conducteur_id == conducteur_id,
            Bus.statut == 'en_service'
        ).all()
        
        bus_ids_actuels = {bus.id for bus in bus_actuellement_assignes}
        
        # 2. Identifier les changements
        bus_a_assigner = nouvelles_bus_ids - bus_ids_actuels
        bus_a_retirer = bus_ids_actuels - nouvelles_bus_ids
        
        print(f"Bus à assigner: {bus_a_assigner}")
        print(f"Bus à retirer: {bus_a_retirer}")
        
        # 3. RETIRER les assignations qui ne sont plus dans la nouvelle liste
        if bus_a_retirer:
            # Mettre conducteur_id = NULL pour ces bus
            db.query(Bus).filter(
                Bus.id.in_(bus_a_retirer),
                Bus.ligne_id == ligne_id,
                Bus.conducteur_id == conducteur_id
            ).update({"conducteur_id": None}, synchronize_session=False)
        
        # 4. ASSIGNER les nouveaux bus
        if bus_a_assigner:
            # Vérifier d'abord que ces bus sont disponibles (non assignés à d'autres conducteurs)
            bus_disponibles = db.query(Bus).filter(
                Bus.id.in_(bus_a_assigner),
                Bus.ligne_id == ligne_id,
                Bus.conducteur_id.is_(None)  # Doivent être sans conducteur
            ).all()
            
            bus_ids_disponibles = {bus.id for bus in bus_disponibles}
            bus_non_disponibles = bus_a_assigner - bus_ids_disponibles
            
            if bus_non_disponibles:
                raise HTTPException(
                    status_code=400,
                    detail=f"Les bus suivants ne sont pas disponibles: {list(bus_non_disponibles)}"
                )
            
            # Assigner les bus disponibles au conducteur
            db.query(Bus).filter(
                Bus.id.in_(bus_a_assigner),
                Bus.ligne_id == ligne_id
            ).update({"conducteur_id": conducteur_id}, synchronize_session=False)
        
        # 5. Valider les changements dans la base de données
        db.commit()
        
        return {
            "message": "Assignations mises à jour avec succès",
            "bus_assignes": len(nouvelles_bus_ids),
            "bus_ajoutes": len(bus_a_assigner),
            "bus_retires": len(bus_a_retirer),
            "bus_non_modifies": len(nouvelles_bus_ids & bus_ids_actuels),
            "details": {
                "bus_assignes_list": list(nouvelles_bus_ids),
                "bus_ajoutes_list": list(bus_a_assigner),
                "bus_retires_list": list(bus_a_retirer)
            }
        }

    except HTTPException:
        db.rollback()
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Erreur lors de la mise à jour des assignations: {str(e)}"
        )

# Endpoint pour assigner un bus individuellement (conservé pour compatibilité)
@router.put(
    "/{bus_id}/assign-conducteur",
    summary="Assigner un bus à un conducteur",
    description="Assigner un bus spécifique à un conducteur"
)
async def assign_bus_to_driver(
    bus_id: int,
    conducteur_data: dict,
    db: Session = Depends(get_db)
):
    try:
        conducteur_id = conducteur_data.get("conducteur_id")
        
        # Vérifier si le bus existe
        bus = db.query(Bus).filter(Bus.id == bus_id).first()
        if not bus:
            raise HTTPException(404, "Bus non trouvé")
        
        # Vérifier si le bus est disponible
        if bus.conducteur_id is not None:
            raise HTTPException(400, "Ce bus est déjà assigné à un conducteur")
        
        # Assigner le conducteur
        bus.conducteur_id = conducteur_id
        db.commit()
        
        return {"message": f"Bus {bus_id} assigné au conducteur {conducteur_id}"}
        
    except HTTPException:
        db.rollback()
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(500, f"Erreur lors de l'assignation: {str(e)}")

# Endpoint pour retirer un bus individuellement (conservé pour compatibilité)
@router.put(
    "/{bus_id}/unassign-conducteur",
    summary="Retirer l'assignation d'un bus",
    description="Retirer le conducteur assigné à un bus"
)
async def unassign_bus_from_driver(
    bus_id: int,
    db: Session = Depends(get_db)
):
    try:
        # Vérifier si le bus existe
        bus = db.query(Bus).filter(Bus.id == bus_id).first()
        if not bus:
            raise HTTPException(404, "Bus non trouvé")
        
        # Retirer l'assignation
        bus.conducteur_id = None
        db.commit()
        
        return {"message": f"Assignation retirée pour le bus {bus_id}"}
        
    except HTTPException:
        db.rollback()
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(500, f"Erreur lors du retrait: {str(e)}")

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