# app/models/ligne.py
from sqlalchemy import Column, String, Boolean, DateTime
from datetime import datetime
from database import Base

class Ligne(Base):
    __tablename__ = "lignes"
    
    id = Column(String(50), primary_key=True)
    numero = Column(String(10), nullable=False)
    nom = Column(String(100), nullable=False)
    ville = Column(String(50), nullable=False)
    active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)