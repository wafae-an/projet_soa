import { type NextRequest, NextResponse } from "next/server"

// Mock users database
const mockUsers = [
  {
    id: "1",
    nom: "Jean Dupont",
    email: "jean@example.com",
    role: "ADMIN",
    telephone: "+33612345678",
    actif: true,
  },
  {
    id: "2",
    nom: "Marie Martin",
    email: "marie@example.com",
    role: "CONDUCTEUR",
    telephone: "+33687654321",
    numeroPermis: "DL123456",
    busAssigne: "BUS-001",
    actif: true,
  },
  {
    id: "3",
    nom: "Pierre Bernard",
    email: "pierre@example.com",
    role: "PASSAGER",
    telephone: "+33645789012",
    actif: true,
  },
  {
    id: "4",
    nom: "Sophie Laurent",
    email: "sophie@example.com",
    role: "CONDUCTEUR",
    telephone: "+33698765432",
    numeroPermis: "DL789012",
    busAssigne: "BUS-002",
    actif: true,
  },
  {
    id: "5",
    nom: "Luc Moreau",
    email: "luc@example.com",
    role: "PASSAGER",
    telephone: "+33621345987",
    actif: true,
  },
]

export async function GET(request: NextRequest) {
  try {
    // Return only active users
    return NextResponse.json(mockUsers.filter((u) => u.actif))
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
