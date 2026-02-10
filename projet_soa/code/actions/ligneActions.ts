'use server';

export interface LigneAvecArrets {
  id: string;
  numero: string;
  nom: string;
  ville: string;
  arrets: string[];
  nombre_arrets: number;
}

export interface ApiResponseLignes {
  success: boolean;
  data: LigneAvecArrets[];
  count: number;
  ville: string;
}

/**
 * Récupère les lignes d'une ville avec les noms des arrêts
 */
export async function getLignesAvecArrets(villeNom: string): Promise<ApiResponseLignes> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/trajets';
    
    console.log(`Tentative de récupération des lignes pour: ${villeNom}`);
    
    const response = await fetch(`${apiUrl}/villes/${villeNom}/lignes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    console.log(`Status de la réponse: ${response.status}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return {
          success: true,
          data: [],
          count: 0,
          ville: villeNom
        };
      }
      throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
    }

    const data: ApiResponseLignes = await response.json();
    console.log(`Données reçues: ${data.count} lignes pour ${data.ville}`);
    
    return data;
    
  } catch (error) {
    console.error('Erreur lors de la récupération des lignes:', error);
    
    return {
      success: false,
      data: [],
      count: 0,
      ville: villeNom
    };
  }
}

/**
 * Récupère toutes les villes disponibles
 */
export async function getVillesDisponibles(): Promise<string[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/trajets';
    
    const response = await fetch(`${apiUrl}/api/villes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success && Array.isArray(data.data)) {
      return data.data.filter((ville: string) => ville.trim() !== '');
    }
    
    return [];
    
  } catch (error) {
    console.error('Erreur lors de la récupération des villes:', error);
    return [];
  }
}