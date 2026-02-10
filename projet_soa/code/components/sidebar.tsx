interface SidebarProps {
  currentView: string
  onViewChange: (view: 'booking' | 'tickets' | 'geolocation' | 'subscription' | 'profile') => void
}

import { logout } from "@/actions/logout"

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] bg-[#f8f9fa] border-r border-[#e5e7eb] shadow-sm flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-center border-b border-[#e5e7eb] px-6 py-8">
        <div className="flex items-center gap-3">
          <svg 
            className="w-8 h-8 text-[#1e40af]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <h1 className="text-xl font-bold text-[#1e40af]">CityTransit</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-8 space-y-1 px-4 flex-1">
        {/* Trajets & Achat billets */}
        <div 
          className={`flex items-center gap-3 rounded-md px-4 py-3 font-medium transition-colors cursor-pointer ${
            currentView === 'booking' 
              ? 'bg-[#1e40af] text-white' 
              : 'text-[#374151] hover:bg-gray-100'
          }`}
          onClick={() => onViewChange('booking')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span>Trajets & Achat billets</span>
        </div>

        {/* Mes tickets */}
        <div 
          className={`flex items-center gap-3 rounded-md px-4 py-3 font-medium transition-colors cursor-pointer ${
            currentView === 'tickets' 
              ? 'bg-[#1e40af] text-white' 
              : 'text-[#374151] hover:bg-gray-100'
          }`}
          onClick={() => onViewChange('tickets')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
          </svg>
          <span>Mes tickets</span>
        </div>

        {/* Géolocalisation */}
        <div 
          className={`flex items-center gap-3 rounded-md px-4 py-3 font-medium transition-colors cursor-pointer ${
            currentView === 'geolocation' 
              ? 'bg-[#1e40af] text-white' 
              : 'text-[#374151] hover:bg-gray-100'
          }`}
          onClick={() => onViewChange('geolocation')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span>Géolocalisation</span>
        </div>

        {/* Abonnements */}
        <div 
          className={`flex items-center gap-3 rounded-md px-4 py-3 font-medium transition-colors cursor-pointer ${
            currentView === 'subscription' 
              ? 'bg-[#1e40af] text-white' 
              : 'text-[#374151] hover:bg-gray-100'
          }`}
          onClick={() => onViewChange('subscription')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
          </svg>
          <span>Abonnements</span>
        </div>

        {/* Profil */}
        <div 
          className={`flex items-center gap-3 rounded-md px-4 py-3 font-medium transition-colors cursor-pointer ${
            currentView === 'profile' 
              ? 'bg-[#1e40af] text-white' 
              : 'text-[#374151] hover:bg-gray-100'
          }`}
          onClick={() => onViewChange('profile')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
          <span>Mon Profil</span>
        </div>
      </nav>

      {/* 🔥 Logout toujours en bas */}
      <div 
        className="px-4 py-4 border-t border-[#e5e7eb] cursor-pointer flex items-center gap-3 hover:bg-gray-100 text-[#1e40af] mt-auto"
        onClick={() => logout()}
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
          />
        </svg>
        <span>Se déconnecter</span>
      </div>
    </aside>
  )
}
