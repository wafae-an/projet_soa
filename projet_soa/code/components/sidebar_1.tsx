'use client'

import { Bus, MapPin, User, Route } from 'lucide-react'

interface SidebarProps {
  currentPage: string
  onNavigate: (page: string) => void
}

import { logout } from "@/actions/logout"
export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'lines', label: 'Lignes', icon: Route },
    { id: 'stops', label: 'Arrêts', icon: MapPin },
    { id: 'users', label: 'Users', icon: User },
    { id: 'drivers', label: 'Affectation Bus', icon: Bus },
  ]

  return (
    <aside className="w-64 bg-[#f8f9fa] text-gray-800 border-r border-[#e5e7eb] p-6 flex flex-col">
      {/* Logo / Header */}
      <div className="mb-8 px-2">
        <h1 className="text-xl font-bold text-[#1e40af]">CityTransit Admin</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id

          return (
            <div
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#1e40af] text-white'
                  : 'text-[#374151] hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </div>
          )
        })}
      </nav>


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