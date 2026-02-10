"use client"

import { useState, useEffect } from "react"

interface Ticket {
  ticket_id: string
  ticket_code: string
  status: "ACTIVE" | "USED" | "EXPIRED" | "CANCELLED" | "active" | "used" | "expired" | "cancelled"
  ticket_type: "SINGLE" | "RETURN" | "DAY_PASS"
  price: string
  purchase_date: string
  valid_until: string
  departure_station: string
  arrival_station: string
  heure_depart?: string
  heure_arrivee?: string
  route_name: string
  line_number?: string
  ligne_id?: string
  arret_depart_id?: string
  arret_arrivee_id?: string
}

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

interface Schedule {
  departure_time: string
  arrival_time: string
  duration: string
  route_name: string
  schedule_id?: string
}

interface IdsResponse {
  depart_id: string
  arrivee_id: string
}

export default function ListeTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cancelLoading, setCancelLoading] = useState<string | null>(null)
  const [modifyLoading, setModifyLoading] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null)
  const [schedulesLoading, setSchedulesLoading] = useState(false)

  useEffect(() => {
    fetchUserTickets()
  }, [])

  const fetchUserTickets = async () => {
    try {
      const userId = localStorage.getItem("userId")
      
      if (!userId) {
        setError("Utilisateur non connecté")
        setLoading(false)
        return
      }

      const response = await fetch(`http://localhost:9002/api/tickets/my_tickets/?user_id=${userId}`)
      
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des tickets")
      }

      const result = await response.json()
      
      if (result.tickets && Array.isArray(result.tickets)) {
        setTickets(result.tickets)
      } else {
        setTickets([])
      }

    } catch (err) {
      console.error("Erreur:", err)
      setError("Impossible de charger les tickets")
    } finally {
      setLoading(false)
    }
  }

  const handleCancelTicket = async (ticketId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir annuler ce ticket ?")) {
      return
    }

    setCancelLoading(ticketId)
    try {
      const userId = localStorage.getItem("userId")
      
      if (!userId) {
        alert("Utilisateur non connecté")
        return
      }

      const response = await fetch(`http://localhost:9002/api/tickets/${ticketId}/cancel/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId
        })
      })

      if (!response.ok) {
        throw new Error("Erreur lors de l'annulation du ticket")
      }

      const result = await response.json()
      
      if (result.success) {
        setTickets(prevTickets => 
          prevTickets.map(ticket => 
            ticket.ticket_id === ticketId 
              ? { ...ticket, status: 'CANCELLED' as const }
              : ticket
          )
        )
        alert("Ticket annulé avec succès!")
      } else {
        throw new Error(result.message || "Erreur lors de l'annulation")
      }

    } catch (err) {
      console.error("Erreur:", err)
      alert(err.message || "Impossible d'annuler le ticket")
    } finally {
      setCancelLoading(null)
    }
  }

  const handleOpenModifyModal = async (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setSelectedSchedule(null)
    setSchedulesLoading(true)
    setShowModal(true)

    try {
      console.log("Début de la récupération des horaires pour:", {
        ligne_id: ticket.ligne_id || extractLineNumber(ticket.route_name),
        depart: ticket.departure_station,
        arrivee: ticket.arrival_station
      })

      // 1. Convertir les noms de gares en IDs
      const idsResponse = await fetch('http://localhost:8000/api/rechercher-ids-gares', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ligne_id: ticket.ligne_id || extractLineNumber(ticket.route_name),
          depart: ticket.departure_station,
          arrivee: ticket.arrival_station
        })
      })

      if (!idsResponse.ok) {
        throw new Error('Erreur lors de la recherche des IDs de gares')
      }

      const idsData: IdsResponse = await idsResponse.json()
      console.log("IDs reçus:", idsData)

      // Vérifier que les IDs sont valides (pas de champ "success" dans la réponse)
      if (!idsData.depart_id || !idsData.arrivee_id || idsData.depart_id === "string" || idsData.arrivee_id === "string") {
        throw new Error('IDs de gares invalides reçus')
      }

     // 2. Récupérer les horaires avec les vrais IDs
const dateRecherche = new Date(ticket.purchase_date).toISOString().split('T')[0] // ← CORRECTION ICI
const horairesUrl = `http://localhost:8000/api/horaires?ligne_id=${ticket.ligne_id || extractLineNumber(ticket.route_name)}&arret_depart_id=${idsData.depart_id}&arret_arrivee_id=${idsData.arrivee_id}&date_recherche=${dateRecherche}`
      console.log("URL des horaires:", horairesUrl)

      const horairesResponse = await fetch(horairesUrl)

      if (!horairesResponse.ok) {
        throw new Error(`Erreur HTTP ${horairesResponse.status} lors de la récupération des horaires`)
      }

      const horairesData: HorairesResponse = await horairesResponse.json()
      console.log("Horaires reçus:", horairesData)

      if (!horairesData.success) {
        throw new Error(horairesData.error || 'Erreur inconnue')
      }

      // Convertir le format Horaire en format Schedule pour la compatibilité
      const availableSchedules: Schedule[] = horairesData.horaires.map((horaire, index) => ({
        departure_time: horaire.heure_depart,
        arrival_time: horaire.heure_arrivee,
        duration: `${Math.floor(horaire.duree_minutes / 60)}h${(horaire.duree_minutes % 60).toString().padStart(2, '0')}min`,
        route_name: ticket.route_name,
        schedule_id: `schedule-${index}`
      }))

      setSchedules(availableSchedules)

    } catch (err) {
      console.error("Erreur détaillée:", err)
      setError(`Impossible de charger les horaires: ${err.message}`)
      setSchedules([])
    } finally {
      setSchedulesLoading(false)
    }
  }

const handleModifyTicket = async () => {
  if (!selectedTicket || !selectedSchedule) {
    alert("Veuillez sélectionner un horaire")
    return
  }

  setModifyLoading(selectedTicket.ticket_id)
  try {
    const response = await fetch(`http://localhost:9002/api/tickets/${selectedTicket.ticket_id}/modify/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        heure_depart: selectedSchedule.departure_time,
        heure_arrivee: selectedSchedule.arrival_time
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Erreur lors de la modification du ticket")
    }

    const result = await response.json()
    
    if (result.success) {
      // Mettre à jour le ticket localement
      setTickets(prevTickets => 
        prevTickets.map(ticket => 
          ticket.ticket_id === selectedTicket.ticket_id 
            ? { 
                ...ticket, 
                heure_depart: selectedSchedule.departure_time,
                heure_arrivee: selectedSchedule.arrival_time
              }
            : ticket
        )
      )

      setShowModal(false)
      setSelectedTicket(null)
      setSelectedSchedule(null)
      alert("Ticket modifié avec succès!")
    } else {
      throw new Error(result.message || "Erreur lors de la modification")
    }

  } catch (err) {
    console.error("Erreur:", err)
    alert(err.message || "Impossible de modifier le ticket")
  } finally {
    setModifyLoading(null)
  }
}

  const getStatusBadgeColor = (status: Ticket["status"]) => {
    const normalizedStatus = status.toUpperCase() as Ticket["status"]
    
    switch (normalizedStatus) {
      case "ACTIVE":
        return "bg-green-100 text-green-800"
      case "USED":
        return "bg-gray-100 text-gray-800"
      case "EXPIRED":
        return "bg-orange-100 text-orange-800"
      case "CANCELLED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusBadgeLabel = (status: Ticket["status"]) => {
    const normalizedStatus = status.toUpperCase() as Ticket["status"]
    
    switch (normalizedStatus) {
      case "ACTIVE":
        return "Actif"
      case "USED":
        return "Utilisé"
      case "EXPIRED":
        return "Expiré"
      case "CANCELLED":
        return "Annulé"
      default:
        return status
    }
  }

  const formatDateFrench = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date)
    } catch {
      return dateString
    }
  }

  const formatTime = (timeString?: string) => {
    if (!timeString) return '--:--'
    return timeString
  }

  const extractLineNumber = (routeName: string) => {
    const match = routeName.match(/(L\d+)/)
    return match ? match[1] : routeName
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h${mins.toString().padStart(2, '0')}min`
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="mb-4 inline-block animate-spin">
              <div className="h-12 w-12 rounded-full border-4 border-gray-300 border-t-blue-600"></div>
            </div>
            <p className="text-gray-600">Chargement de vos tickets...</p>
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Réessayer
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Mes Tickets</h1>
          <p className="text-lg text-gray-600">
            {tickets.length > 0 
              ? `Vous avez ${tickets.length} ticket${tickets.length > 1 ? 's' : ''}` 
              : "Aucun ticket trouvé"
            }
          </p>
        </div>

        {/* Tickets Grid */}
        <div className="space-y-6">
          {tickets.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aucun ticket trouvé</p>
              <p className="text-gray-400">Vos tickets apparaîtront ici après achat</p>
            </div>
          ) : (
            tickets.map((ticket) => (
              <div
                key={ticket.ticket_id || ticket.ticket_code}
                className={`bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:scale-105`}
              >
                <div className="p-6">
                  {/* Top Row: Code and Status */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
                    <h2 className="text-2xl font-bold text-white">{ticket.ticket_code}</h2>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold w-fit ${getStatusBadgeColor(ticket.status)}`}
                    >
                      {getStatusBadgeLabel(ticket.status)}
                    </span>
                  </div>

                  {/* Route Information */}
                  <div className="mb-6">
                    <p className="text-xs text-blue-100 mb-2 uppercase tracking-wide">Trajet</p>
                    <div className="flex items-center gap-3 text-xl font-bold text-white">
                      <span>{ticket.departure_station}</span>
                      <span className="text-blue-200">→</span>
                      <span>{ticket.arrival_station}</span>
                    </div>
                  </div>

                  {/* Grid Information */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {/* Departure Time */}
                    <div>
                      <p className="text-xs text-blue-100 uppercase tracking-wide mb-1">Départ</p>
                      <p className="text-lg font-bold text-white">{formatTime(ticket.heure_depart)}</p>
                    </div>

                    {/* Arrival Time */}
                    <div>
                      <p className="text-xs text-blue-100 uppercase tracking-wide mb-1">Arrivée</p>
                      <p className="text-lg font-bold text-white">{formatTime(ticket.heure_arrivee)}</p>
                    </div>

                    {/* Line Number */}
                    <div>
                      <p className="text-xs text-blue-100 uppercase tracking-wide mb-1">Ligne</p>
                      <p className="text-lg font-bold text-white">
                        {extractLineNumber(ticket.route_name)}
                      </p>
                    </div>

                    {/* Price */}
                    <div>
                      <p className="text-xs text-blue-100 uppercase tracking-wide mb-1">Prix</p>
                      <p className="text-lg font-bold text-white">{ticket.price}</p>
                    </div>

                    {/* Valid Until */}
                    <div>
                      <p className="text-xs text-blue-100 uppercase tracking-wide mb-1">Valide jusqu&apos;au</p>
                      <p className="text-sm font-semibold text-white">
                        {formatDateFrench(ticket.valid_until)}
                      </p>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-4 pt-4 border-t border-blue-400">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-blue-100"></p>
                        <p className="font-semibold text-white">
                          {formatDateFrench(ticket.purchase_date)}
                        </p>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex justify-end gap-2">
                        {ticket.status.toUpperCase() === "ACTIVE" && (
                          <>
                            <button
                              onClick={() => handleCancelTicket(ticket.ticket_id)}
                              disabled={cancelLoading === ticket.ticket_id}
                              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {cancelLoading === ticket.ticket_id ? "Annulation..." : "Annuler"}
                            </button>
                            <button
                              onClick={() => handleOpenModifyModal(ticket)}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                            >
                              Modifier
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal de modification des horaires */}
     {showModal && selectedTicket && (
  <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
      <div className="p-6">
        {/* Header similaire à ScheduleResults */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#1e40af] mb-2">
              Modifier l'horaire — {selectedTicket.ticket_code}
            </h2>
            <p className="text-[#374151]">
              Parcours : {selectedTicket.departure_station} → {selectedTicket.arrival_station}
            </p>
            <p className="text-sm text-[#6b7280]">
              Ligne: {extractLineNumber(selectedTicket.route_name)}
            </p>
          </div>
          <button
            onClick={() => {
              setShowModal(false)
              setSelectedTicket(null)
              setSelectedSchedule(null)
            }}
            className="px-6 py-2 text-[#1e40af] font-medium hover:bg-gray-100 rounded-lg transition-colors"
          >
            Fermer
          </button>
        </div>

        {schedulesLoading ? (
          <div className="text-center py-8">
            <div className="mb-4 inline-block animate-spin">
              <div className="h-8 w-8 rounded-full border-4 border-gray-300 border-t-blue-600"></div>
            </div>
            <p className="text-gray-600">Chargement des horaires...</p>
          </div>
        ) : schedules.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Aucun horaire disponible pour aujourd'hui</p>
          </div>
        ) : (
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Horaires disponibles</h3>
            {schedules.map((schedule, index) => (
              <div
                key={schedule.schedule_id || index}
                onClick={() => setSelectedSchedule(schedule)}
                className={`border-2 rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg ${
                  selectedSchedule?.departure_time === schedule.departure_time
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Schedule Header - Même design que ScheduleResults */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
                  {/* Departure */}
                  <div className="flex-1">
                    <p className="text-sm text-[#374151]">DÉPART</p>
                    <p className="text-2xl font-bold text-[#1e40af]">
                      {schedule.departure_time}
                    </p>
                  </div>

                  {/* Duration */}
                  <div className="flex-1 text-center">
                    <p className="text-sm text-[#374151]">DURÉE</p>
                    <p className="text-2xl font-bold text-[#374151]">
                      {schedule.duration}
                    </p>
                  </div>

                  {/* Arrival */}
                  <div className="flex-1 text-right">
                    <p className="text-sm text-[#374151]">ARRIVÉE</p>
                    <p className="text-2xl font-bold text-[#1e40af]">
                      {schedule.arrival_time}
                    </p>
                  </div>
                </div>

                {/* Route Info */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm text-[#374151]">
                  <span>{selectedTicket.departure_station}</span>
                  <span className="hidden md:inline">━━━</span>
                  <span>{selectedTicket.arrival_station}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={() => {
              setShowModal(false)
              setSelectedTicket(null)
              setSelectedSchedule(null)
            }}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg"
          >
            Annuler
          </button>
          <button
            onClick={handleModifyTicket}
            disabled={!selectedSchedule || modifyLoading === selectedTicket.ticket_id}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {modifyLoading === selectedTicket.ticket_id ? "Modification..." : "Confirmer la modification"}
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </main>
  )
}