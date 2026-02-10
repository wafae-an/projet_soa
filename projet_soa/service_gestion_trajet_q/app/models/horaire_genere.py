# app/models/horaire_genere.py
from sqlalchemy import Column, String, Integer, Float, Time, Date, DateTime, ForeignKey, Enum, Index
from datetime import datetime
from database import Base
from .ligne_arret import Direction

class HoraireGenere(Base):
    __tablename__ = "horaires_generes"
    
    id = Column(String(100), primary_key=True)
    ligne_id = Column(String(50), ForeignKey("lignes.id"), nullable=False)
    arret_depart_id = Column(String(50), ForeignKey("arrets.id"), nullable=False)
    arret_arrivee_id = Column(String(50), ForeignKey("arrets.id"), nullable=False)
    direction = Column(Enum(Direction), nullable=False)
    heure_depart = Column(Time, nullable=False)
    heure_arrivee = Column(Time, nullable=False)
    duree_minutes = Column(Integer, nullable=False)
    date_validite = Column(Date, nullable=False)
    date_generation = Column(DateTime, default=datetime.utcnow)
    prix = Column(Float, nullable=False, default=0.0)
    
    __table_args__ = (
        Index('idx_horaires_recherche', 'ligne_id', 'arret_depart_id', 'arret_arrivee_id', 'date_validite'),
        Index('idx_horaires_direction', 'direction'),
    )