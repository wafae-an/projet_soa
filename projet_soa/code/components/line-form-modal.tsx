'use client'

import { useState, useEffect } from 'react'
import { X, Plus, GripVertical, Trash2 } from 'lucide-react'
import {Button} from '@/components/ui/button'

interface Stop {
  id: string
  name: string
  code: string
}

interface Line {
  id: string
  number: string
  name: string
  city: string
  stops: number
  direction: string
  firstStop: string
  lastStop: string
  status: 'active' | 'inactive'
}

interface LineFormProps {
  city: string
  line?: Line | null
  onSave: (line: {
    number: string
    name: string
    city: string
    stops: number
    direction: string
    firstStop: string
    lastStop: string
  }) => void
  onCancel: () => void
}

// Mock available stops by city
const stopsByCity: Record<string, Stop[]> = {
  Agadir: [
    { id: '1', name: 'Gare Routière', code: 'GR01' },
    { id: '2', name: 'Centre Ville', code: 'CV01' },
    { id: '3', name: 'Plage d\'Agadir', code: 'PA01' },
    { id: '4', name: 'Tiklouine', code: 'TK01' },
    { id: '5', name: 'Aït Melloul', code: 'AM01' },
    { id: '6', name: 'Marché Central', code: 'MC01' },
    { id: '7', name: 'Hôpital Regional', code: 'HR01' },
  ],
  Casablanca: [
    { id: '8', name: 'Gare Casa Voyageurs', code: 'GCV01' },
    { id: '9', name: 'Centre Ville Hassan II', code: 'CH2' },
    { id: '10', name: 'Corniche Ain Diab', code: 'CAD01' },
    { id: '11', name: 'Université Hassan II', code: 'UH2' },
  ],
  Marrakech: [
    { id: '12', name: 'Place Jemaa el-Fnaa', code: 'JF01' },
    { id: '13', name: 'Gare Marrakech', code: 'GM01' },
    { id: '14', name: 'Palais El Badi', code: 'EB01' },
  ],
}

export default function LineFormModal({ city, line, onSave, onCancel }: LineFormProps) {
  const [formData, setFormData] = useState({
    number: '',
    name: '',
  })

  const [selectedStops, setSelectedStops] = useState<Stop[]>([])
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (line) {
      setFormData({
        number: line.number,
        name: line.name,
      })
      // Mock: in real app, fetch stops from backend
      const availableStops = stopsByCity[city] || []
      const lineStops = availableStops.filter(stop => 
        line.direction.includes(stop.name)
      )
      setSelectedStops(lineStops.slice(0, line.stops))
    }
  }, [line, city])

  const availableStops = stopsByCity[city] || []
  const unusedStops = availableStops.filter(
    stop => !selectedStops.some(s => s.id === stop.id)
  )

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.number.trim()) newErrors.number = 'Le numéro est requis'
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis'
    if (selectedStops.length < 2) newErrors.stops = 'Sélectionnez au moins 2 arrêts'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddStop = (stop: Stop) => {
    setSelectedStops([...selectedStops, stop])
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    onSave({
      number: formData.number,
      name: formData.name,
      city,
      stops: selectedStops.length,
      direction: `${selectedStops[0].name} → ${selectedStops[selectedStops.length - 1].name}`,
      firstStop: selectedStops[0].name,
      lastStop: selectedStops[selectedStops.length - 1].name,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
          <h2 className="text-xl font-bold text-foreground">
            {line ? 'Modifier la ligne' : 'Créer une nouvelle ligne'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Informations Générales</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Numéro de ligne *
                </label>
                <input
                  type="text"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  placeholder="ex: L01"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    errors.number ? 'border-destructive' : 'border-input'
                  } bg-background text-foreground`}
                />
                {errors.number && <p className="text-xs text-destructive mt-1">{errors.number}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nom de la ligne *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="ex: Agadir Centre Ville"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    errors.name ? 'border-destructive' : 'border-input'
                  } bg-background text-foreground`}
                />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>
            </div>
          </div>

          {/* Drag & Drop Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Gérer les Arrêts *</h3>
            {errors.stops && <p className="text-xs text-destructive">{errors.stops}</p>}
            
            <div className="grid grid-cols-2 gap-4">
              {/* Available Stops */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3 px-3">Arrêts Disponibles</h4>
                <div className="space-y-2 p-3 bg-muted rounded-lg min-h-64 border border-input">
                  {unusedStops.length > 0 ? (
                    unusedStops.map(stop => (
                      <div
                        key={stop.id}
                        className="flex items-center justify-between p-3 bg-card rounded-lg border border-border hover:border-primary cursor-move transition-colors group"
                        draggable
                        onDragStart={() => setDraggedItem(stop.id)}
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{stop.name}</p>
                          <p className="text-xs text-muted-foreground">{stop.code}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleAddStop(stop)}
                          className="p-1 hover:bg-primary hover:text-primary-foreground rounded transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Tous les arrêts sont sélectionnés
                    </p>
                  )}
                </div>
              </div>

              {/* Selected Stops */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3 px-3">
                  Arrêts de la Ligne ({selectedStops.length})
                </h4>
                <div className="space-y-2 p-3 bg-muted rounded-lg min-h-64 border-2 border-dashed border-primary/30">
                  {selectedStops.length > 0 ? (
                    selectedStops.map((stop, index) => (
                      <div
                        key={stop.id}
                        draggable
                        onDragStart={() => setDraggedItem(stop.id)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          const draggedIndex = selectedStops.findIndex(
                            s => s.id === draggedItem
                          )
                          if (draggedIndex !== -1) {
                            handleReorderStops(draggedIndex, index)
                          }
                        }}
                        className="flex items-center gap-2 p-3 bg-card rounded-lg border border-border hover:border-primary transition-colors group cursor-grab active:cursor-grabbing"
                      >
                        <GripVertical className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold bg-primary text-primary-foreground px-2 py-1 rounded">
                              {index + 1}
                            </span>
                            <p className="text-sm font-medium text-foreground truncate">
                              {stop.name}
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground">{stop.code}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveStop(stop.id)}
                          className="p-1 hover:bg-destructive hover:text-destructive-foreground rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Glissez-déposez les arrêts ici
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 justify-end pt-6 border-t border-border">
            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:opacity-90"
            >
              {line ? 'Mettre à jour la ligne' : 'Sauvegarder la ligne'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
