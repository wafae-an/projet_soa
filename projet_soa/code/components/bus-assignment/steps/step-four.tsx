"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import DragDropContainer from "../drag-drop-container"

interface StepFourProps {
  cityId?: string
  lineId?: string
  driverId?: number
  onComplete?: () => void
}

interface BusFromAPI {
  id: number
  numero_immatriculation: string
  modele: string
  capacite: number
  ville: string
  ligne_id: string
  conducteur_id: number | null
  statut: string
}

interface BusAssignmentResponse {
  bus_disponibles: BusFromAPI[]
  bus_assignes_au_conducteur: BusFromAPI[]
  total_disponibles: number
  total_assignes: number
}

export default function StepFour({ cityId, lineId, driverId, onComplete }: StepFourProps) {
  const [busData, setBusData] = useState<BusAssignmentResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [localAssignedBusIds, setLocalAssignedBusIds] = useState<string[]>([])

  // Récupérer les données depuis l'API
  useEffect(() => {
    const fetchBusData = async () => {
      if (!lineId || driverId === undefined) return

      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(
          `http://localhost:8000/bus/assignment-status/${lineId}?conducteur_id=${driverId}`
        )
        
        if (!response.ok) {
          throw new Error(`Erreur API: ${response.status}`)
        }

        const data: BusAssignmentResponse = await response.json()
        setBusData(data)
        // Initialiser les IDs locaux avec les bus déjà assignés
        setLocalAssignedBusIds(data.bus_assignes_au_conducteur.map(bus => bus.id.toString()))
        
      } catch (err) {
        console.error("Erreur lors du chargement des bus:", err)
        setError("Impossible de charger les bus")
      } finally {
        setLoading(false)
      }
    }

    fetchBusData()
  }, [lineId, driverId])

  // Mettre à jour les assignations locales quand le drag & drop change
  const handleAssignmentChange = (busIds: string[]) => {
    setLocalAssignedBusIds(busIds)
    console.log("Bus assignés mis à jour:", busIds)
  }

  // Fonction pour sauvegarder les assignations
  const handleSave = async () => {
    if (!lineId || driverId === undefined) return

    setIsSaving(true)
    try {
      // Convertir les IDs de string à number pour l'API
      const busIdsNumbers = localAssignedBusIds.map(id => parseInt(id))
      
      const response = await fetch(`http://localhost:8000/bus/update-assignments/${lineId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conducteur_id: driverId,
          bus_ids: busIdsNumbers
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Erreur lors de la sauvegarde des assignations")
      }

      const result = await response.json()
      console.log("Résultat de la mise à jour:", result)
      
      // Rafraîchir les données après la sauvegarde
      await refreshBusData()
      
      setSaveSuccess(true)
      
      setTimeout(() => {
        setSaveSuccess(false)
        onComplete?.()
      }, 2000)
      
    } catch (err) {
      console.error("Erreur sauvegarde:", err)
      setError(err instanceof Error ? err.message : "Erreur lors de la sauvegarde des assignations")
    } finally {
      setIsSaving(false)
    }
  }

  // Rafraîchir les données après modification
  const refreshBusData = async () => {
    if (!lineId || driverId === undefined) return

    try {
      const response = await fetch(
        `http://localhost:8000/bus/assignment-status/${lineId}?conducteur_id=${driverId}`
      )
      
      if (response.ok) {
        const data: BusAssignmentResponse = await response.json()
        setBusData(data)
        // Resynchroniser les IDs locaux
        setLocalAssignedBusIds(data.bus_assignes_au_conducteur.map(bus => bus.id.toString()))
      }
    } catch (err) {
      console.error("Erreur lors du rafraîchissement:", err)
    }
  }

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Assignez les Bus</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">Chargement des bus...</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="p-4 rounded-lg border-2 border-slate-200 animate-pulse">
              <div className="space-y-2">
                <div className="h-4 bg-slate-300 rounded w-32"></div>
                <div className="h-3 bg-slate-200 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Assignez les Bus</h2>
        <p className="text-red-600 dark:text-red-400 mb-6">{error}</p>
        <div className="text-center py-8">
          <Button 
            onClick={() => setError(null)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Réessayer
          </Button>
        </div>
      </div>
    )
  }

  if (!busData) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Assignez les Bus</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">Aucune donnée disponible</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Assignez les Bus</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Glissez-déposez les bus pour assigner au conducteur (ID: {driverId})
      </p>

      {/* Info Card */}
      <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 mb-6">
        <div className="flex gap-3">
          <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
          <div>
            <p className="font-medium text-blue-900 dark:text-blue-200">
              Bus assignés : {localAssignedBusIds.length} / Bus disponibles : {busData.total_disponibles}
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Ligne: {lineId} | Conducteur: {driverId}
            </p>
          </div>
        </div>
      </Card>

      {/* Drag and Drop Container */}
      <DragDropContainer
        availableBuses={busData.bus_disponibles.map(bus => ({
          id: bus.id.toString(),
          cityId: bus.ville,
          lineId: bus.ligne_id,
          busNumber: bus.modele,
          licensePlate: bus.numero_immatriculation,
          status: "en_service",
          capacity: bus.capacite
        }))}
        assignedBuses={busData.bus_assignes_au_conducteur.map(bus => ({
          id: bus.id.toString(),
          cityId: bus.ville,
          lineId: bus.ligne_id,
          busNumber: bus.modele,
          licensePlate: bus.numero_immatriculation,
          status: "en_service",
          capacity: bus.capacite
        }))}
        onAssignmentChange={handleAssignmentChange}
      />

      {/* Success Message */}
      {saveSuccess && (
        <Card className="p-4 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 mt-6">
          <div className="flex gap-3 items-center">
            <CheckCircle2 className="text-green-600" size={20} />
            <p className="font-medium text-green-900 dark:text-green-200">Assignation sauvegardée avec succès !</p>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <Button
          onClick={handleSave}
          disabled={isSaving || localAssignedBusIds.length === 0}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sauvegarde...
            </>
          ) : (
            "Sauvegarder les Assignations"
          )}
        </Button>
      </div>
    </div>
  )
}