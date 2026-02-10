"use client"

import { LayoutList, Calendar } from "lucide-react"

interface MainNavigationProps {
  activeTab: "buses" | "schedule"
  onTabChange: (tab: "buses" | "schedule") => void
}

export function MainNavigation({ activeTab, onTabChange }: MainNavigationProps) {
  const navigationItems = [
    { id: "buses", label: "Bus Assignés", icon: LayoutList },
    { id: "schedule", label: "Planning Semaine", icon: Calendar },
  ]

  return (
    <nav className="p-4 space-y-2">
      {navigationItems.map((item) => {
        const Icon = item.icon
        const isActive = activeTab === item.id
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id as "buses" | "schedule")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              isActive
                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            }`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
