from pydantic import BaseModel
from typing import List, Optional
from enum import Enum

class Direction(str, Enum):
    ALLER = "ALLER"
    RETOUR = "RETOUR"

class ArretLigneUpdate(BaseModel):
    arret_id: str
    ordre: int
    temps_vers_prochain: Optional[int] = None
    distance_vers_prochain: Optional[float] = None
    direction: Direction = Direction.ALLER

class LigneUpdate(BaseModel):
    numero: Optional[str] = None
    nom: Optional[str] = None
    ville: Optional[str] = None
    arrets: Optional[List[ArretLigneUpdate]] = None