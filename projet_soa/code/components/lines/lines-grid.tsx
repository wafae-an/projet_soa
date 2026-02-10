'use client'

import { Line } from '@/types/transport'
import { Trash2, Edit2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getLignesAvecArrets, LigneAvecArrets } from '@/actions/ligneActions'
import { useCity } from '@/context/CityContext'

interface LinesGridProps {
  onEdit: (line: Line) => void
  onDelete: (id: string) => void
  onToggle: (id: string) => void
}

export default function LinesGrid({
  onEdit,
  onDelete,
  onToggle,
}: LinesGridProps) {
  const { selectedCity } = useCity()
  const [lines, setLines] = useState<Line[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLines = async () => {
      if (!selectedCity) {
        setLines([])
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        
        const response = await getLignesAvecArrets(selectedCity)
        
        if (response.success) {
          // Transformer les données de l'API en format Line
          const transformedLines: Line[] = response.data.map((ligne: LigneAvecArrets) => ({
            id: ligne.id,
            number: ligne.numero,
            name: ligne.nom,
            city: ligne.ville,
            stops: ligne.arrets,
            direction: ligne.arrets.length > 0 
              ? `${ligne.arrets[0]} → ${ligne.arrets[ligne.arrets.length - 1]}`
              : 'Aucun arrêt',
            status: 'active' as const
          }))
          
          setLines(transformedLines)
        } else {
          setError('Erreur lors du chargement des lignes')
          setLines([])
        }
      } catch (err) {
        console.error('Erreur:', err)
        setError('Impossible de charger les lignes')
        setLines([])
      } finally {
        setLoading(false)
      }
    }

    fetchLines()
  }, [selectedCity]) // Se déclenche à chaque changement de ville

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Chargement des lignes...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <p className="text-red-800">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Réessayer
        </button>
      </div>
    )
  }

  if (!selectedCity) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">Veuillez sélectionner une ville</p>
      </div>
    )
  }

  if (lines.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">
          Aucune ligne trouvée pour {selectedCity}
        </p>
        <p className="text-gray-400 mt-2">
          Aucune ligne n'est disponible pour cette ville
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {lines.map((line) => (
        <div
          key={line.id}
          className="bg-white shadow-md border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow flex flex-col min-h-[280px]"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="text-3xl font-bold text-blue-600">{line.number}</div>
              <h3 className="text-lg font-semibold text-gray-900 mt-1">
                {line.name}
              </h3>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                line.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {line.status === 'active' ? 'Actif' : 'Inactif'}
            </div>
          </div>

          {/* Details - Section scrollable si trop d'arrêts */}
          <div className="flex-1 space-y-3 mb-4 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Nombre d'arrêts:</span>
              <span className="font-semibold text-gray-800">{line.stops.length}</span>
            </div>
            <div className="flex-1">
              <span className="block text-xs text-gray-500 mb-2">Arrêts:</span>
              <div className="text-gray-700 space-y-1 max-h-32 overflow-y-auto">
                {line.stops.map((stop, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 w-4">{index + 1}.</span>
                    <span className="text-sm">{stop}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions - Toujours en bas fixe */}
          <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100">
            <button
              onClick={() => onToggle(line.id)}
              className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                line.status === 'active'
                  ? 'bg-orange-100 hover:bg-orange-200 text-orange-800'
                  : 'bg-green-100 hover:bg-green-200 text-green-800'
              }`}
            >
              {line.status === 'active' ? 'Désactiver' : 'Activer'}
            </button>
            <button
              onClick={() => onEdit(line)}
              className="px-3 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium text-sm transition-colors flex items-center gap-1"
            >
              <Edit2 size={14} />
              Modifier
            </button>
            
          </div>
        </div>
      ))}
    </div>
  )
}