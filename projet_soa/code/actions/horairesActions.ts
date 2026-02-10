'use server'

import { revalidatePath } from 'next/cache'

interface HorairesRequest {
  ligne_id: string
  arret_depart_id: string
  arret_arrivee_id: string
  date_recherche: string
}

interface Horaire {
  ligne_id: string
  arret_depart_id: string
  arret_arrivee_id: string
  direction: string
  heure_depart: string
  heure_arrivee: string
  duree_minutes: number
  date_validite: string
}

interface HorairesResponse {
  success: boolean
  ligne_id: string
  arret_depart_id: string
  arret_arrivee_id: string
  direction_auto: string
  date_recherche: string
  temps_trajet_minutes: number
  nombre_horaires: number
  horaires: Horaire[]
  error?: string
}

export async function rechercherHorairesAvecObjet(requestData: HorairesRequest): Promise<HorairesResponse> {
  try {
    // Validation
    if (!requestData.ligne_id || !requestData.arret_depart_id || 
        !requestData.arret_arrivee_id || !requestData.date_recherche) {
      return {
        success: false,
        error: "Tous les champs sont obligatoires",
        ...requestData,
        direction_auto: '',
        temps_trajet_minutes: 0,
        nombre_horaires: 0,
        horaires: []
      }
    }

    // ✅ CORRECT: GET avec query params comme l'API FastAPI l'attend
    const queryParams = new URLSearchParams(requestData)
    const response = await fetch(`http://localhost:3001/api/trajets/api/horaires?${queryParams}`)
    
    if (!response.ok) {
      throw new Error('Erreur API')
    }

    const data: HorairesResponse = await response.json()
    revalidatePath('/horaires')
    
    return data

  } catch (error) {
    return {
      success: false,
      error: "Erreur de connexion au serveur",
      ...requestData,
      direction_auto: '',
      temps_trajet_minutes: 0,
      nombre_horaires: 0,
      horaires: []
    }
  }
}