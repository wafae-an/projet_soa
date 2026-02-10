"use client"

import { User } from "lucide-react"
import { MainNavigation } from "./main-navigation"
import { BusAssignmentView } from "./bus-assignment-view"
import { WeeklyScheduleView } from "./weekly-schedule-view"

interface DashboardLayoutProps {
  activeTab: "buses" | "schedule"
  onTabChange: (tab: "buses" | "schedule") => void
}

export function DashboardLayout({ activeTab, onTabChange }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        {/* Logo/Title */}
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-2xl font-bold text-sidebar-primary">CityTransit</h1>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto">
          <MainNavigation activeTab={activeTab} onTabChange={onTabChange} />
        </div>

        {/* User Profile */}
        <div className="p-6 border-t border-sidebar-border flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sidebar-foreground/10 flex items-center justify-center">
            <User className="w-5 h-5 text-sidebar-foreground" />
          </div>
        </div>
      </aside>

      {/* Main Content Container */}
      <div className="flex-1 overflow-y-auto">
        {/* Cette div ajoute un conteneur centré */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          {activeTab === "buses" ? <BusAssignmentView /> : <WeeklyScheduleView />}
        </div>
      </div>
    </div>
  )
}