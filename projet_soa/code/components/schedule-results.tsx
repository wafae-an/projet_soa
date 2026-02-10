'use client'

import { useState, useEffect } from 'react'

interface Horaire {
  ligne_id: string
  arret_depart_id: string
  arret_arrivee_id: string
  direction: string
  heure_depart: string
  heure_arrivee: string
  duree_minutes: number
  date_validite: string
}

interface HorairesResponse {
  success: boolean
  ligne_id: string
  arret_depart_id: string
  arret_arrivee_id: string
  direction_auto: string
  date_recherche: string
  temps_trajet_minutes: number
  nombre_horaires: number
  horaires: Horaire[]
  error?: string
}

// ⭐ MODIFICATION: Ajout de onScheduleSelect dans les props
interface ScheduleResultsProps {
  city: string
  line: {
    id: string
    number: string
    nom: string
  }
  journeyDetails: {
    ligne_id: string
    depart: string
    arrivee: string
    date_recherche: string
    departureName: string
    arrivalName: string
    lineNumber: string
    lineName: string
  }
  onNewSearch: () => void
  onScheduleSelect: (schedule: Horaire) => void  // ⭐ NOUVELLE PROP
}

export default function ScheduleResults({
  city,
  line,
  journeyDetails,
  onNewSearch,
  onScheduleSelect  // ⭐ AJOUT: Récupération de la nouvelle prop
}: ScheduleResultsProps) {
  const [schedules, setSchedules] = useState<Horaire[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchHoraires()
  }, [journeyDetails])

  const fetchHoraires = async () => {
    try {
      setLoading(true)
      setError(null)

      // 1. Convertir les noms en IDs
      const idsResponse = await fetch('http://localhost:3001/api/trajets/api/rechercher-ids-gares', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ligne_id: journeyDetails.ligne_id,
          depart: journeyDetails.depart,
          arrivee: journeyDetails.arrivee
        })
      })

      if (!idsResponse.ok) {
        throw new Error('Erreur lors de la recherche des IDs de gares')
      }

      const idsData = await idsResponse.json()

      // 2. Récupérer les horaires avec les vrais IDs
      const horairesResponse = await fetch(`http://localhost:3001/api/trajets/api/horaires?ligne_id=${journeyDetails.ligne_id}&arret_depart_id=${idsData.depart_id}&arret_arrivee_id=${idsData.arrivee_id}&date_recherche=${journeyDetails.date_recherche}`)

      if (!horairesResponse.ok) {
        throw new Error('Erreur lors de la récupération des horaires')
      }

      const horairesData: HorairesResponse = await horairesResponse.json()

      if (!horairesData.success) {
        throw new Error(horairesData.error || 'Erreur inconnue')
      }

      setSchedules(horairesData.horaires)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h${mins.toString().padStart(2, '0')}min`
  }

  // ⭐ AJOUT: Fonction pour gérer le clic sur réserver
  const handleReserveClick = (schedule: Horaire) => {
    onScheduleSelect(schedule)
  }

  if (loading) {
    return (
      <div className="ml-[280px] min-h-screen bg-white p-8">
        <div className="max-w-4xl mx-auto text-center py-12">
          <div className="text-lg text-[#374151]">Chargement des horaires...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="ml-[280px] min-h-screen bg-white p-8">
        <div className="max-w-4xl mx-auto text-center py-12">
          <div className="text-red-600 text-lg mb-4">Erreur: {error}</div>
          <button
            onClick={onNewSearch}
            className="px-6 py-2 text-[#1e40af] font-medium hover:bg-gray-100 rounded-lg transition-colors"
          >
            Nouvelle recherche
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="ml-[280px] min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#1e40af] mb-2">
              Trajets disponibles — {formatDate(journeyDetails.date_recherche)}
            </h2>
            <p className="text-[#374151]">
              Parcours : {journeyDetails.departureName} → {journeyDetails.arrivalName}
            </p>
          </div>
          <button
            onClick={onNewSearch}
            className="px-6 py-2 text-[#1e40af] font-medium hover:bg-gray-100 rounded-lg transition-colors"
          >
            Nouvelle recherche
          </button>
        </div>

        {/* Schedules List */}
        <div className="space-y-4">
          {schedules.map((schedule, index) => (
            <div
              key={index}
              className="border border-[#e5e7eb] rounded-lg p-6 hover:shadow-lg transition-shadow bg-white"
            >
              {/* Schedule Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                {/* Departure */}
                <div className="flex-1">
                  <p className="text-sm text-[#374151]">DÉPART</p>
                  <p className="text-2xl font-bold text-[#1e40af]">
                    {schedule.heure_depart}
                  </p>
                </div>

                {/* Duration & Transfers */}
                <div className="flex-1 text-center">
                  <p className="text-sm text-[#374151]">DURÉE</p>
                  <p className="text-2xl font-bold text-[#374151]">
                    {formatDuration(schedule.duree_minutes)}
                  </p>
                  <p className="text-xs text-[#6b7280] mt-1">
                    ({schedule.direction.toLowerCase()})
                  </p>
                </div>

                {/* Arrival */}
                <div className="flex-1 text-right">
                  <p className="text-sm text-[#374151]">ARRIVÉE</p>
                  <p className="text-2xl font-bold text-[#1e40af]">
                    {schedule.heure_arrivee}
                  </p>
                </div>
              </div>

              {/* Route Info */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm text-[#374151] mb-6 pb-6 border-b border-[#e5e7eb]">
                <span>{journeyDetails.departureName}</span>
                <span className="hidden md:inline">━━━</span>
                <span>{journeyDetails.arrivalName}</span>
              </div>

              {/* Reserve Button */}
              <div className="flex justify-center">
                <button 
                  onClick={() => handleReserveClick(schedule)}  // ⭐ MODIFICATION: Appel de la fonction
                  className="bg-[#1e40af] text-white px-8 py-3 rounded font-bold hover:bg-[#1e3a8a] transition-colors"
                >
                  RÉSERVER CE TRAJET
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}