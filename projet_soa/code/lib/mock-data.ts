import type { City, BusLine, Driver, Bus } from "@/types"

export const CITIES: City[] = [
  { id: "city-1", name: "Paris", code: "PAR" },
  { id: "city-2", name: "Lyon", code: "LYN" },
  { id: "city-3", name: "Marseille", code: "MRS" },
  { id: "city-4", name: "Toulouse", code: "TLS" },
]

export const BUS_LINES: BusLine[] = [
  { id: "line-1", cityId: "city-1", lineNumber: "1", lineName: "Châtelet - Vincennes" },
  { id: "line-2", cityId: "city-1", lineNumber: "2", lineName: "Abbesses - Balard" },
  { id: "line-3", cityId: "city-1", lineNumber: "3", lineName: "Havre-Caumartin - Pont de Levallois" },
  { id: "line-4", cityId: "city-2", lineNumber: "1", lineName: "Centre - Confluence" },
  { id: "line-5", cityId: "city-2", lineNumber: "2", lineName: "Part-Dieu - Gerland" },
  { id: "line-6", cityId: "city-3", lineNumber: "1", lineName: "Vieux Port - Estaque" },
  { id: "line-7", cityId: "city-4", lineNumber: "1", lineName: "Centre - Cité de l'Espace" },
]

export const DRIVERS: Driver[] = [
  {
    id: "driver-1",
    cityId: "city-1",
    lineIds: ["line-1", "line-2"],
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@transit.fr",
    phone: "+33612345678",
    status: "active",
    totalBuses: 2,
  },
  {
    id: "driver-2",
    cityId: "city-1",
    lineIds: ["line-1", "line-3"],
    firstName: "Marie",
    lastName: "Martin",
    email: "marie.martin@transit.fr",
    phone: "+33623456789",
    status: "active",
    totalBuses: 1,
  },
  {
    id: "driver-3",
    cityId: "city-1",
    lineIds: ["line-2"],
    firstName: "Pierre",
    lastName: "Bernard",
    email: "pierre.bernard@transit.fr",
    phone: "+33634567890",
    status: "on_leave",
    totalBuses: 0,
  },
  {
    id: "driver-4",
    cityId: "city-2",
    lineIds: ["line-4", "line-5"],
    firstName: "Sophie",
    lastName: "Lefevre",
    email: "sophie.lefevre@transit.fr",
    phone: "+33645678901",
    status: "active",
    totalBuses: 2,
  },
]

export const BUSES: Bus[] = [
  // Paris line 1
  {
    id: "bus-1",
    cityId: "city-1",
    lineId: "line-1",
    busNumber: "P001",
    licensePlate: "AA-001-AA",
    status: "en_service",
    assignedDriverId: "driver-1",
    capacity: 45,
  },
  {
    id: "bus-2",
    cityId: "city-1",
    lineId: "line-1",
    busNumber: "P002",
    licensePlate: "AA-002-AA",
    status: "en_service",
    capacity: 45,
  },
  {
    id: "bus-3",
    cityId: "city-1",
    lineId: "line-1",
    busNumber: "P003",
    licensePlate: "AA-003-AA",
    status: "maintenance",
    capacity: 45,
  },

  // Paris line 2
  {
    id: "bus-4",
    cityId: "city-1",
    lineId: "line-2",
    busNumber: "P004",
    licensePlate: "AA-004-AA",
    status: "en_service",
    assignedDriverId: "driver-2",
    capacity: 50,
  },
  {
    id: "bus-5",
    cityId: "city-1",
    lineId: "line-2",
    busNumber: "P005",
    licensePlate: "AA-005-AA",
    status: "en_service",
    capacity: 50,
  },

  // Paris line 3
  {
    id: "bus-6",
    cityId: "city-1",
    lineId: "line-3",
    busNumber: "P006",
    licensePlate: "AA-006-AA",
    status: "en_service",
    capacity: 45,
  },
  {
    id: "bus-7",
    cityId: "city-1",
    lineId: "line-3",
    busNumber: "P007",
    licensePlate: "AA-007-AA",
    status: "en_service",
    capacity: 45,
  },

  // Lyon line 1
  {
    id: "bus-8",
    cityId: "city-2",
    lineId: "line-4",
    busNumber: "L001",
    licensePlate: "BB-001-BB",
    status: "en_service",
    assignedDriverId: "driver-4",
    capacity: 48,
  },
  {
    id: "bus-9",
    cityId: "city-2",
    lineId: "line-4",
    busNumber: "L002",
    licensePlate: "BB-002-BB",
    status: "en_service",
    capacity: 48,
  },

  // Lyon line 2
  {
    id: "bus-10",
    cityId: "city-2",
    lineId: "line-5",
    busNumber: "L003",
    licensePlate: "BB-003-BB",
    status: "en_service",
    assignedDriverId: "driver-4",
    capacity: 50,
  },
]
