"use client"

import { useEffect, useState, useMemo } from "react"
import DriverCard from "../driver-card"

interface StepThreeProps {
  cityId?: string
  lineId?: string
  driverId?: number  // ← Changé en number
  onDriverSelect: (driverId: number) => void  // ← Changé en number
}

interface Driver {
  id: number
  firstname: string
  lastname: string
  email: string
  phone?: string
  numero_permis?: string
  ville: string
  role: string
  is_active: boolean
  created_at: string
  updated_at: string
}

interface ApiResponse {
  users: Driver[]
  total: number
}

export default function StepThree({ cityId, lineId, driverId, onDriverSelect }: StepThreeProps) {
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Récupérer uniquement les CONDUCTEURS depuis l'API
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setLoading(true)
        setError(null)
        console.log("🔄 Début du chargement des conducteurs...")
        
        const response = await fetch("http://localhost:3001/api/utilisateurs/users?role=CONDUCTEUR&is_active=true")
        
        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status}`)
        }

        const data: ApiResponse = await response.json()
        console.log("📊 Conducteurs reçus:", data)
        
        setDrivers(data.users || [])
      } catch (err) {
        console.error("❌ Erreur:", err)
        setError("Impossible de charger les conducteurs")
      } finally {
        setLoading(false)
      }
    }

    fetchDrivers()
  }, [])

  // Filtrer les conducteurs par ville
  const filteredDrivers = useMemo(() => {
    if (!cityId) return []
    
    return drivers.filter(
      (driver) => driver.ville?.toUpperCase() === cityId.toUpperCase()
    )
  }, [drivers, cityId])

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Sélectionnez un Conducteur</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">Chargement des conducteurs...</p>
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
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Sélectionnez un Conducteur</h2>
        <p className="text-red-600 dark:text-red-400 mb-6">{error}</p>
        <div className="text-center py-8">
          <p className="text-slate-500 dark:text-slate-400">Impossible de charger les conducteurs</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
        Sélectionnez un Conducteur {cityId && `- ${cityId}`}
      </h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Choisissez le conducteur auquel assigner les bus
      </p>

      {/* Debug de la sélection */}
      {driverId && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded">
          <p className="text-sm text-green-800">
            ✅ Conducteur sélectionné: <strong>ID {driverId}</strong>
          </p>
        </div>
      )}

      {filteredDrivers.length === 0 ? (
        <div className="text-center py-8 text-slate-500 dark:text-slate-400">
          {cityId 
            ? `Aucun conducteur actif disponible à ${cityId}` 
            : "Sélectionnez d'abord une ville"
          }
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDrivers.map((driver) => (
            <button
              key={driver.id}
              onClick={() => onDriverSelect(driver.id)}  // ← Plus de .toString()
              className={`transition-all duration-200 ${driverId === driver.id ? "ring-2 ring-purple-600 rounded-lg" : ""}`}
            >
              <DriverCard 
                driver={{
                  id: driver.id.toString(),  // Garde string pour DriverCard si nécessaire
                  name: `${driver.firstname} ${driver.lastname}`,
                  licenseNumber: driver.numero_permis || "Non renseigné"
                }} 
                isSelected={driverId === driver.id}  // ← Comparaison number vs number
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}