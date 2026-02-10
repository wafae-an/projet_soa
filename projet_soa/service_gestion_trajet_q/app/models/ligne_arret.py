# app/models/ligne_arret.py
from sqlalchemy import Column, String, Integer, Float, ForeignKey, Enum
from database import Base
from .base import Direction




class LigneArret(Base):
    __tablename__ = "ligne_arrets"
    
    id = Column(String(50), primary_key=True)
    ligne_id = Column(String(50), ForeignKey("lignes.id"), nullable=False)
    arret_id = Column(String(50), ForeignKey("arrets.id"), nullable=False)
    direction = Column(Enum(Direction), nullable=False, default=Direction.ALLER)
    ordre = Column(Integer, nullable=False) 
    temps_vers_prochain = Column(Integer)
    distance_vers_prochain = Column(Float)