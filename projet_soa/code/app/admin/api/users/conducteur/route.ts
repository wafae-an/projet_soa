import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.nom || !data.email || !data.password || !data.numeroPermis || !data.busAssigne) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, create the user in the database
    const newDriver = {
      id: Math.random().toString(36).substr(2, 9),
      nom: data.nom,
      email: data.email,
      role: "CONDUCTEUR",
      telephone: data.telephone || "",
      numeroPermis: data.numeroPermis,
      busAssigne: data.busAssigne,
      actif: true,
    }

    return NextResponse.json(newDriver, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create driver" }, { status: 500 })
  }
}
