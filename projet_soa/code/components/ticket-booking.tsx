"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Check } from "lucide-react"
import { purchaseTicketWithTransaction } from '@/actions/ticketActions'

interface PaymentMethod {
  id: string
  label: string
  description: string
}

interface Line {
  id: string
  number: string
  nom: string
  ville: string
  arrets: string[]
  nombre_arrets: number
}

interface TicketBookingProps {
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
  selectedSchedule: {
    heure_depart: string
    heure_arrivee: string
    duree_minutes: number
    direction: string
  }
  selectedLine: Line
  onBack: () => void
  onBookingComplete: () => void
}

const paymentMethods: PaymentMethod[] = [
  { id: "card", label: "Carte bancaire", description: "Paiement par carte bancaire" },
  { id: "cash", label: "Espèces", description: "Paiement en espèces" },
  { id: "mobile", label: "paiement mobile", description: "Paiement mobile" },
]

export default function TicketBooking({
  journeyDetails,
  selectedSchedule,
  selectedLine,
  onBack,
  onBookingComplete
}: TicketBookingProps) {
  const router = useRouter()
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

const handleBuyTicket = async () => {


  if (selectedPayment === "mobile") {
  // Stocker les données du trajet avant de naviguer
  const paymentData = {
    journeyDetails,
    selectedSchedule,
    selectedLine,
    selectedPayment: "mobile" // Ajouter le type de paiement
  }
  localStorage.setItem('mobilePaymentJourneyData', JSON.stringify(paymentData))
  
  router.push("/passager/trajets/paiement")
  return
}
  if (!selectedPayment) return

  try {
    setLoading(true)
    setError(null)

    const userId = localStorage.getItem('userId')
    
    if (!userId) {
      setError('Veuillez vous connecter pour acheter un ticket')
      return
    }

    const ticketData = {
      userId: userId,
      ligneId: selectedLine.id,
      routeName: `${selectedLine.number} - ${selectedLine.nom}`,
      departureStation: journeyDetails.departureName,
      arrivalStation: journeyDetails.arrivalName,
      heureDepart: selectedSchedule.heure_depart || '',
      heureArrivee: selectedSchedule.heure_arrivee || '',
      dateRecherche: journeyDetails.date_recherche, // ← Ajouté
    }

    console.log('🔍 Données envoyées:', ticketData)

    const result = await purchaseTicketWithTransaction(ticketData)

    if (result.success && result.ticket) {
      console.log('✅ Ticket créé avec succès:', result.ticket)
      
      // ✅ STOCKER TOUTES LES DONNÉES DU TICKET AVEC LA MÉTHODE DE PAIEMENT ET DATE_RECHERCHE
      const fullTicketData = {
        ...result.ticket,
        lineNumber: selectedLine.number,
        lineName: selectedLine.nom,
        journeyDate: journeyDetails.date_recherche, // ← DATE DE VOYAGE
        dateRecherche: journeyDetails.date_recherche, // ← AJOUTEZ CECI AUSSI
        duration: selectedSchedule.duree_minutes,
        payment_method: selectedPayment
      }
      
      localStorage.setItem('lastTicketData', JSON.stringify(fullTicketData))
      localStorage.setItem('lastTicketCode', result.ticket.ticket_code)

      setShowSuccess(true)
      
      setTimeout(() => {
        router.push(`trajets/ticket-pdf?ticket=${result.ticket.ticket_code}`)
        onBookingComplete()
      }, 2000)
    } else {
      setError(result.message || 'Erreur lors de l\'achat du ticket')
    }

  } catch (err) {
    console.error('Erreur achat ticket:', err)
    setError('Erreur de connexion au serveur')
  } finally {
    setLoading(false)
  }
}

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h${mins.toString().padStart(2, '0')}m`
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

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      {/* Back button */}
      <div className="mb-8 flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
      </div>

      <div className="mx-auto max-w-4xl">
        {/* Message d'erreur */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 border border-red-200">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {/* Success message overlay */}
        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
            <Card className="w-full max-w-md border-green-600 bg-white text-gray-900 shadow-2xl">
              <CardContent className="flex flex-col items-center py-12">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-600">
                  <Check className="h-8 w-8 text-white" />
                </div>
                <h2 className="mb-2 text-center text-2xl font-bold">Succès !</h2>
                <p className="text-center text-gray-600">
                  Votre trajet a été réservé avec succès. Redirection en cours...
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Trip Summary Card */}
        <Card className="mb-8 border-gray-200 bg-white shadow-lg">
          <CardHeader className="border-b border-gray-200 pb-8">
            <CardTitle className="text-3xl text-gray-900">Résumé du trajet</CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            {/* Line Info */}
            <div className="mb-8 grid grid-cols-2 gap-6">
              <div>
                <p className="text-lg text-gray-500">Numéro de ligne</p>
                <p className="text-2xl font-semibold text-gray-900">
                  Ligne {selectedLine.number}
                </p>
              </div>
              <div>
                <p className="text-lg text-gray-500">Nom de la ligne</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {selectedLine.nom}
                </p>
              </div>
            </div>

            {/* Informations supplémentaires de la ligne */}
            <div className="mb-6 grid grid-cols-2 gap-4 rounded-lg bg-blue-50 p-4">
              <div>
                <p className="text-sm text-gray-600">ID Ligne</p>
                <p className="text-sm font-medium text-gray-900">{selectedLine.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ville</p>
                <p className="text-sm font-medium text-gray-900">{selectedLine.ville}</p>
              </div>
            </div>

            {/* Journey Details */}
            <div className="mb-8 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-lg text-gray-500">Gare de départ</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {journeyDetails.departureName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg text-gray-500">Heure de départ</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {selectedSchedule.heure_depart}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 py-6">
                <div className="flex items-center justify-center space-x-4">
                  <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                  <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>
                  <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <p className="text-lg text-gray-500">Gare d&apos;arrivée</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {journeyDetails.arrivalName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg text-gray-500">Heure d&apos;arrivée</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {selectedSchedule.heure_arrivee}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-3 gap-6 border-t border-gray-200 pt-8">
              <div>
                <p className="text-lg text-gray-500">Date du voyage</p>
                <p className="text-xl font-semibold text-gray-900">
                  {formatDate(journeyDetails.date_recherche)}
                </p>
              </div>
              <div>
                <p className="text-lg text-gray-500">Durée du trajet</p>
                <p className="text-xl font-semibold text-gray-900">
                  {formatDuration(selectedSchedule.duree_minutes)}
                </p>
              </div>
              <div>
                <p className="text-lg text-gray-500">Prix</p>
                <p className="text-2xl font-bold text-blue-600">5,00 MAD</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method Selection */}
        <Card className="mb-8 border-gray-200 bg-white shadow-lg">
          <CardHeader className="border-b border-gray-200 pb-8">
            <CardTitle className="text-2xl text-gray-900">Méthode de paiement</CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Sélectionnez votre méthode de paiement (informative seulement)
            </p>
          </CardHeader>
          <CardContent className="space-y-6 pt-8">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className="flex cursor-pointer items-center space-x-6 rounded-lg border-2 border-gray-200 p-6 transition-all duration-200 hover:border-blue-400 hover:bg-gray-50"
              >
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={selectedPayment === method.id}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="h-6 w-6 cursor-pointer accent-blue-600"
                />
                <div>
                  <p className="text-xl font-semibold text-gray-900">{method.label}</p>
                  <p className="text-lg text-gray-600">{method.description}</p>
                </div>
              </label>
            ))}
          </CardContent>
        </Card>

        {/* Information sur le processus */}
        <div className="mb-6 rounded-lg bg-blue-50 p-4 border border-blue-200">
          <h3 className="font-medium text-blue-900 mb-2">Processus d'achat</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Le prix est fixé à <strong>5,00 MAD</strong> pour tous les trajets</li>
            <li>• Le ticket sera généré automatiquement après confirmation</li>
       
          </ul>
        </div>

        {/* Buy Button */}
        <Button
          onClick={handleBuyTicket}
          disabled={!selectedPayment || loading}
          size="lg"
          className="w-full bg-blue-600 py-4 text-xl font-semibold text-white bg-[#1e40af] hover:bg-[#1e3a8a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Traitement en cours...' : 'Réserver le billet - 5,00 MAD'}
        </Button>
      </div>
    </div>
  )
}