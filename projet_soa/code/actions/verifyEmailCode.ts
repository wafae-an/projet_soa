"use server"

type VerifyResponse = {
  success: boolean
  message: string
  redirect?: string
  token?: string
  role?: string
  userId?: string  // ← AJOUTER userId
}

export async function verifyEmailCode(
  prevState: any,
  formData: FormData
): Promise<VerifyResponse> {
  const email = formData.get("email") as string
  const code = formData.get("code") as string

  if (!email || !code) {
    return {
      success: false,
      message: "Email ou code manquant",
    }
  }

  try {
    const res = await fetch("http://localhost:3001/api/utilisateurs/verify_code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    })

    const data = await res.json()

    if (!res.ok) {
      return {
        success: false,
        message: data.detail || "Code incorrect",
      }
    }

    const { token, role, user_id } = data  // ← AJOUTER user_id

    // Redirection selon le rôle
    let redirect = "/passager/trajets";

    if (role === "ADMIN") {
        redirect = "/admin";
    } else if (role === "PASSAGER") {
        redirect = "/passager/trajets";
    } else if (role === "CONDUCTEUR") {
        redirect = "/conducteur";
    }

    return {
      success: true,
      message: "Code vérifié avec succès",
      token,
      role,
      userId: user_id,  // ← AJOUTER userId dans la réponse
      redirect,
    }

  } catch (error) {
    console.error("Erreur côté client :", error)
    return {
      success: false,
      message: "Erreur réseau ou serveur",
    }
  }
}