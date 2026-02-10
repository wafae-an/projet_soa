# services/ligne_arret_service.py
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from app.models.ligne import Ligne
from app.models.arret import Arret
from app.models.ligne_arret import LigneArret

class LigneArretService:
    
    @staticmethod
    def get_arrets_par_ligne_ordre(db: Session, ligne_id: str) -> Dict[str, Any]:
        """
        Récupère tous les arrêts d'une ligne spécifique dans l'ordre défini
        """
        # Vérifier si la ligne existe
        ligne = db.query(Ligne).filter(Ligne.id == ligne_id).first()
        if not ligne:
            return None
        
        # Récupérer tous les arrêts de la ligne dans l'ordre
        arrets_query = db.query(
            Arret,
            LigneArret.ordre,
            LigneArret.temps_vers_prochain,
            LigneArret.distance_vers_prochain
        ).join(
            LigneArret, LigneArret.arret_id == Arret.id
        ).filter(
            LigneArret.ligne_id == ligne_id
        ).order_by(
            LigneArret.ordre
        ).all()
        
        # Construire la liste des arrêts dans l'ordre
        arrets = []
        for arret, ordre, temps_prochain, distance_prochain in arrets_query:
            arret_data = {
                "id": arret.id,
                "nom": arret.nom,
                "ville": arret.ville,
                "latitude": arret.latitude,
                "longitude": arret.longitude,
                "ordre": ordre,
                "temps_vers_prochain": temps_prochain,
                "distance_vers_prochain": distance_prochain
            }
            arrets.append(arret_data)
        
        # Construire la réponse
        result = {
            "ligne": {
                "id": ligne.id,
                "numero": ligne.numero,
                "nom": ligne.nom,
                "ville": ligne.ville
            },
            "arrets": arrets
        }
        
        return result