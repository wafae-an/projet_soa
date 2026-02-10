"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CreateDriverModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

const API_BASE_URL = "http://localhost:3001/api/utilisateurs"

export function CreateDriverModal({ open, onOpenChange, onSuccess }: CreateDriverModalProps) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    numero_permis: "",
    ville: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstname || formData.firstname.length < 2 || formData.firstname.length > 100) {
      newErrors.firstname = "Le prénom doit contenir entre 2 et 100 caractères"
    }
    if (!formData.lastname || formData.lastname.length < 2 || formData.lastname.length > 100) {
      newErrors.lastname = "Le nom doit contenir entre 2 et 100 caractères"
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Adresse email invalide"
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères"
    }
    if (!formData.numero_permis) {
      newErrors.numero_permis = "Le numéro de permis est requis"
    }
    if (!formData.ville) {
      newErrors.ville = "La ville est requise"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    setSubmitError(null)
    
    if (!validateForm()) return

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/conducteurs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          role: "CONDUCTEUR" // Ajout du rôle automatiquement
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Erreur lors de la création du conducteur")
      }

      const result = await response.json()
      console.log("Conducteur créé avec succès:", result)

      // Réinitialiser le formulaire
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        numero_permis: "",
        ville: "",
      })
      
      // Fermer la modal et notifier le parent
      onOpenChange(false)
      onSuccess()

    } catch (error) {
      console.error("Erreur création conducteur:", error)
      setSubmitError(error instanceof Error ? error.message : "Erreur lors de la création du conducteur")
    } finally {
      setLoading(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Réinitialiser les erreurs et le formulaire quand on ferme
      setErrors({})
      setSubmitError(null)
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        numero_permis: "",
        ville: "",
      })
    }
    onOpenChange(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Créer un Conducteur</DialogTitle>
          <DialogDescription>
            Ajouter un nouveau conducteur au système
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstname">Prénom *</Label>
              <Input
                id="firstname"
                value={formData.firstname}
                onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                className={errors.firstname ? "border-red-500" : ""}
                disabled={loading}
              />
              {errors.firstname && <p className="text-sm text-red-500 mt-1">{errors.firstname}</p>}
            </div>

            <div>
              <Label htmlFor="lastname">Nom *</Label>
              <Input
                id="lastname"
                value={formData.lastname}
                onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                className={errors.lastname ? "border-red-500" : ""}
                disabled={loading}
              />
              {errors.lastname && <p className="text-sm text-red-500 mt-1">{errors.lastname}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={errors.email ? "border-red-500" : ""}
              disabled={loading}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="password">Mot de passe *</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={errors.password ? "border-red-500" : ""}
              disabled={loading}
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>

          <div>
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="numero_permis">Numéro de Permis *</Label>
            <Input
              id="numero_permis"
              value={formData.numero_permis}
              onChange={(e) => setFormData({ ...formData, numero_permis: e.target.value })}
              className={errors.numero_permis ? "border-red-500" : ""}
              disabled={loading}
            />
            {errors.numero_permis && <p className="text-sm text-red-500 mt-1">{errors.numero_permis}</p>}
          </div>

          {/* CHAMP VILLE AJOUTÉ */}
          <div>
            <Label htmlFor="ville">Ville *</Label>
            <Input
              id="ville"
              value={formData.ville}
              onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
              className={errors.ville ? "border-red-500" : ""}
              disabled={loading}
              placeholder="Entrez la ville du conducteur"
            />
            {errors.ville && <p className="text-sm text-red-500 mt-1">{errors.ville}</p>}
          </div>

          {submitError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{submitError}</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => handleOpenChange(false)}
            disabled={loading}
          >
            Annuler
          </Button>
          <Button 
            type="button" 
            className="bg-[#1e40af] text-white hover:bg-[#1e3a8a]" 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Création..." : "Créer Conducteur"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}