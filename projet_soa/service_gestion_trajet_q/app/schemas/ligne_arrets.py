from pydantic import BaseModel
from typing import List, Optional
from enum import Enum

class Direction(str, Enum):
    ALLER = "ALLER"
    RETOUR = "RETOUR"

class ArretLigneBase(BaseModel):
    arret_id: str
    ordre: int
    temps_vers_prochain: Optional[int] = None
    distance_vers_prochain: Optional[float] = None
    direction: Direction = Direction.ALLER

class LigneCreate(BaseModel):
    numero: str
    nom: str
    ville: str
    arrets: List[ArretLigneBase]