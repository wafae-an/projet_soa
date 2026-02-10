import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from dotenv import load_dotenv
from urllib.parse import quote_plus

# 🔹 Charge les variables du fichier .env
load_dotenv()

# 🔹 Récupération des variables d'environnement avec valeurs par défaut
DB_USER = os.getenv("MYSQL_USER", "trajetuser")
DB_PASSWORD = quote_plus(str(os.getenv("MYSQL_PASSWORD", "trajetpass")))  # encode correctement
DB_HOST = os.getenv("DB_HOST", "db")  # Nom du service MySQL dans docker-compose
DB_PORT = os.getenv("MYSQL_PORT", "3306")  # si tu ne définis pas MYSQL_PORT, 3306 par défaut
DB_NAME = os.getenv("MYSQL_DATABASE", "trajetdb")

# 🔹 Chaîne de connexion SQLAlchemy
DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# 🔹 Création de l'engine SQLAlchemy
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

# 🔹 Session locale
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 🔹 Base pour les modèles
Base = declarative_base()


# 🔹 Dépendance pour FastAPI
def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 🔹 Fonction pour créer automatiquement toutes les tables
def create_tables():
    """Crée toutes les tables dans la base de données si elles n'existent pas"""
    Base.metadata.create_all(bind=engine)
    print("✅ Tables créées avec succès!")
