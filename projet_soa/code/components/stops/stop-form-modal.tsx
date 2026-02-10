'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Stop {
  id: string
  nom: string
  ville: string
  code: string
  adresse: string
  latitude: number
  longitude: number
}

interface StopFormProps {
  city: string
  stop?: Stop | null
  onSave: () => void
  onCancel: () => void
}

const API_BASE_URL = 'http://localhost:8000'

export default function StopFormModal({ city, stop, onSave, onCancel }: StopFormProps) {
  const [formData, setFormData] = useState({
    nom: '',
    code: '',
    adresse: '',
    latitude: '',
    longitude: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Initialize form with stop data if editing
  useEffect(() => {
    if (stop) {
      setFormData({
        nom: stop.nom || '',
        code: stop.code || '',
        adresse: stop.adresse || '',
        latitude: stop.latitude.toString(),
        longitude: stop.longitude.toString(),
      })
    } else {
      // Reset form for new stop
      setFormData({
        nom: '',
        code: '',
        adresse: '',
        latitude: '',
        longitude: '',
      })
    }
  }, [stop])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis'
    if (!formData.adresse.trim()) newErrors.adresse = 'L\'adresse est requise'
    if (!formData.latitude) newErrors.latitude = 'La latitude est requise'
    if (!formData.longitude) newErrors.longitude = 'La longitude est requise'

    const lat = parseFloat(formData.latitude)
    const lng = parseFloat(formData.longitude)

    if (isNaN(lat) || lat < -90 || lat > 90) {
      newErrors.latitude = 'Latitude invalide (-90 à 90)'
    }
    if (isNaN(lng) || lng < -180 || lng > 180) {
      newErrors.longitude = 'Longitude invalide (-180 à 180)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setSubmitError(null)

  if (!validateForm()) return

  setLoading(true)
  try {
    // DEBUG: Vérifier la valeur de city
    console.log('🔴 VALEUR DE CITY:', city)
    console.log('🔴 TYPE DE CITY:', typeof city)

    if (stop) {
      // Mode édition...
    } else {
      // Mode création - POST avec tous les champs requis
      const stopData = {
        nom: formData.nom,
        ville: city, // ← On vérifie que cette ligne est bien exécutée
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        code: formData.code || null,
        adresse: formData.adresse || null,
      }

      // DEBUG: Vérifier les données AVANT envoi
      console.log('🟡 DONNÉES COMPLÈTES AVANT ENVOI:', stopData)
      console.log('🟡 VILLE DANS STOPDATA:', stopData.ville)

      const response = await fetch(`${API_BASE_URL}/arrets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stopData),
      })

      // DEBUG: Vérifier la requête
      console.log('🔵 URL APPELÉE:', `${API_BASE_URL}/arrets`)
      console.log('🔵 STATUT RESPONSE:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('🔴 RÉPONSE ERREUR COMPLÈTE:', errorText)
        
        let errorDetail = `Erreur ${response.status}`
        try {
          const errorData = JSON.parse(errorText)
          errorDetail = errorData.detail || errorDetail
        } catch {
          errorDetail = errorText || errorDetail
        }
        
        throw new Error(errorDetail)
      }

      const result = await response.json()
      console.log('🟢 SUCCÈS:', result)
    }
    
    onSave()
  } catch (error) {
    console.error('❌ ERREUR COMPLÈTE:', error)
    setSubmitError(error instanceof Error ? error.message : 'Erreur lors de la sauvegarde')
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">
            {stop ? 'Modifier l\'arrêt' : 'Créer un nouvel arrêt'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            disabled={loading}
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Informations Principales</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nom de l'arrêt *
                </label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  placeholder="ex: Gare Routière"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    errors.nom ? 'border-destructive' : 'border-input'
                  } bg-background text-foreground`}
                  disabled={loading}
                />
                {errors.nom && <p className="text-xs text-destructive mt-1">{errors.nom}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Code
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="ex: GR01"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Adresse *
              </label>
              <input
                type="text"
                value={formData.adresse}
                onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                placeholder="ex: Avenue Hassan II, Agadir"
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.adresse ? 'border-destructive' : 'border-input'
                } bg-background text-foreground`}
                disabled={loading}
              />
              {errors.adresse && <p className="text-xs text-destructive mt-1">{errors.adresse}</p>}
            </div>
          </div>

          {/* Coordinates */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Géolocalisation</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Latitude *
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                  placeholder="30.4202"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    errors.latitude ? 'border-destructive' : 'border-input'
                  } bg-background text-foreground`}
                  disabled={loading}
                />
                {errors.latitude && <p className="text-xs text-destructive mt-1">{errors.latitude}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Longitude *
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                  placeholder="-9.5981"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    errors.longitude ? 'border-destructive' : 'border-input'
                  } bg-background text-foreground`}
                  disabled={loading}
                />
                {errors.longitude && <p className="text-xs text-destructive mt-1">{errors.longitude}</p>}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {submitError && (
            <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
              <p className="text-sm text-destructive">{submitError}</p>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex gap-3 justify-end pt-6 border-t border-border">
            <Button 
              type="button" 
              onClick={onCancel} 
              variant="outline"
              disabled={loading}
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              className="bg-primary text-primary-foreground hover:opacity-90"
              disabled={loading}
            >
              {loading ? 'Sauvegarde...' : stop ? 'Mettre à jour l\'arrêt' : 'Créer l\'arrêt'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}