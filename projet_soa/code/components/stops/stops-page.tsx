'use client'

import { useState } from 'react'
import StopsTable from './stops-table'
import StopFormModal from './stop-form-modal'
import { Stop } from '@/types/transport'
import { mockStops } from '@/data/mock-data'

interface StopsPageProps {
  city: string
}

export default function StopsPage({ city }: StopsPageProps) {
  const [stops, setStops] = useState<Stop[]>(mockStops)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingStop, setEditingStop] = useState<Stop | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')

  const filteredStops = stops.filter(stop => {
    const matchesSearch = stop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stop.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || stop.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleAddStop = () => {
    setEditingStop(null)
    setIsFormOpen(true)
  }

  const handleEditStop = (stop: Stop) => {
    setEditingStop(stop)
    setIsFormOpen(true)
  }

  const handleSaveStop = (stopData: Omit<Stop, 'id'>) => {
    if (editingStop) {
      setStops(stops.map(s => s.id === editingStop.id ? { ...stopData, id: editingStop.id } : s))
    } else {
      const newStop: Stop = {
        ...stopData,
        id: `S${String(Math.max(...stops.map(s => parseInt(s.id.slice(1)) || 0), 0) + 1).padStart(3, '0')}`,
      }
      setStops([...stops, newStop])
    }
    setIsFormOpen(false)
  }

  const handleDeleteStop = (id: string) => {
    setStops(stops.filter(s => s.id !== id))
  }

  const handleToggleStop = (id: string) => {
    setStops(stops.map(s =>
      s.id === id ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' } : s
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900">
          Arrêts de Transport
        </h3>
        <button
          onClick={handleAddStop}
          className="bg-[#1e40af] hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          + Ajouter un Arrêt
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rechercher
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Nom ou code d'arrêt..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Statut
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
        </div>
      </div>

      <StopsTable
        stops={filteredStops}
        onEdit={handleEditStop}
        onDelete={handleDeleteStop}
        onToggle={handleToggleStop}
      />

  {isFormOpen && (
  <StopFormModal
    city={city}  // ← AJOUTEZ CETTE LIGNE !
    stop={editingStop}
    onSave={handleSaveStop}
    onCancel={() => setIsFormOpen(false)}
  />
)}
    </div>
  )
}
