export interface City {
  id: string
  name: string
  code: string
}

export interface BusLine {
  id: string
  cityId: string
  lineNumber: string
  lineName: string
  description?: string
}

export interface Driver {
  id: string
  cityId: string
  lineIds: string[]
  firstName: string
  lastName: string
  email: string
  phone: string
  photo?: string
  status: "active" | "inactive" | "on_leave"
  totalBuses?: number
}

export interface Bus {
  id: string
  cityId: string
  lineId: string
  busNumber: string
  licensePlate: string
  status: "en_service" | "maintenance" | "retired"
  assignedDriverId?: string
  capacity: number
}

export interface AssignmentState {
  cityId?: string
  lineId?: string
  driverId?: string
  assignedBuses: string[]
}


// types/index.ts
export interface BusFromAPI {
  id: number
  numero_immatriculation: string
  modele: string
  capacite: number
  ville: string
  ligne_id: string
  conducteur_id: number | null
  statut: string
}

export interface BusForDnD {
  id: string
  numero_immatriculation: string
  modele: string
  capacite: number
  ville: string
  status: string
  cityId: string
  lineId: string
}