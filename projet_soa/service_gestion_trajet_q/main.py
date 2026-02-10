from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from app.api import get_villes,get_lignes,calculer_horaires,recherch_gare_nom,get_arret_ville,add_ligne,add_arret,arret_desactiver,update_ligne,bu_conducteurs,update_bus_conducteur# Ajoutez d'autres routers si nécessaire

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "hello world"}

# ✅ Crée toutes les tables déclarées dans Base
Base.metadata.create_all(bind=engine)

# ✅ Autoriser les requêtes venant du front (React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Frontend Next.js
        "http://localhost:3001",  # API Gateway (NOUVEAU)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Inclusion des routers
app.include_router(get_villes.router)

app.include_router(get_lignes.router)
app.include_router(calculer_horaires.router)
app.include_router(recherch_gare_nom.router)
app.include_router(get_arret_ville.router)
app.include_router(add_ligne.router)
app.include_router(add_arret.router)
app.include_router(arret_desactiver.router)
app.include_router(update_ligne.router)
app.include_router(bu_conducteurs.router)
app.include_router(update_bus_conducteur.router)  