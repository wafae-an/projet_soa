'use client'

import { useState } from 'react'

interface JourneyConfigurationProps {
  city: string
  line: {
    id: string
    number: string
    nom: string
    arrets: string[]
  }
  onSubmit: (details: any) => void
  onBack: () => void
}

export default function JourneyConfiguration({
  city,
  line,
  onSubmit,
  onBack
}: JourneyConfigurationProps) {
  const [departure, setDeparture] = useState('')
  const [arrival, setArrival] = useState('')
  const [date, setDate] = useState('')

  const allStops = line.arrets || []
  const availableArrivals = departure 
    ? allStops.filter(stop => stop !== departure)
    : []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (departure && arrival && date) {
      onSubmit({ 
        ligne_id: line.id,
        depart: departure,
        arrivee: arrival,
        date_recherche: date,
        departureName: departure,
        arrivalName: arrival,
        lineNumber: line.number,
        lineName: line.nom
      })
    }
  }

  const isFormValid = departure && arrival && date

  return (
    <div className="ml-[280px] min-h-screen bg-white p-8">
      <div className="max-w-2xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-[#374151]">
          <span>{city}</span>
          <span className="mx-2">›</span>
          <span>Ligne {line.number}</span>
          <span className="mx-2">›</span>
          <span className="text-[#1e40af] font-medium">Détails du trajet</span>
        </div>

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#1e40af] mb-2">
              Configuration du trajet
            </h2>
            <p className="text-[#374151]">
              {line.nom}
            </p>
          </div>
          <button
            onClick={onBack}
            className="px-6 py-2 text-[#1e40af] font-medium hover:bg-gray-100 rounded-lg transition-colors"
          >
            Retour
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-[#e5e7eb] rounded-lg p-6">
          {/* Gare de départ */}
          <div>
            <label className="block text-[#374151] font-medium mb-2">
              Gare de départ
            </label>
            <select
              value={departure}
              onChange={(e) => {
                setDeparture(e.target.value)
                setArrival('')
              }}
              className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent"
              required
            >
              <option value="">Sélectionnez une gare</option>
              {allStops.map((stop, index) => (
                <option key={index} value={stop}>
                  {stop} 
                  {index === 0 && " (Départ)"} 
                  {index === allStops.length - 1 && " (Terminus)"}
                </option>
              ))}
            </select>
            {departure && (
              <p className="text-sm text-green-600 mt-1">
                Départ sélectionné : {departure}
              </p>
            )}
          </div>

          {/* Gare d'arrivée */}
          <div>
            <label className="block text-[#374151] font-medium mb-2">
              Gare d'arrivée
            </label>
            <select
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              disabled={!departure}
              className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              required
            >
              <option value="">Sélectionnez une gare</option>
              {availableArrivals.map((stop, index) => (
                <option key={index} value={stop}>
                  {stop} 
                  {allStops.indexOf(stop) === allStops.length - 1 && " (Terminus)"}
                </option>
              ))}
            </select>
            {!departure && (
              <p className="text-sm text-gray-500 mt-1">
                Veuillez d'abord sélectionner une gare de départ
              </p>
            )}
            {departure && arrival && (
              <p className="text-sm text-blue-600 mt-1">
                Trajet : {departure} → {arrival}
              </p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-[#374151] font-medium mb-2">
              Date du voyage
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent"
              required
            />
          </div>

          {/* Résumé du trajet */}
          {departure && arrival && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Résumé de votre trajet :</h3>
              <div className="text-sm text-blue-700">
                <p><strong>Ligne {line.number}</strong> - {line.nom}</p>
                <p><strong>Départ :</strong> {departure}</p>
                <p><strong>Arrivée :</strong> {arrival}</p>
                <p><strong>Date :</strong> {new Date(date).toLocaleDateString('fr-FR')}</p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full bg-[#1e40af] text-white py-3 rounded-lg font-bold hover:bg-[#1e3a8a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isFormValid ? 'Rechercher les horaires' : 'Sélectionnez départ, arrivée et date'}
          </button>
        </form>

        {/* Information sur la ligne */}
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-2">Informations sur la ligne :</h3>
          <div className="text-sm text-gray-600">
            <p><strong>Nombre d'arrêts :</strong> {allStops.length}</p>
            <p><strong>Arrêts disponibles :</strong> {allStops.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}