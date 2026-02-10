'use client'

import { useState, useEffect } from 'react'
import { getVilles } from '@/actions/villeActions'
import { useCity } from '@/context/CityContext'

interface HeaderProps {
  currentPage: string
}

export default function Header({ currentPage }: HeaderProps) {
  const { selectedCity, setSelectedCity } = useCity()
  const [cities, setCities] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true)
        const response = await getVilles()
        
        if (response.success && response.data.length > 0) {
          setCities(response.data)
          if (!selectedCity) {
            setSelectedCity(response.data[0])
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement des villes:', error)
        setCities([])
      } finally {
        setLoading(false)
      }
    }

    fetchCities()
  }, [selectedCity, setSelectedCity])

  const getPageTitle = () => {
    switch (currentPage) {
      case 'lines': return 'Gestion des Lignes'
      case 'stops': return 'Gestion des Arrêts'
      case 'users': return 'Gestion des Utilisateurs'
      case 'drivers': return 'Affectation des Bus'
      default: return 'Dashboard'
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800">{getPageTitle()}</h2>
      
      {/* On n'affiche la ville que si on n'est PAS dans la page Users */}
      {currentPage !== 'users' && currentPage !== 'drivers' && (
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Ville:</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </label>
        </div>
      )}
    </header>
  )
}
