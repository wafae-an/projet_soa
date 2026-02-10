'use client'

import { useState, useEffect } from 'react'
import { Trash2, Edit2 } from 'lucide-react'
import { useCity } from '@/context/CityContext'

interface Stop {
  id: string
  nom: string
  ville: string
  latitude: number
  longitude: number
  actif: boolean
  code: string
  adresse: string
  
  lignes: Array<{
    ligne_id: string
    numero: string
    nom_ligne: string
    ordre: number
    direction: string
  }>
}

interface StopsTableProps {
  onEdit: (stop: Stop) => void
  onDelete: (id: string) => void
  onToggle: (id: string) => void
}

const API_BASE_URL = 'http://localhost:3001/api/trajets'

export default function StopsTable({
  onEdit,
  onDelete,
  onToggle,
}: StopsTableProps) {
  const { selectedCity } = useCity()
  const [stops, setStops] = useState<Stop[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Récupérer les arrêts de la ville sélectionnée
  useEffect(() => {
    const fetchStops = async () => {
      if (!selectedCity) {
        setStops([])
        return
      }

      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`${API_BASE_URL}/villes/${selectedCity}/arrets`)
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des arrêts')
        }
        
        const stopsData = await response.json()
        setStops(stopsData)
      } catch (err) {
        console.error('Erreur:', err)
        setError('Impossible de charger les arrêts')
      } finally {
        setLoading(false)
      }
    }

    fetchStops()
  }, [selectedCity])

  // Fonction pour formater les numéros de ligne
  const getLineNumbers = (lignes: Stop['lignes']) => {
    if (!lignes || lignes.length === 0) {
      return 'Aucune ligne'
    }
    
    const uniqueNumbers = [...new Set(lignes.map(l => l.numero))]
    return uniqueNumbers.slice(0, 3).join(', ') + (uniqueNumbers.length > 3 ? '...' : '')
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-500">Chargement des arrêts...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return ( 
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Code
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Adresse
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Coordonnées
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Lignes associées
              </th>
              
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {stops.map((stop, index) => (
              <tr
                key={stop.id}
                className={`border-b border-gray-200 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-blue-50 transition-colors`}
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {stop.nom}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-mono text-xs">
                    {stop.code}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                  {stop.adresse}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {stop.latitude.toFixed(4)}, {stop.longitude.toFixed(4)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {stop.lignes && stop.lignes.length > 0 ? (
                      stop.lignes.slice(0, 3).map((ligne, idx) => (
                        <span
                          key={ligne.ligne_id}
                          className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium"
                          title={`${ligne.numero} - ${ligne.nom_ligne}`}
                        >
                          {ligne.numero}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-xs">Aucune</span>
                    )}
                    {stop.lignes && stop.lignes.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        +{stop.lignes.length - 3}
                      </span>
                    )}
                  </div>
                </td>
               
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      stop.actif
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {stop.actif ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onToggle(stop.id)}
                      className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                        stop.actif
                          ? 'bg-orange-100 hover:bg-orange-200 text-orange-800'
                          : 'bg-green-100 hover:bg-green-200 text-green-800'
                      }`}
                    >
                      {stop.actif ? 'Désactiver' : 'Activer'}
                    </button>
                    <button
                      onClick={() => onEdit(stop)}
                      className="px-2 py-1 rounded bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-medium transition-colors"
                    >
                      <Edit2 size={14} />
                    </button>
                   
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {stops.length === 0 && selectedCity && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun arrêt trouvé pour {selectedCity}</p>
        </div>
      )}
      {!selectedCity && (
        <div className="text-center py-12">
          <p className="text-gray-500">Veuillez sélectionner une ville</p>
        </div>
      )}
    </div>
  )
}