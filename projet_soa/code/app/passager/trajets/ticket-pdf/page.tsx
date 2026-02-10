"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Home, QrCode, Calendar, Clock, MapPin } from "lucide-react"

interface TicketData {
  ticket_id: string
  user_id: string
  ligne_id: string
  ticket_code: string
  price: string
  status: string
  purchase_date: string
  valid_until: string
  route_name: string
  departure_station: string
  arrival_station: string
  heure_depart?: string
  heure_arrivee?: string
  is_valid: boolean
  lineNumber?: string
  lineName?: string
  journeyDate?: string
  duration?: number
  payment_method?: string
}

export default function TicketPDF() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [ticketData, setTicketData] = useState<TicketData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const ticketRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadTicketData = async () => {
      try {
        const ticketCode = searchParams.get('ticket')
        
        if (!ticketCode) {
          setError("Code ticket manquant")
          setIsLoading(false)
          return
        }

        const storedTicketData = localStorage.getItem('lastTicketData')
        const storedTicketCode = localStorage.getItem('lastTicketCode')

        if (storedTicketData && storedTicketCode === ticketCode) {
          const parsedData = JSON.parse(storedTicketData)
          setTicketData(parsedData)
        } else {
          setError("Ticket non trouvé dans le stockage local")
        }
      } catch (err) {
        console.error('Erreur chargement ticket:', err)
        setError("Erreur lors du chargement du ticket")
      } finally {
        setIsLoading(false)
      }
    }

    loadTicketData()
  }, [searchParams])

  const handleDownloadPDF = () => {
    window.print()
  }

  const generateQRCode = (text: string) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  const formatTime = (timeString: string) => {
    if (!timeString) return '--:--'
    return timeString
  }

  const getPaymentMethodLabel = (method?: string) => {
    switch (method) {
      case 'card':
        return 'Carte bancaire'
      case 'cash':
        return 'Espèces'
      case 'mobile':
        return 'Paiement mobile'
      default:
        return 'À payer dans le bus'
    }
  }

  const handleHome = () => {
    router.push("/passager/trajets")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-4 md:p-8">
        <div className="mb-8 flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleHome}
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <Home className="mr-2 h-4 w-4" />
            Accueil
          </Button>
        </div>

        <div className="mx-auto max-w-2xl">
          <Card className="border-gray-200 bg-white shadow-lg">
            <CardContent className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="mb-4 inline-block animate-spin">
                  <div className="h-12 w-12 rounded-full border-4 border-gray-300 border-t-blue-600"></div>
                </div>
                <p className="text-gray-600">Chargement de votre ticket...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (error || !ticketData) {
    return (
      <div className="min-h-screen bg-white p-4 md:p-8">
        <div className="mb-8 flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleHome}
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <Home className="mr-2 h-4 w-4" />
            Accueil
          </Button>
        </div>

        <div className="mx-auto max-w-2xl">
          <Card className="border-gray-200 bg-white shadow-lg">
            <CardContent className="flex items-center justify-center py-16">
              <div className="text-center">
                <p className="text-red-600 text-lg mb-4">{error || "Ticket non trouvé"}</p>
                <Button onClick={handleHome}>
                  Retour à l'accueil
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="mb-8 flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleHome}
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <Home className="mr-2 h-4 w-4" />
          Accueil
        </Button>
      </div>

      <div className="mx-auto max-w-2xl">
        <Card className="border-gray-200 bg-white shadow-lg">
          <CardContent className="p-8">
            {/* Ticket Content */}
            <div 
              id="ticket-content"
              ref={ticketRef}
              className="mb-8 rounded-lg bg-white p-8 text-gray-900 shadow-lg border-2 border-gray-300"
              style={{ 
                fontFamily: "'Roboto', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'", // Police uniforme
                background: 'white',
                color: 'black'
              }}
            >
              
              {/* En-tête du ticket */}
              <div className="mb-6 border-b-2 border-blue-600 pb-4" style={{ fontFamily: "'Roboto', sans-serif" }}>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-blue-800" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 700 }}>
                    TICKET DE TRANSPORT
                  </h2>
                </div>
              </div>

              {/* QR Code et informations principales */}
              <div className="mb-6 grid grid-cols-3 gap-6" style={{ fontFamily: "'Roboto', sans-serif" }}>
                <div className="col-span-2">
                  {/* Informations du trajet */}
                  <div className="mb-4 grid grid-cols-2 gap-4">
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div style={{ fontFamily: "'Roboto', sans-serif" }}>
                        <p className="text-xs font-semibold text-gray-500 uppercase" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 600 }}>
                          Départ
                        </p>
                        <p className="text-lg font-bold" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 700 }}>
                          {ticketData.departure_station}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center" style={{ fontFamily: "'Roboto', sans-serif" }}>
                          <Clock className="h-3 w-3 mr-1" />
                          {formatTime(ticketData.heure_depart)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                      <div style={{ fontFamily: "'Roboto', sans-serif" }}>
                        <p className="text-xs font-semibold text-gray-500 uppercase" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 600 }}>
                          Arrivée
                        </p>
                        <p className="text-lg font-bold" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 700 }}>
                          {ticketData.arrival_station}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center" style={{ fontFamily: "'Roboto', sans-serif" }}>
                          <Clock className="h-3 w-3 mr-1" />
                          {formatTime(ticketData.heure_arrivee)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Date et ligne */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-600" />
                      <div style={{ fontFamily: "'Roboto', sans-serif" }}>
                        <p className="text-xs text-gray-600" style={{ fontFamily: "'Roboto', sans-serif" }}>
                          Date du voyage
                        </p>
                        <p className="font-semibold" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 600 }}>
                          {ticketData.journeyDate ? 
                            formatDate(ticketData.journeyDate) : 
                            formatDate(ticketData.purchase_date)
                          }
                        </p>
                      </div>
                    </div>
                    <div style={{ fontFamily: "'Roboto', sans-serif" }}>
                      <p className="text-xs text-gray-600" style={{ fontFamily: "'Roboto', sans-serif" }}>
                        Ligne
                      </p>
                      <p className="text-lg font-bold text-blue-600" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 700 }}>
                        {ticketData.route_name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* QR Code */}
                <div className="flex flex-col items-center justify-center border-l-2 border-gray-200 pl-6" style={{ fontFamily: "'Roboto', sans-serif" }}>
                  <div className="mb-2 flex items-center space-x-1">
                    <QrCode className="h-4 w-4 text-gray-600" />
                    <span className="text-xs font-semibold text-gray-600" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 600 }}>
                      CODE QR
                    </span>
                  </div>
                  <img 
                    src={generateQRCode(ticketData.ticket_code)} 
                    alt={`QR Code pour ${ticketData.ticket_code}`}
                    className="h-32 w-32 border border-gray-300 rounded"
                    crossOrigin="anonymous"
                  />
                  <p className="mt-2 text-xs text-center text-gray-600 font-mono" 
                     style={{ fontFamily: "'Roboto Mono', 'Monaco', 'Courier New', 'monospace'", letterSpacing: '0.05em' }}>
                    {ticketData.ticket_code}
                  </p>
                </div>
              </div>

              {/* Informations supplémentaires */}
              <div className="border-t border-gray-200 pt-4" style={{ fontFamily: "'Roboto', sans-serif" }}>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600" style={{ fontFamily: "'Roboto', sans-serif" }}>
                      Date d'achat
                    </p>
                    <p className="font-semibold" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 600 }}>
                      {formatDate(ticketData.purchase_date)}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-gray-600" style={{ fontFamily: "'Roboto', sans-serif" }}>
                      ID Ligne
                    </p>
                    <p className="font-semibold font-mono" 
                       style={{ fontFamily: "'Roboto Mono', 'Monaco', 'Courier New', 'monospace'", fontWeight: 600 }}>
                      {ticketData.ligne_id}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-gray-600" style={{ fontFamily: "'Roboto', sans-serif" }}>
                      Prix
                    </p>
                    <p className="font-semibold" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 600 }}>
                      {ticketData.price || '5,00'} MAD
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-gray-600" style={{ fontFamily: "'Roboto', sans-serif" }}>
                      Méthode de paiement
                    </p>
                    <p className="font-semibold" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 600 }}>
                      {getPaymentMethodLabel(ticketData.payment_method)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-6 border-t-2 border-dashed border-gray-400 pt-4 text-center text-xs text-gray-600" 
                   style={{ fontFamily: "'Roboto', sans-serif" }}>
                <p className="font-semibold mb-1" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 600 }}>
                  ⚠️ CONSERVEZ CE TICKET JUSQU'À LA FIN DU TRAJET
                </p>
                <p style={{ fontFamily: "'Roboto', sans-serif" }}>
                  Présentez ce ticket au contrôleur
                </p>
             
              </div>
            </div>

            {/* Download Button */}
            <Button
              onClick={handleDownloadPDF}
              size="lg"
              className="w-full bg-blue-600 py-3 text-lg font-semibold text-white hover:bg-blue-700"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              <Download className="mr-2 h-5 w-5" />
              Télécharger le PDF
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}