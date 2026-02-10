'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard-layout'
import LinesPage from '@/components/lines/lines-page'
import StopsPage from '@/components/stops/stops-page'
import {UserManagementDashboard} from '@/components/user-management-dashboard'
import BusAssignmentWizard from "@/components/bus-assignment/wizard"

type PageType = 'dashboard' | 'lines' | 'stops' | 'users' | 'drivers'

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageType>('lines')
  const [selectedCity, setSelectedCity] = useState('Agadir')

  const cities = ['Agadir', 'Marrakech', 'Casablanca', 'Rabat', 'Fez']

  const renderPage = () => {
    switch (currentPage) {
      case 'lines':
        return <LinesPage city={selectedCity} />
      case 'stops':
        return <StopsPage city={selectedCity} />
      case 'users':
        return <UserManagementDashboard />
      case 'drivers':
        return <BusAssignmentWizard/>
      default:
        return <LinesPage city={selectedCity} />
    }
  }

  return (
    <DashboardLayout
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      selectedCity={selectedCity}
      onCityChange={setSelectedCity}
      cities={cities}
    >
      {renderPage()}
    </DashboardLayout>
  )
}
