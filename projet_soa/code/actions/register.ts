"use server"

export async function signUp(prevState: any, formData: FormData) {
  const userData = {
    firstname: formData.get("firstname") as string,
    lastname: formData.get("lastname") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  // Validation simple
  if (!userData.firstname || !userData.lastname || !userData.email || !userData.password) {
    return {
      success: false,
      message: "Tous les champs obligatoires doivent être remplis"
    }
  }

  try {
    const res = await fetch("http://localhost:3001/api/utilisateurs/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })

    const data = await res.json()

    if (!res.ok) {
      return {
        success: false,
        message: data.detail || "Erreur lors de la création du compte"
      }
    }

    // Stocker le token dans localStorage
    if (typeof window !== 'undefined' && data.token) {
      localStorage.setItem("token", data.token)
    }

    return {
      success: true,
      message: "Compte créé avec succès!",
      user: data,
      redirect: "/login" // Redirection après inscription
    }

  } catch (error) {
    console.error("Erreur inscription:", error)
    return {
      success: false,
      message: "Erreur de connexion au serveur"
    }
  }
}