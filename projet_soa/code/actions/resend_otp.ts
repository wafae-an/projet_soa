"use server"

export async function resendEmailCode(email: string): Promise<boolean> {
  try {
    const res = await fetch("http://localhost:3001/api/utilisateurs/resend_code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    if (!res.ok) {
      const data = await res.json()
      console.error("Erreur:", data.detail)
      return false
    }

    return true
  } catch (error) {
    console.error("Erreur réseau:", error)
    return false
  }
}
