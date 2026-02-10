# routes/recherche_gares.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from sqlalchemy import text
from database import get_db

router = APIRouter()

class RechercheRequest(BaseModel):
    ligne_id: str
    depart: str
    arrivee: str

class RechercheResponse(BaseModel):
    depart_id: str
    arrivee_id: str

@router.post("/api/rechercher-ids-gares", response_model=RechercheResponse)
def rechercher_ids_gares(request: RechercheRequest, db: Session = Depends(get_db)):
    """
    Recherche les IDs des gares par leurs noms dans la table arrets
    """
    try:
        # Recherche de l'ID pour la gare de départ
        query_depart = text("""
            SELECT id 
            FROM arrets 
            WHERE nom = :nom_depart
            LIMIT 1
        """)
        
        result_depart = db.execute(query_depart, {
            'nom_depart': request.depart
        })
        depart_row = result_depart.fetchone()
        
        if not depart_row:
            raise HTTPException(status_code=404, detail=f"Gare de départ '{request.depart}' non trouvée")
        
        # Recherche de l'ID pour la gare d'arrivée
        query_arrivee = text("""
            SELECT id 
            FROM arrets 
            WHERE nom = :nom_arrivee
            LIMIT 1
        """)
        
        result_arrivee = db.execute(query_arrivee, {
            'nom_arrivee': request.arrivee  # ✅ CORRIGÉ: "arrivee" au lieu de "arriveea"
        })
        arrivee_row = result_arrivee.fetchone()
        
        if not arrivee_row:
            raise HTTPException(status_code=404, detail=f"Gare d'arrivée '{request.arrivee}' non trouvée")
        
        return RechercheResponse(
            depart_id=depart_row[0],  # id de la gare de départ
            arrivee_id=arrivee_row[0] # id de la gare d'arrivée
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur serveur: {str(e)}")
        