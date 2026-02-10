'use client'

import { useState } from 'react'
import Sidebar from '@/components/sidebar'
import CitySelection from '@/components/city-selection'
import LineDisplay from '@/components/line-display'
import JourneyConfiguration from '@/components/journey-configuration'
import ScheduleResults from '@/components/schedule-results'
import TicketBooking from '@/components/ticket-booking'
import ListeTickets from '@/components/liste-tickets'
import BusTracker  from '@/components/bus-tracker'

type Step = 'city' | 'lines' | 'journey' | 'schedules' | 'booking'
type View = 'booking' | 'tickets' | 'geolocation' | 'subscription' | 'profile'

// Interface Line cohérente avec LineDisplay
interface Line {
  id: string
  number: string
  nom: string
  ville: string
  arrets: string[]
  nombre_arrets: number
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>('city')
  const [currentView, setCurrentView] = useState<View>('booking')
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [selectedLine, setSelectedLine] = useState<Line | null>(null) // ✅ Stocke la ligne complète
  const [journeyDetails, setJourneyDetails] = useState<{
    ligne_id: string
    depart: string
    arrivee: string
    date_recherche: string
    departureName: string
    arrivalName: string
    lineNumber: string
    lineName: string
  } | null>(null)
  const [selectedSchedule, setSelectedSchedule] = useState<{
    ligne_id: string
    arret_depart_id: string
    arret_arrivee_id: string
    direction: string
    heure_depart: string
    heure_arrivee: string
    duree_minutes: number
    date_validite: string
  } | null>(null)

  const handleViewChange = (view: View) => {
    setCurrentView(view)
    // Reset les étapes de réservation seulement si on quitte la vue booking
    if (view !== 'booking') {
      setCurrentStep('city')
      setSelectedCity(null)
      setSelectedLine(null)
      setJourneyDetails(null)
      setSelectedSchedule(null)
    }
  }

  const handleCitySelect = (city: string) => {
    setSelectedCity(city)
    setCurrentStep('lines')
  }

  // ✅ Reçoit la ligne complète depuis LineDisplay
  const handleLineSelect = (line: Line) => {
    setSelectedLine(line)
    setCurrentStep('journey')
  }

  const handleJourneySubmit = (details: any) => {
    setJourneyDetails(details)
    setCurrentStep('schedules')
  }

  const handleScheduleSelect = (schedule: any) => {
    setSelectedSchedule(schedule)
    setCurrentStep('booking')
  }

  const handleBookingComplete = () => {
    console.log('Booking completed, redirect to PDF')
    // Ici vous pouvez rediriger vers un PDF ou une confirmation
  }

  const handleReset = () => {
    setCurrentStep('city')
    setSelectedCity(null)
    setSelectedLine(null)
    setJourneyDetails(null)
    setSelectedSchedule(null)
  }

  const handleBackFromBooking = () => {
    setCurrentStep('schedules')
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar currentView={currentView} onViewChange={handleViewChange} />
      <main className="flex-1">
        
        {/* Vue réservation de billets */}
        {currentView === 'booking' && (
          <>
            {currentStep === 'city' && (
              <CitySelection onCitySelect={handleCitySelect} />
            )}
            
            {currentStep === 'lines' && selectedCity && (
              <LineDisplay 
                city={selectedCity} 
                onLineSelect={handleLineSelect} // ✅ Passe la fonction qui stocke la ligne
                onBack={() => setCurrentStep('city')} 
              />
            )}
            
            {currentStep === 'journey' && selectedLine && selectedCity && (
              <JourneyConfiguration
                city={selectedCity}
                line={selectedLine} // ✅ Passe la ligne complète
                onSubmit={handleJourneySubmit}
                onBack={() => setCurrentStep('lines')}
              />
            )}
            
            {currentStep === 'schedules' && journeyDetails && selectedLine && selectedCity && (
              <ScheduleResults
                city={selectedCity}
                line={selectedLine} // ✅ Passe aussi la ligne si besoin dans ScheduleResults
                journeyDetails={journeyDetails}
                onNewSearch={handleReset}
                onScheduleSelect={handleScheduleSelect}
              />
            )}
            
            {currentStep === 'booking' && journeyDetails && selectedSchedule && selectedLine && (
              <TicketBooking
                journeyDetails={journeyDetails}
                selectedSchedule={selectedSchedule}
                selectedLine={selectedLine} // ✅ FINALEMENT : Passe la ligne à TicketBooking
                onBack={handleBackFromBooking}
                onBookingComplete={handleBookingComplete}
              />
            )}
          </>
        )}

        {/* Vue Mes tickets */}
        {currentView === 'tickets' && (
          <ListeTickets />
        )}

        {/* Autres vues */}
         {currentView === 'geolocation' && (
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-7xl h-[80vh] rounded-lg overflow-hidden shadow-lg">
              <BusTracker />
            </div>
          </div>
        )}

       
      </main>
    </div>
  )
}