from sqlalchemy import Column, Integer, String, Enum, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Bus(Base):
    __tablename__ = "bus"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    numero_immatriculation = Column(String(20), unique=True, nullable=False)
    modele = Column(String(100), nullable=False)
    capacite = Column(Integer, nullable=False)
    ville = Column(String(100), nullable=False)
    ligne_id = Column(Integer, ForeignKey('lignes.id'))  # Clé étrangère
    statut = Column(
        Enum('en_service', 'maintenance', 'hors_service'), 
        default='en_service'
    )
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    conducteur_id = Column(Integer, ForeignKey('users.id', ondelete='SET NULL'))
    # Relation avec la table lignes
    ligne = relationship("Ligne", backref="bus")
    
    def __repr__(self):
        return f"<Bus({self.numero_immatriculation} - {self.modele})>"