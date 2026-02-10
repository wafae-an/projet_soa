"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { LineCard } from "./line_card"

interface Bus {
  id: string
  plaque: string
  capacity: number
  status: "active" | "maintenance" | "inactive"
  driver: string
  city: string
  line: string
  lineId: string
}

interface BusLine {
  id: string
  name: string
  buses: Bus[]
}

// Mock data: All buses with their assigned drivers and cities
const ALL_BUSES_DATA = [
  // Casablanca - Ahmed Moussaoui
  {
    id: "b1",
    plaque: "CB-1001",
    capacity: 45,
    status: "active" as const,
    driver: "Ahmed Moussaoui",
    city: "CASABLANCA",
    line: "Ligne 1 - Centro",
    lineId: "l1",
  },
  {
    id: "b3",
    plaque: "CB-1003",
    capacity: 45,
    status: "active" as const,
    driver: "Ahmed Moussaoui",
    city: "CASABLANCA",
    line: "Ligne 2 - Anfa",
    lineId: "l2",
  },

  // Casablanca - Mohamed Larbi
  {
    id: "b2",
    plaque: "CB-1002",
    capacity: 45,
    status: "active" as const,
    driver: "Mohamed Larbi",
    city: "CASABLANCA",
    line: "Ligne 1 - Centro",
    lineId: "l1",
  },
  {
    id: "b5",
    plaque: "CB-2001",
    capacity: 50,
    status: "active" as const,
    driver: "Mohamed Larbi",
    city: "CASABLANCA",
    line: "Ligne 2 - Anfa",
    lineId: "l2",
  },

  // Casablanca - Hassan Bennani
  {
    id: "b4",
    plaque: "CB-1004",
    capacity: 45,
    status: "active" as const,
    driver: "Hassan Bennani",
    city: "CASABLANCA",
    line: "Ligne 1 - Centro",
    lineId: "l1",
  },

  // Casablanca - Karim Bouazza
  {
    id: "b6",
    plaque: "CB-2002",
    capacity: 50,
    status: "active" as const,
    driver: "Karim Bouazza",
    city: "CASABLANCA",
    line: "Ligne 2 - Anfa",
    lineId: "l2",
  },
  {
    id: "b8",
    plaque: "CB-3001",
    capacity: 50,
    status: "active" as const,
    driver: "Karim Bouazza",
    city: "CASABLANCA",
    line: "Ligne 3 - Maarif",
    lineId: "l3",
  },

  // Casablanca - Fatima Khadija
  {
    id: "b9",
    plaque: "CB-3002",
    capacity: 50,
    status: "active" as const,
    driver: "Fatima Khadija",
    city: "CASABLANCA",
    line: "Ligne 3 - Maarif",
    lineId: "l3",
  },

  // Casablanca - Jamal Mahjoub
  {
    id: "b10",
    plaque: "CB-4001",
    capacity: 55,
    status: "active" as const,
    driver: "Jamal Mahjoub",
    city: "CASABLANCA",
    line: "Ligne 4 - Ain Chock",
    lineId: "l4",
  },
  {
    id: "b12",
    plaque: "CB-4003",
    capacity: 55,
    status: "active" as const,
    driver: "Jamal Mahjoub",
    city: "CASABLANCA",
    line: "Ligne 4 - Ain Chock",
    lineId: "l4",
  },

  // Rabat - Amine Hajji
  {
    id: "b13",
    plaque: "RB-5001",
    capacity: 45,
    status: "active" as const,
    driver: "Amine Hajji",
    city: "RABAT",
    line: "Ligne 5 - Centre",
    lineId: "l5",
  },
  {
    id: "b16",
    plaque: "RB-6001",
    capacity: 50,
    status: "active" as const,
    driver: "Amine Hajji",
    city: "RABAT",
    line: "Ligne 6 - Souissi",
    lineId: "l6",
  },

  // Rabat - Omar Zikri
  {
    id: "b14",
    plaque: "RB-5002",
    capacity: 45,
    status: "active" as const,
    driver: "Omar Zikri",
    city: "RABAT",
    line: "Ligne 5 - Centre",
    lineId: "l5",
  },

  // Rabat - Rashid Akkar
  {
    id: "b15",
    plaque: "RB-5003",
    capacity: 45,
    status: "active" as const,
    driver: "Rashid Akkar",
    city: "RABAT",
    line: "Ligne 5 - Centre",
    lineId: "l5",
  },
  {
    id: "b18",
    plaque: "RB-7001",
    capacity: 48,
    status: "active" as const,
    driver: "Rashid Akkar",
    city: "RABAT",
    line: "Ligne 7 - Agdal",
    lineId: "l7",
  },

  // Rabat - Mohamed Hijri
  {
    id: "b19",
    plaque: "RB-7002",
    capacity: 48,
    status: "active" as const,
    driver: "Mohamed Hijri",
    city: "RABAT",
    line: "Ligne 7 - Agdal",
    lineId: "l7",
  },

  // Rabat - Aziz Qassim
  {
    id: "b20",
    plaque: "RB-7003",
    capacity: 48,
    status: "active" as const,
    driver: "Aziz Qassim",
    city: "RABAT",
    line: "Ligne 7 - Agdal",
    lineId: "l7",
  },

  // Fes - Rachid Frati
  {
    id: "b21",
    plaque: "FES-8001",
    capacity: 40,
    status: "active" as const,
    driver: "Rachid Frati",
    city: "FES",
    line: "Ligne 8 - Medina",
    lineId: "l8",
  },
  {
    id: "b24",
    plaque: "FES-9001",
    capacity: 50,
    status: "active" as const,
    driver: "Rachid Frati",
    city: "FES",
    line: "Ligne 9 - Nouvelle Ville",
    lineId: "l9",
  },

  // Fes - Tarik Nabil
  {
    id: "b22",
    plaque: "FES-8002",
    capacity: 40,
    status: "active" as const,
    driver: "Tarik Nabil",
    city: "FES",
    line: "Ligne 8 - Medina",
    lineId: "l8",
  },

  // Fes - Hassan Khader
  {
    id: "b23",
    plaque: "FES-8003",
    capacity: 40,
    status: "active" as const,
    driver: "Hassan Khader",
    city: "FES",
    line: "Ligne 8 - Medina",
    lineId: "l8",
  },

  // Fes - Bilal Mouhssen
  {
    id: "b25",
    plaque: "FES-9002",
    capacity: 50,
    status: "active" as const,
    driver: "Bilal Mouhssen",
    city: "FES",
    line: "Ligne 9 - Nouvelle Ville",
    lineId: "l9",
  },

  // Marrakech - Karim Safir
  {
    id: "b26",
    plaque: "MK-10001",
    capacity: 45,
    status: "active" as const,
    driver: "Karim Safir",
    city: "MARRAKECH",
    line: "Ligne 10 - Medina",
    lineId: "l10",
  },
  {
    id: "b29",
    plaque: "MK-11001",
    capacity: 50,
    status: "active" as const,
    driver: "Karim Safir",
    city: "MARRAKECH",
    line: "Ligne 11 - Gueliz",
    lineId: "l11",
  },

  // Marrakech - Said Amzil
  {
    id: "b27",
    plaque: "MK-10002",
    capacity: 45,
    status: "active" as const,
    driver: "Said Amzil",
    city: "MARRAKECH",
    line: "Ligne 10 - Medina",
    lineId: "l10",
  },

  // Marrakech - Faisal Bouhou
  {
    id: "b28",
    plaque: "MK-10003",
    capacity: 45,
    status: "active" as const,
    driver: "Faisal Bouhou",
    city: "MARRAKECH",
    line: "Ligne 10 - Medina",
    lineId: "l10",
  },

  // Agadir - Ahmed Elouad
  {
    id: "b31",
    plaque: "AG-12001",
    capacity: 45,
    status: "active" as const,
    driver: "Ahmed Elouad",
    city: "AGADIR",
    line: "Ligne 12 - Centre",
    lineId: "l12",
  },
  {
    id: "b33",
    plaque: "AG-13001",
    capacity: 50,
    status: "active" as const,
    driver: "Ahmed Elouad",
    city: "AGADIR",
    line: "Ligne 13 - Beach",
    lineId: "l13",
  },

  // Agadir - Mohamed Saidi
  {
    id: "b32",
    plaque: "AG-12002",
    capacity: 45,
    status: "active" as const,
    driver: "Mohamed Saidi",
    city: "AGADIR",
    line: "Ligne 12 - Centre",
    lineId: "l12",
  },

  // Agadir - Hamid Rifi
  {
    id: "b34",
    plaque: "AG-13002",
    capacity: 50,
    status: "active" as const,
    driver: "Hamid Rifi",
    city: "AGADIR",
    line: "Ligne 13 - Beach",
    lineId: "l13",
  },

  // Agadir - Jamal Tahiri
  {
    id: "b35",
    plaque: "AG-13003",
    capacity: 50,
    status: "active" as const,
    driver: "Jamal Tahiri",
    city: "AGADIR",
    line: "Ligne 13 - Beach",
    lineId: "l13",
  },

  // Tanger - Nabil Hassani
  {
    id: "b36",
    plaque: "TG-14001",
    capacity: 50,
    status: "active" as const,
    driver: "Nabil Hassani",
    city: "TANGER",
    line: "Ligne 14 - Ville Nouvelle",
    lineId: "l14",
  },
  {
    id: "b39",
    plaque: "TG-15001",
    capacity: 55,
    status: "active" as const,
    driver: "Nabil Hassani",
    city: "TANGER",
    line: "Ligne 15 - Port",
    lineId: "l15",
  },

  // Tanger - Jamal Moussa
  {
    id: "b37",
    plaque: "TG-14002",
    capacity: 50,
    status: "active" as const,
    driver: "Jamal Moussa",
    city: "TANGER",
    line: "Ligne 14 - Ville Nouvelle",
    lineId: "l14",
  },

  // Tanger - Karim Tahir
  {
    id: "b38",
    plaque: "TG-14003",
    capacity: 50,
    status: "active" as const,
    driver: "Karim Tahir",
    city: "TANGER",
    line: "Ligne 14 - Ville Nouvelle",
    lineId: "l14",
  },

  // Tanger - Rashid Zarif
  {
    id: "b40",
    plaque: "TG-15002",
    capacity: 55,
    status: "active" as const,
    driver: "Rashid Zarif",
    city: "TANGER",
    line: "Ligne 15 - Port",
    lineId: "l15",
  },
]

export function BusAssignmentView() {
  const { driver } = useAuth()
  const [expandedLines, setExpandedLines] = useState<Set<string>>(new Set())

  const toggleLine = (lineId: string) => {
    const newExpanded = new Set(expandedLines)
    newExpanded.has(lineId) ? newExpanded.delete(lineId) : newExpanded.add(lineId)
    setExpandedLines(newExpanded)
  }

  const driverBuses = ALL_BUSES_DATA.filter((b) => b.driver === driver.name)
  const driverCity = driver.city

  const busesByLine: Record<string, typeof ALL_BUSES_DATA> = {}
  driverBuses.forEach((bus) => {
    const key = bus.lineId
    if (!busesByLine[key]) {
      busesByLine[key] = []
    }
    busesByLine[key].push(bus)
  })

  const linesList = Object.entries(busesByLine).map(([lineId, buses]) => ({
    id: lineId,
    name: buses[0].line,
    buses: buses.map((b) => ({
      id: b.id,
      plaque: b.plaque,
      capacity: b.capacity,
      status: b.status,
      driver: b.driver,
    })),
  }))

  const stats = {
    total: driverBuses.length,
    active: driverBuses.filter((b) => b.status === "active").length,
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Bus Assignés</h1>
          <p className="text-muted-foreground mb-6">Vos bus assignés organisés par ligne</p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-600 font-medium">Bus Assignés</p>
              <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <p className="text-sm text-emerald-600 font-medium">En Service</p>
              <p className="text-2xl font-bold text-emerald-900">{stats.active}</p>
            </div>
          </div>

          {/* Driver Info */}
          <div className="bg-gray-50 border border-border rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground">Conducteur</p>
            <p className="text-lg font-semibold text-foreground">{driver.name}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Ville: <span className="font-medium text-foreground">{driverCity}</span>
            </p>
          </div>
        </div>

        {/* Lines */}
        <div className="space-y-3">
          {linesList.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">Aucun bus assigné</p>
          ) : (
            linesList.map((line) => (
              <LineCard
                key={line.id}
                line={line}
                isExpanded={expandedLines.has(line.id)}
                onToggle={() => toggleLine(line.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
