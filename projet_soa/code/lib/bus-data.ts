// Mock data for bus tracking system
export interface City {
  name: string
  coords: [number, number] // [lat, lng]
  zoom: number
}

export interface BusLine {
  id: string
  number: string
  directions: string[]
}

export interface Bus {
  id: string
  lineNumber: string
  lat: number
  lng: number
  speed: number
  status: "moving" | "stopped" | "maintenance"
  direction: string
  nextStop?: string
}

export const CITIES: Record<string, City> = {
  rabat: {
    name: "Rabat",
    coords: [34.0209, -6.8416],
    zoom: 13,
  },
  casablanca: {
    name: "Casablanca",
    coords: [33.5731, -7.5898],
    zoom: 12,
  },
  tanger: {
    name: "Tanger",
    coords: [35.7595, -5.8336],
    zoom: 12,
  },
}

export const BUS_LINES: Record<string, BusLine[]> = {
  rabat: [
    { id: "L1", number: "L1", directions: ["Rabat Centre → Agdal", "Agdal → Rabat Centre"] },
    { id: "L30", number: "L30", directions: ["Rabat → Temara", "Temara → Rabat"] },
    { id: "L5", number: "L5", directions: ["Rabat Ville → Hay Riad", "Hay Riad → Rabat Ville"] },
  ],
  casablanca: [
    { id: "L2", number: "L2", directions: ["Casablanca Centre → Ain Chock", "Ain Chock → Casablanca Centre"] },
    { id: "L10", number: "L10", directions: ["Ain Sebaae → Fes", "Fes → Ain Sebaae"] },
    { id: "L15", number: "L15", directions: ["Ben M'Sick → Sidi Othman", "Sidi Othman → Ben M'Sick"] },
  ],
  tanger: [
    { id: "L3", number: "L3", directions: ["Tanger Centre → Marchan", "Marchan → Tanger Centre"] },
    { id: "L7", number: "L7", directions: ["Tanger → Fnideq", "Fnideq → Tanger"] },
    { id: "L12", number: "L12", directions: ["Tanger Port → Boukhalef", "Boukhalef → Tanger Port"] },
  ],
}

// Generate initial bus positions
export function generateBuses(lineNumber: string, cityKey: string, count = 6): Bus[] {
  const city = CITIES[cityKey]
  const buses: Bus[] = []

  for (let i = 0; i < count; i++) {
    const offsetLat = (Math.random() - 0.5) * 0.1
    const offsetLng = (Math.random() - 0.5) * 0.1

    buses.push({
      id: `bus-${lineNumber}-${i}`,
      lineNumber,
      lat: city.coords[0] + offsetLat,
      lng: city.coords[1] + offsetLng,
      speed: Math.floor(Math.random() * 40) + 10,
      status: Math.random() > 0.8 ? "stopped" : "moving",
      direction: [
        "Rabat → Temara",
        "Casablanca Centre → Ain Chock",
        "Tanger Centre → Marchan",
        "Temara → Rabat",
        "Ain Chock → Casablanca Centre",
        "Marchan → Tanger Centre",
      ][Math.floor(Math.random() * 6)],
      nextStop: `Arrêt ${Math.floor(Math.random() * 10) + 1}`,
    })
  }

  return buses
}

// Simulate bus movement
export function updateBusPosition(bus: Bus): Bus {
  const speedVariation = (Math.random() - 0.5) * 10
  const newSpeed = Math.max(5, Math.min(50, bus.speed + speedVariation))

  // Generate realistic movement
  const heading = Math.random() * Math.PI * 2
  const distance = (newSpeed / 3600) * 0.001 // Convert speed (km/h) to degrees

  return {
    ...bus,
    lat: bus.lat + distance * Math.cos(heading),
    lng: bus.lng + distance * Math.sin(heading),
    speed: Math.round(newSpeed),
    status: Math.random() > 0.95 ? (bus.status === "stopped" ? "moving" : "stopped") : bus.status,
  }
}
