"use client"

import { useState, useEffect } from "react"
import CreditCard from "@/components/credit-card"
import PaymentForm from "@/components/payment-form"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { purchaseTicketWithTransaction } from '@/actions/ticketActions'
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function PaymentPage() {
  const router = useRouter()
  
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    cardType: "visa" as "visa" | "mastercard" | "amex" | "discover" | "diners" | "jcb",
  })

  const [isFlipped, setIsFlipped] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  
  // Récupérer les données du trajet depuis localStorage
  const [journeyData, setJourneyData] = useState<any>(null)

  useEffect(() => {
    // Récupérer les données stockées par TicketBooking
    const savedData = localStorage.getItem('mobilePaymentJourneyData')
    if (savedData) {
      setJourneyData(JSON.parse(savedData))
      console.log('📋 Données récupérées:', JSON.parse(savedData))
    } else {
      setError("Aucune donnée de trajet trouvée. Veuillez revenir à la sélection.")
    }
  }, [])

  const handleConfirmPayment = async () => {
    // Validation des champs de carte
    if (!cardData.cardNumber || !cardData.cardHolder || !cardData.expiryDate || !cardData.cvv) {
      setError("Veuillez remplir tous les champs de la carte")
      return
    }

    if (!journeyData) {
      setError("Données du trajet non disponibles")
      return
    }

    try {
      setLoading(true)
      setError(null)

      const userId = localStorage.getItem('userId')
      
      if (!userId) {
        setError('Veuillez vous connecter pour acheter un ticket')
        return
      }

      // Préparer les données pour l'achat du ticket
      const ticketData = {
        userId: userId,
        ligneId: journeyData.selectedLine.id,
        routeName: `${journeyData.selectedLine.number} - ${journeyData.selectedLine.nom}`,
        departureStation: journeyData.journeyDetails.departureName,
        arrivalStation: journeyData.journeyDetails.arrivalName,
        heureDepart: journeyData.selectedSchedule.heure_depart || '',
        heureArrivee: journeyData.selectedSchedule.heure_arrivee || '',
        dateRecherche: journeyData.journeyDetails.date_recherche,
      }

      console.log('🔍 Données envoyées pour paiement mobile:', ticketData)

      // Appeler la fonction d'achat
      const result = await purchaseTicketWithTransaction(ticketData)

      if (result.success && result.ticket) {
        console.log('✅ Ticket créé avec succès via paiement mobile:', result.ticket)
        
        // Stocker les données du ticket
        const fullTicketData = {
          ...result.ticket,
          lineNumber: journeyData.selectedLine.number,
          lineName: journeyData.selectedLine.nom,
          journeyDate: journeyData.journeyDetails.date_recherche,
          dateRecherche: journeyData.journeyDetails.date_recherche,
          duration: journeyData.selectedSchedule.duree_minutes,
          payment_method: "mobile"
        }
        
        localStorage.setItem('lastTicketData', JSON.stringify(fullTicketData))
        localStorage.setItem('lastTicketCode', result.ticket.ticket_code)

        // Nettoyer les données temporaires
        localStorage.removeItem('mobilePaymentJourneyData')

        setShowSuccess(true)
        
        // Rediriger vers le PDF du ticket après 2 secondes
        setTimeout(() => {
          router.push(`/passager/trajets/ticket-pdf?ticket=${result.ticket.ticket_code}`)
        }, 2000)
      } else {
        setError(result.message || 'Erreur lors du paiement mobile')
      }

    } catch (err) {
      console.error('Erreur paiement mobile:', err)
      setError('Erreur de connexion au serveur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        {/* Titre */}
        <div className="mb-8 text-center space-y-3">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Paiement mobile
          </h1>
          <p className="text-muted-foreground text-lg">Saisissez vos informations de paiement</p>
          
       
          
        </div>

    

        {/* Carte de crédit */}
        <div className="mb-10 flex justify-center perspective">
          <CreditCard
            cardNumber={cardData.cardNumber}
            cardHolder={cardData.cardHolder}
            expiryDate={cardData.expiryDate}
            cvv={cardData.cvv}
            cardType={cardData.cardType}
            isFlipped={isFlipped}
          />
        </div>

        {/* Formulaire de paiement */}
        <PaymentForm 
          cardData={cardData} 
          setCardData={setCardData} 
          isFlipped={isFlipped} 
          setIsFlipped={setIsFlipped} 
        />

        {/* Bouton de confirmation */}
        <div className="mt-8 space-y-4">
          {error && journeyData && (
            <div className="rounded-lg bg-red-50 p-4 border border-red-200">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}
          
          <Button
            onClick={handleConfirmPayment}
            disabled={loading || !cardData.cardNumber || !cardData.cardHolder || !cardData.expiryDate || !cardData.cvv || !journeyData}
            size="lg"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6 text-lg transition-all duration-200"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Traitement en cours...
              </span>
            ) : 'Confirmer le paiement - 5,00 MAD'}
          </Button>
          
          
        </div>

        {/* Message de succès overlay */}
        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
            <Card className="w-full max-w-md border-green-600 bg-white shadow-2xl">
              <CardContent className="flex flex-col items-center py-12">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-600">
                  <Check className="h-8 w-8 text-white" />
                </div>
                <h2 className="mb-2 text-center text-2xl font-bold">Paiement réussi !</h2>
                <p className="text-center text-gray-600">
                  Votre ticket a été acheté avec succès. Redirection en cours...
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  )
}