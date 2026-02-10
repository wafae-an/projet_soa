# insert_ligne.py
from database import SessionLocal
from app.models.ligne import Ligne

def inserer_ligne():
    # Connexion à la base
    db = SessionLocal()
    
    try:
        # Créer une nouvelle ligne
        nouvelle_ligne = Ligne(
            id="L31",
            numero="30",
            nom="Rabat - Témara",
            active=True
        )
        
        # Ajouter à la base
        db.add(nouvelle_ligne)
        db.commit()
        
        print("✅ Ligne insérée avec succès !")
        print(f"📝 Détails :")
        print(f"   - ID: {nouvelle_ligne.id}")
        print(f"   - Numéro: {nouvelle_ligne.numero}")
        print(f"   - Nom: {nouvelle_ligne.nom}")
        print(f"   - Active: {nouvelle_ligne.active}")
        
    except Exception as e:
        db.rollback()
        print(f"❌ Erreur lors de l'insertion: {e}")
    
    finally:
        db.close()

if __name__ == "__main__":
    inserer_ligne()