from sqlalchemy.ext.declarative import declarative_base
import enum

Base = declarative_base()

class Direction(enum.Enum):
    ALLER = "ALLER"      # Rabat → Témara
    RETOUR = "RETOUR"    # Témara → Rabata