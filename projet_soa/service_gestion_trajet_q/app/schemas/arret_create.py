from pydantic import BaseModel
from typing import Optional

class ArretCreate(BaseModel):
    nom: str
    ville: str
    latitude: float
    longitude: float
    code: Optional[str] = None
    adresse: Optional[str] = None
    