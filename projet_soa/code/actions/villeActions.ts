'use server';

export interface ApiResponse {
  success: boolean;
  data: string[]; // Maintenant c'est un tableau de strings, pas d'objets Ville
  count: number;
}

/**
 * Récupère la liste de toutes les villes desservies depuis l'API FastAPI
 */
export async function getVilles(): Promise<ApiResponse> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/trajets';
    
    const response = await fetch(`${apiUrl}/villes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
    }

    const data: ApiResponse = await response.json();
    
    // Filtrer les chaînes vides si nécessaire
    const filteredData = data.data.filter(ville => ville.trim() !== '');
    
    return {
      ...data,
      data: filteredData,
      count: filteredData.length
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des villes:', error);
    
    return {
      success: false,
      data: [],
      count: 0
    };
  }
}