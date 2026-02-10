from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from app.models.arret import Arret

router = APIRouter()

@router.patch("/arrets/{arret_id}/desactiver")
def desactiver_arret(arret_id: str, db: Session = Depends(get_db)):
    # Récupérer l'arrêt
    arret = db.query(Arret).filter(Arret.id == arret_id).first()
    
    if not arret:
        raise HTTPException(status_code=404, detail="Arrêt non trouvé")
    
    # Désactiver l'arrêt
    arret.actif = False
    db.commit()
    
    return {
        "message": "Arrêt désactivé avec succès", 
        "arret_id": arret_id,
        "nom": arret.nom
    }