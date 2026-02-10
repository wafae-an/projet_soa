"use client"

import { useEffect, useState } from "react"
import { MapPin } from "lucide-react"
import { getVilles } from "@/actions/villeActions" // Import de votre fonction serveur

interface StepOneProps {
  cityId?: string
  onCitySelect: (cityId: string) => void
}

export default function StepOne({ cityId, onCitySelect }: StepOneProps) {
  const [villes, setVilles] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVilles = async () => {
      try {
        setLoading(true)
        const result = await getVilles() // Appel direct de votre fonction serveur
        
        if (result.success) {
          setVilles(result.data)
        } else {
          setError("Erreur lors du chargement des villes")
        }
      } catch (err) {
        setError("Impossible de charger les villes")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchVilles()
  }, [])

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Sélectionnez une Ville</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">Chargement des villes...</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="p-4 rounded-lg border-2 border-slate-200 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
                <div>
                  <div className="h-4 bg-slate-300 rounded w-24 mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-16"></div>
                </div>
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
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Sélectionnez une Ville</h2>
        <p className="text-red-600 dark:text-red-400 mb-6">{error}</p>
        <div className="text-center py-8">
          <p className="text-slate-500 dark:text-slate-400">Impossible de charger les villes</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Sélectionnez une Ville</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6">Choisissez la ville où vous souhaitez assigner les bus</p>

      {villes.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-slate-500 dark:text-slate-400">Aucune ville disponible</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {villes.map((ville) => (
            <button
              key={ville}
              onClick={() => onCitySelect(ville)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                cityId === ville
                  ? "border-blue-600 bg-blue-50 dark:bg-blue-950"
                  : "border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <MapPin className={cityId === ville ? "text-blue-600" : "text-slate-400"} size={24} />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{ville}</p>
                  
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}