from typing import Optional
from pydantic import BaseModel

class ArretUpdate(BaseModel):
    nom: Optional[str] = None
    ville: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    code: Optional[str] = None
    adresse: Optional[str] = None
    