'use client'

import { useState, useEffect } from 'react';
import { getVilles, ApiResponse } from '../actions/villeActions';

interface CitySelectionProps {
  onCitySelect: (city: string) => void
}

export default function CitySelection({ onCitySelect }: CitySelectionProps) {
  const [villes, setVilles] = useState<string[]>([]); // Maintenant string[] au lieu de Ville[]
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchVilles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response: ApiResponse = await getVilles();
        
        if (response.success) {
          setVilles(response.data);
        } else {
          setError('Erreur lors du chargement des villes');
        }
      } catch (err) {
        setError('Erreur de connexion au serveur');
        console.error('Erreur fetchVilles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVilles();
  }, []);

  // Filtrer les villes basé sur la recherche
  const filteredVilles = villes.filter(ville =>
    ville.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="ml-[280px] min-h-screen bg-white p-8">
        <div className="max-w-4xl mx-auto flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Chargement des villes...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ml-[280px] min-h-screen bg-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-[280px] min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#1e40af] mb-2">
            Consultation des Horaires
          </h2>
          <p className="text-[#374151] text-lg">
            Sélectionnez votre ville de départ
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-12">
          <input
            type="text"
            placeholder="Rechercher une ville..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-3 border border-[#e5e7eb] rounded-lg text-[#374151] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent"
          />
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVilles.map((ville, index) => (
            <button
              key={`${ville}-${index}`} // Utiliser l'index comme fallback car ce sont des strings
              onClick={() => onCitySelect(ville)}
              className="bg-white border border-[#e5e7eb] rounded-lg p-6 text-center hover:shadow-md hover:border-[#1e40af] transition-all cursor-pointer group"
            >
              <p className="text-[#1e40af] font-bold text-lg group-hover:text-[#1e3a8a]">
                {ville}
              </p>
            </button>
          ))}
        </div>

        {filteredVilles.length === 0 && searchTerm && (
          <div className="text-center text-gray-500 py-8">
            Aucune ville trouvée pour "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
}