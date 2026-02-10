'use client'

import { useState } from 'react'
import LinesGrid from './lines-grid'
import LineFormModal from './line-form-modal'
import { Line } from '@/types/transport'
import { useCity } from '@/context/CityContext'

export default function LinesPage() {
  const { selectedCity } = useCity()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingLine, setEditingLine] = useState<Line | null>(null)
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null)

  // Afficher une notification
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000) // Disparaît après 3 secondes
  }

  const handleAddLine = () => {
    if (!selectedCity) {
      alert('Veuillez sélectionner une ville d\'abord')
      return
    }
    setEditingLine(null)
    setIsFormOpen(true)
  }

  const handleEditLine = (line: Line) => {
    setEditingLine(line)
    setIsFormOpen(true)
  }

  const handleSaveLine = async (lineData: any) => {
    try {
      // Ici vous appelez votre API pour sauvegarder la ligne
      console.log('Sauvegarde de la ligne:', lineData)
      
      // Simuler un appel API réussi
      // En production, vous utiliserez votre vrai appel API :
      // const response = await fetch('/api/lignes', { ... })
      
      // Fermer la modale
      setIsFormOpen(false)
      
      // Afficher la notification de succès
      showNotification('success', editingLine ? 'Ligne modifiée avec succès!' : 'Ligne créée avec succès!')
      
      // Optionnel: rafraîchir les données des lignes
      // Vous pourriez avoir une fonction pour recharger les lignes ici
      
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
      showNotification('error', 'Erreur lors de la sauvegarde de la ligne')
    }
  }

  const handleCloseModal = () => {
    setIsFormOpen(false)
    setEditingLine(null)
  }

  const handleDeleteLine = (id: string) => {
    // Ici vous devrez appeler votre API pour supprimer la ligne
    console.log('Suppression de la ligne:', id)
    showNotification('success', 'Ligne supprimée avec succès!')
  }

  const handleToggleLine = (id: string) => {
    // Ici vous devrez appeler votre API pour basculer le statut
    console.log('Basculer statut de la ligne:', id)
  }

  return (
    <div className="space-y-6">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900">
          Lignes de Transport - {selectedCity || 'Sélectionnez une ville'}
        </h3>
        <button
          onClick={handleAddLine}
          disabled={!selectedCity}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            selectedCity
              ? 'bg-[#1e40af] hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          + Ajouter une Ligne
        </button>
      </div>

      <LinesGrid
        onEdit={handleEditLine}
        onDelete={handleDeleteLine}
        onToggle={handleToggleLine}
      />

      {isFormOpen && selectedCity && (
        <LineFormModal
          city={selectedCity}
          line={editingLine}
          onSave={handleSaveLine}
          onCancel={handleCloseModal} // Changé de onClose à onCancel
        />
      )}
    </div>
  )
}