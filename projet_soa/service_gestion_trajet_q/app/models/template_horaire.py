# app/models/template_horaire.py
from sqlalchemy import Column, String, Integer, Boolean, Time, ForeignKey, Enum
from database import Base
from .base import Direction # ← Import depuis database

class TemplateHoraire(Base):
    __tablename__ = "templates_horaires"
    
    id = Column(String(50), primary_key=True)
    ligne_id = Column(String(50), ForeignKey("lignes.id"), nullable=False)
    direction = Column(Enum(Direction), nullable=False, default=Direction.ALLER)
    heure_premier_depart = Column(Time, nullable=False)
    heure_dernier_depart = Column(Time, nullable=False)
    frequence = Column(Integer, nullable=False)
    lundi = Column(Boolean, default=True)
    mardi = Column(Boolean, default=True)
    mercredi = Column(Boolean, default=True)
    jeudi = Column(Boolean, default=True)
    vendredi = Column(Boolean, default=True)
    samedi = Column(Boolean, default=True)
    dimanche = Column(Boolean, default=True)