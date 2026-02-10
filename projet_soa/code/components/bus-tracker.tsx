"use client"

import { useState, useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { CITIES, BUS_LINES, generateBuses, updateBusPosition, type Bus } from "@/lib/bus-data"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function BusTracker() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<L.Map | null>(null)
  const markersRef = useRef<Map<string, L.Marker>>(new Map())

  const [selectedCity, setSelectedCity] = useState("rabat")
  const [selectedLine, setSelectedLine] = useState("L1")
  const [selectedDirection, setSelectedDirection] = useState("")
  const [buses, setBuses] = useState<Bus[]>([])
  const [filteredBuses, setFilteredBuses] = useState<Bus[]>([])
  const [stats, setStats] = useState({ active: 0, stopped: 0, total: 0 })

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return

    const city = CITIES[selectedCity]
    map.current = L.map(mapContainer.current).setView(city.coords, city.zoom)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map.current)

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  // Update map center when city changes
  useEffect(() => {
    if (map.current) {
      const city = CITIES[selectedCity]
      map.current.setView(city.coords, city.zoom)
    }

    // Reset selections
    const lines = BUS_LINES[selectedCity]
    setSelectedLine(lines[0].id)
    setSelectedDirection(lines[0].directions[0])

    // Generate new buses
    const newBuses = generateBuses(lines[0].number, selectedCity, 8)
    setBuses(newBuses)
  }, [selectedCity])

  // Update selected direction when line changes
  useEffect(() => {
    const lines = BUS_LINES[selectedCity]
    const line = lines.find((l) => l.id === selectedLine)
    if (line && line.directions.length > 0) {
      setSelectedDirection(line.directions[0])
    }
  }, [selectedLine, selectedCity])

  // Filter buses by direction
  useEffect(() => {
    const filtered = buses.filter(
      (bus) => bus.lineNumber === selectedLine && (!selectedDirection || bus.direction === selectedDirection),
    )
    setFilteredBuses(filtered)

    // Calculate stats
    const active = filtered.filter((b) => b.status === "moving").length
    const stopped = filtered.filter((b) => b.status === "stopped").length
    setStats({ active, stopped, total: filtered.length })
  }, [buses, selectedLine, selectedDirection])

  // Simulate real-time bus updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((prevBuses) => prevBuses.map((bus) => updateBusPosition(bus)))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Update markers on map
  useEffect(() => {
    if (!map.current) return

    // Remove old markers
    markersRef.current.forEach((marker) => map.current?.removeLayer(marker))
    markersRef.current.clear()

    // Add new markers for filtered buses
    filteredBuses.forEach((bus) => {
      const statusColor = bus.status === "moving" ? "#ef4444" : "#8b5cf6"
      const icon = L.divIcon({
        html: `
          <div style="
            background-color: ${statusColor};
            border: 2px solid white;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          ">
            ${bus.lineNumber}
          </div>
        `,
        className: "bus-marker",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      })

      const marker = L.marker([bus.lat, bus.lng], { icon })
        .bindPopup(`
          <div class="p-2">
            <p class="font-bold">Ligne ${bus.lineNumber}</p>
            <p class="text-sm">Vitesse: ${bus.speed} km/h</p>
            <p class="text-sm">Statut: ${bus.status === "moving" ? "En mouvement" : "Arrêté"}</p>
            <p class="text-sm">Prochain: ${bus.nextStop}</p>
          </div>
        `)
        .addTo(map.current!)

      markersRef.current.set(bus.id, marker)
    })
  }, [filteredBuses, map])

  const currentCity = CITIES[selectedCity]
  const cityLines = BUS_LINES[selectedCity]
  const currentLine = cityLines.find((l) => l.id === selectedLine)
  const directions = currentLine?.directions || []

  return (
    <div className="w-full h-screen flex bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r border-border overflow-y-auto">
        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Bus Tracker</h1>
            <p className="text-sm text-muted-foreground">Suivi en temps réel</p>
          </div>

          {/* City Selection */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Ville</label>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rabat">Rabat</SelectItem>
                <SelectItem value="casablanca">Casablanca</SelectItem>
                <SelectItem value="tanger">Tanger</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Line Selection */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Ligne</label>
            <Select value={selectedLine} onValueChange={setSelectedLine}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cityLines.map((line) => (
                  <SelectItem key={line.id} value={line.id}>
                    {line.number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Direction Selection */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Direction</label>
            <Select value={selectedDirection} onValueChange={setSelectedDirection}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {directions.map((dir) => (
                  <SelectItem key={dir} value={dir}>
                    {dir}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Statistics */}
          <Card className="p-4 bg-card">
            <h3 className="text-sm font-semibold text-foreground mb-3">Statistiques</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Actifs:</span>
                <Badge variant="outline" className="bg-red-500/10 text-red-600">
                  {stats.active}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Arrêtés:</span>
                <Badge variant="outline" className="bg-purple-500/10 text-purple-600">
                  {stats.stopped}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total:</span>
                <Badge variant="outline">{stats.total}</Badge>
              </div>
            </div>
          </Card>

          {/* Bus List */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Bus Actifs</h3>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {filteredBuses.length > 0 ? (
                filteredBuses.map((bus) => (
                  <Card key={bus.id} className="p-3 bg-card hover:bg-muted/50 transition">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-primary text-primary-foreground">{bus.lineNumber}</Badge>
                      <Badge
                        variant="outline"
                        className={
                          bus.status === "moving" ? "bg-red-500/10 text-red-600" : "bg-purple-500/10 text-purple-600"
                        }
                      >
                        {bus.status === "moving" ? "En mouvement" : "Arrêté"}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Vitesse: {bus.speed} km/h</p>
                      <p>Prochain: {bus.nextStop}</p>
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-xs text-muted-foreground">Aucun bus disponible</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <div ref={mapContainer} className="w-full h-full" style={{ zIndex: 1 }} />

        {/* Map Legend */}
        <div className="absolute bottom-6 left-6 bg-card border border-border rounded-lg p-4 shadow-lg z-10">
          <h4 className="text-sm font-semibold text-foreground mb-3">Légende</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-white"></div>
              <span className="text-muted-foreground">Bus en mouvement</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-white"></div>
              <span className="text-muted-foreground">Bus arrêté</span>
            </div>
          </div>
        </div>

        {/* Live Indicator */}
        <div className="absolute top-6 right-6 flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2 shadow-lg z-10">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          <span className="text-sm font-medium text-foreground">En direct</span>
        </div>
      </div>
    </div>
  )
}
