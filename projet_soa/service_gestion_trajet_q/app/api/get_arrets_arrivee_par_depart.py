# api/arrets.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from app.services.get_arrets_arrivee_par_depart import ArretService

router = APIRouter()

@router.get("/lignes/{ligne_id}/arrets/{arret_depart_id}/arrivees")
def get_arrets_arrivee_par_depart(ligne_id: str, arret_depart_id: str, db: Session = Depends(get_db)):
    """
    Récupère tous les arrêts d'arrivée possibles pour une ligne
    Exclut uniquement l'arrêt de départ choisi
    """
    try:
        result = ArretService.get_arrets_arrivee_par_depart(db, ligne_id, arret_depart_id)
        
        if not result:
            raise HTTPException(
                status_code=404,
                detail=f"Ligne ou arrêt de départ non trouvé"
            )
        
        # Vérifier si l'arrêt de départ existe dans la ligne
        if not result["arret_depart"]:
            raise HTTPException(
                status_code=400,
                detail=f"L'arrêt de départ n'existe pas dans cette ligne"
            )
        
        return {
            "success": True,
            "data": result
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erreur lors de la récupération des arrêts d'arrivée: {str(e)}"
        )