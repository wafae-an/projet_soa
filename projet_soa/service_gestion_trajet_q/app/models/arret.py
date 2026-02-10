# app/models/arret.py
from sqlalchemy import Column, String, Float, Boolean
from database import Base

class Arret(Base):
    __tablename__ = "arrets"
    
    id = Column(String(50), primary_key=True)
    nom = Column(String(100), nullable=False)
    ville = Column(String(50), nullable=False)
    latitude = Column(Float)
    longitude = Column(Float)
    
    # Nouveaux attributs
    actif = Column(Boolean, default=True)
    code = Column(String(10))
    adresse = Column(String(200))
    