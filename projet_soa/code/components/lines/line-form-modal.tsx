'use client'

import { useState, useEffect } from 'react'
import { X, Plus, GripVertical, Trash2 } from 'lucide-react'
import { useCity } from '@/context/CityContext'
import { useRouter } from 'next/navigation'

interface Stop {
  id: string
  nom: string
  ville: string
  latitude: number
  longitude: number
  lignes: Array<{
    ligne_id: string
    numero: string
    nom_ligne: string
    ordre: number
    direction: string
  }>
}

interface LineFormProps {
  line?: any | null
  onSave: () => void
  onCancel: () => void
}

// URL de base de votre API FastAPI
const API_BASE_URL = 'http://localhost:3001/api/trajets'

export default function LineFormModal({ line, onSave, onCancel }: LineFormProps) {
  const { selectedCity } = useCity()
  const [formData, setFormData] = useState({
    numero: '',
    nom: '',
  })

  const router = useRouter()
  const [availableStops, setAvailableStops] = useState<Stop[]>([])
  const [selectedStops, setSelectedStops] = useState<Stop[]>([])
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  // Récupérer les arrêts de la ville sélectionnée
  useEffect(() => {
    const fetchStopsByCity = async () => {
      if (!selectedCity) return
      
      try {
        setLoading(true)
        // CORRECTION : Ajout de /api dans l'URL
        const response = await fetch(`${API_BASE_URL}/villes/${selectedCity}/arrets`)
        if (!response.ok) throw new Error('Erreur lors de la récupération des arrêts')
        
        const stops = await response.json()
        setAvailableStops(stops)
      } catch (error) {
        console.error('Erreur fetch stops:', error)
        setErrors(prev => ({ ...prev, fetch: 'Erreur lors du chargement des arrêts' }))
      } finally {
        setLoading(false)
      }
    }

    fetchStopsByCity()
  }, [selectedCity])

  // Initialiser les données si on est en mode édition
  useEffect(() => {
    if (line) {
      console.log('Ligne reçue pour édition:', line) // Debug
      setFormData({
        numero: line.numero || '',
        nom: line.nom || '',
      })
      // Pour l'instant, on initialise avec des arrêts vides en mode édition
      setSelectedStops([])
    } else {
      setFormData({ numero: '', nom: '' })
      setSelectedStops([])
    }
  }, [line])

  const unusedStops = availableStops.filter(
    stop => !selectedStops.some(s => s.id === stop.id)
  )

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.numero.trim()) newErrors.numero = 'Le numéro est requis'
    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis'
    if (selectedStops.length < 2) newErrors.stops = 'Sélectionnez au moins 2 arrêts'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddStop = (stop: Stop) => {
    setSelectedStops([...selectedStops, stop])
    if (errors.stops) {
      setErrors(prev => ({ ...prev, stops: '' }))
    }
  }

  const handleRemoveStop = (id: string) => {
    setSelectedStops(selectedStops.filter(s => s.id !== id))
  }

  const handleReorderStops = (fromIndex: number, toIndex: number) => {
    const newStops = [...selectedStops]
    const [removed] = newStops.splice(fromIndex, 1)
    newStops.splice(toIndex, 0, removed)
    setSelectedStops(newStops)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault()
    if (draggedItem !== null) {
      const draggedIndex = selectedStops.findIndex(s => s.id === draggedItem)
      if (draggedIndex !== -1 && draggedIndex !== targetIndex) {
        handleReorderStops(draggedIndex, targetIndex)
      }
    }
    setDraggedItem(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setSaving(true)
    try {
      const ligneData = {
        numero: formData.numero,
        nom: formData.nom,
        ville: selectedCity,
        arrets: selectedStops.map((stop, index) => ({
          arret_id: stop.id,
          ordre: index + 1,
          temps_vers_prochain: 0,
          distance_vers_prochain: 0,
          direction: 'ALLER'
        }))
      }

      // Déterminer l'URL et la méthode
      const url = line 
        ? `${API_BASE_URL}/lignes/${line.id}`
        : `${API_BASE_URL}/lignes`
      
      const method = line ? 'PUT' : 'POST'

      console.log(`${method} request to:`, url) // Debug
      console.log('Data being sent:', ligneData) // Debug

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ligneData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Erreur lors de la sauvegarde de la ligne')
      }

      const result = await response.json()
      console.log(line ? 'Ligne mise à jour avec succès:' : 'Ligne créée avec succès:', result)
      
      onSave() // Ferme d'abord la modal
      router.refresh()
    } catch (error) {
      console.error('Erreur sauvegarde:', error)
      setErrors(prev => ({ 
        ...prev, 
        submit: error instanceof Error ? error.message : 'Erreur lors de la sauvegarde' 
      }))
    } finally {
      setSaving(false)
    }
  }

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={handleModalClick}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {line ? 'Modifier la ligne' : 'Créer une nouvelle ligne'}
            </h2>
            {selectedCity && (
              <p className="text-sm text-gray-600 mt-1">
                Ville : {selectedCity}
                {line && line.id && (
                  <span className="ml-4 text-xs bg-gray-100 px-2 py-1 rounded">
                    ID: {line.id}
                  </span>
                )}
              </p>
            )}
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Informations Générales</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro de ligne *
                </label>
                <input
                  type="text"
                  value={formData.numero}
                  onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                  placeholder="ex: L01"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    errors.numero ? 'border-red-500' : 'border-gray-300'
                  } bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.numero && <p className="text-xs text-red-600 mt-1">{errors.numero}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de la ligne *
                </label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  placeholder="ex: Agadir Centre Ville"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    errors.nom ? 'border-red-500' : 'border-gray-300'
                  } bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.nom && <p className="text-xs text-red-600 mt-1">{errors.nom}</p>}
              </div>
            </div>
          </div>

          {/* Drag & Drop Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Gérer les Arrêts *</h3>
            {errors.stops && <p className="text-xs text-red-600">{errors.stops}</p>}
            {errors.fetch && <p className="text-xs text-red-600">{errors.fetch}</p>}
            
            <div className="grid grid-cols-2 gap-4">
              {/* Available Stops */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3 px-3">
                  Arrêts Disponibles {loading && '(Chargement...)'}
                </h4>
                <div className="space-y-2 p-3 bg-gray-50 rounded-lg min-h-64 border border-gray-300">
                  {loading ? (
                    <p className="text-sm text-gray-500 text-center py-8">Chargement des arrêts...</p>
                  ) : unusedStops.length > 0 ? (
                    unusedStops.map(stop => (
                      <div
                        key={stop.id}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-300 hover:border-blue-500 cursor-move transition-colors group"
                        draggable
                        onDragStart={() => setDraggedItem(stop.id)}
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{stop.nom}</p>
                          <p className="text-xs text-gray-500">ID: {stop.id}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleAddStop(stop)}
                          className="p-1 hover:bg-blue-500 hover:text-white rounded transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-8">
                      {availableStops.length === 0 
                        ? 'Aucun arrêt disponible pour cette ville' 
                        : 'Tous les arrêts sont sélectionnés'
                      }
                    </p>
                  )}
                </div>
              </div>

              {/* Selected Stops */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3 px-3">
                  Arrêts de la Ligne ({selectedStops.length})
                </h4>
                <div 
                  className="space-y-2 p-3 bg-gray-50 rounded-lg min-h-64 border-2 border-dashed border-blue-300"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault()
                    if (draggedItem && !selectedStops.some(s => s.id === draggedItem)) {
                      const stopToAdd = availableStops.find(s => s.id === draggedItem)
                      if (stopToAdd) {
                        handleAddStop(stopToAdd)
                      }
                    }
                    setDraggedItem(null)
                  }}
                >
                  {selectedStops.length > 0 ? (
                    selectedStops.map((stop, index) => (
                      <div
                        key={stop.id}
                        draggable
                        onDragStart={() => setDraggedItem(stop.id)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDrop={(e) => handleDrop(e, index)}
                        className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-300 hover:border-blue-500 transition-colors group cursor-grab active:cursor-grabbing"
                      >
                        <GripVertical className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold bg-blue-500 text-white px-2 py-1 rounded">
                              {index + 1}
                            </span>
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {stop.nom}
                            </p>
                          </div>
                          <p className="text-xs text-gray-500">ID: {stop.id}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveStop(stop.id)}
                          className="p-1 hover:bg-red-500 hover:text-white rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-8">
                      Glissez-déposez les arrêts ici ou utilisez le bouton +
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {errors.submit && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex gap-3 justify-end pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              disabled={saving}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={saving || !selectedCity}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Sauvegarde...' : line ? 'Mettre à jour la ligne' : 'Créer la ligne'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}