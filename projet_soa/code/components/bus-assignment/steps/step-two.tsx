"use client"

import { useEffect, useState } from "react"
import { Route } from "lucide-react"
import { getLignesAvecArrets, type LigneAvecArrets } from "@/actions/ligneActions"

interface StepTwoProps {
  cityId?: string
  lineId?: string
  onLineSelect: (lineId: string) => void
}

export default function StepTwo({ cityId, lineId, onLineSelect }: StepTwoProps) {
  const [lignes, setLignes] = useState<LigneAvecArrets[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLignes = async () => {
      if (!cityId) {
        setLignes([])
        return
      }

      try {
        setLoading(true)
        setError(null)
        const result = await getLignesAvecArrets(cityId)
        
        if (result.success) {
          setLignes(result.data)
        } else {
          setError("Erreur lors du chargement des lignes")
        }
      } catch (err) {
        setError("Impossible de charger les lignes")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchLignes()
  }, [cityId])

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Sélectionnez une Ligne {cityId && `- ${cityId}`}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">Chargement des lignes...</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="p-4 rounded-lg border-2 border-slate-200 animate-pulse">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
                <div>
                  <div className="h-4 bg-slate-300 rounded w-24 mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-32"></div>
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
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Sélectionnez une Ligne {cityId && `- ${cityId}`}
        </h2>
        <p className="text-red-600 dark:text-red-400 mb-6">{error}</p>
        <div className="text-center py-8">
          <p className="text-slate-500 dark:text-slate-400">Impossible de charger les lignes</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
        Sélectionnez une Ligne {cityId && `- ${cityId}`}
      </h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Choisissez la ligne de bus pour laquelle assigner les conducteurs
      </p>

      {lignes.length === 0 ? (
        <div className="text-center py-8 text-slate-500 dark:text-slate-400">
          {cityId ? `Aucune ligne disponible pour ${cityId}` : "Sélectionnez d'abord une ville"}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lignes.map((ligne) => (
            <button
              key={ligne.id}
              onClick={() => onLineSelect(ligne.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                lineId === ligne.id
                  ? "border-green-600 bg-green-50 dark:bg-green-950"
                  : "border-slate-200 dark:border-slate-700 hover:border-green-300 dark:hover:border-green-700"
              }`}
            >
              <div className="flex items-start gap-3">
                <Route className={lineId === ligne.id ? "text-green-600" : "text-slate-400"} size={24} />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Ligne {ligne.numero}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{ligne.nom}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                    {ligne.nombre_arrets} arrêts
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}