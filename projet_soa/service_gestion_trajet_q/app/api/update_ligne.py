from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from database import get_db
from app.models.ligne import Ligne
from app.models.ligne_arret import LigneArret
from app.schemas.update_ligne import LigneUpdate

router = APIRouter()

@router.put("/lignes/{ligne_id}")
def update_ligne(ligne_id: str, update_data: LigneUpdate, db: Session = Depends(get_db)):
    # Vérifier si la ligne existe
    ligne = db.query(Ligne).filter(Ligne.id == ligne_id).first()
    if not ligne:
        raise HTTPException(status_code=404, detail="Ligne non trouvée")
    
    # Mettre à jour les champs de base
    if update_data.numero is not None:
        ligne.numero = update_data.numero
    if update_data.nom is not None:
        ligne.nom = update_data.nom
    if update_data.ville is not None:
        ligne.ville = update_data.ville
    
    # Mettre à jour la liste des arrêts si fournie
    if update_data.arrets is not None:
        # Supprimer tous les anciens arrêts de la ligne
        db.query(LigneArret).filter(LigneArret.ligne_id == ligne_id).delete()
        
        # Créer les nouveaux enregistrements
        for arret_data in update_data.arrets:
            nouveau_ligne_arret = LigneArret(
                id=str(uuid.uuid4()),
                ligne_id=ligne_id,
                arret_id=arret_data.arret_id,
                ordre=arret_data.ordre,
                temps_vers_prochain=arret_data.temps_vers_prochain,
                distance_vers_prochain=arret_data.distance_vers_prochain,
                direction=arret_data.direction
            )
            db.add(nouveau_ligne_arret)
    
    db.commit()
    
    return {
        "message": "Ligne mise à jour avec succès",
        "ligne_id": ligne_id
    }