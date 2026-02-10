"use client"

import { ChevronDown } from "lucide-react"
import { StatusBadge } from "./status-badge"

interface Bus {
  id: string
  plaque: string
  capacity: number
  status: "active" | "maintenance" | "inactive"
  driver: string
}

interface BusLine {
  id: string
  name: string
  buses: Bus[]
}

interface LineCardProps {
  line: BusLine
  isExpanded: boolean
  onToggle: () => void
}

export function LineCard({ line, isExpanded, onToggle }: LineCardProps) {
  const activeBuses = line.buses.filter((b) => b.status === "active").length

  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between bg-card hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <h3 className="text-base font-semibold text-foreground">{line.name}</h3>
          <span className="text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded">
            {activeBuses} / {line.buses.length}
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="border-t border-border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-border">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Plaque
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Capacité
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Conducteur
                  </th>
                </tr>
              </thead>
              <tbody>
                {line.buses.map((bus, idx) => (
                  <tr
                    key={bus.id}
                    className={`border-b border-border last:border-b-0 hover:bg-gray-50 transition-colors ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-3 text-sm font-semibold text-foreground">{bus.plaque}</td>
                    <td className="px-6 py-3 text-sm text-foreground">{bus.capacity} places</td>
                    <td className="px-6 py-3">
                      <StatusBadge status={bus.status} />
                    </td>
                    <td className="px-6 py-3 text-sm text-foreground">{bus.driver}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
