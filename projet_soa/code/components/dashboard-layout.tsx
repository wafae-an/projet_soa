'use client'

import Sidebar from './sidebar_1'
import Header from './header-1'

interface DashboardLayoutProps {
  currentPage: string
  onNavigate: (page: string) => void
  selectedCity: string
  onCityChange: (city: string) => void
  cities: string[]
  children: React.ReactNode
}

export default function DashboardLayout({
  currentPage,
  onNavigate,
  selectedCity,
  onCityChange,
  cities,
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
      <div className="flex-1 flex flex-col">
        <Header
          selectedCity={selectedCity}
          onCityChange={onCityChange}
          cities={cities}
          currentPage={currentPage}
        />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
