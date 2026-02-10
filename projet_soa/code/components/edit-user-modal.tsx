"use client"

import { useState } from "react"
import type { User, UserRole } from "./user-management-dashboard"
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

interface EditUserModalProps {
  user: User
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (user: Partial<User>) => void
}

export function EditUserModal({ user, open, onOpenChange, onSave }: EditUserModalProps) {
  const [formData, setFormData] = useState(user)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nom || formData.nom.length < 2 || formData.nom.length > 100) {
      newErrors.nom = "Name must be between 2-100 characters"
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address"
    }
    if (formData.telephone && formData.telephone.trim()) {
      if (!/^\d{10,}$/.test(formData.telephone.replace(/\D/g, ""))) {
        newErrors.telephone = "Invalid phone number"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier Utilisateur</DialogTitle>
          <DialogDescription>Update user information below</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="nom">Nom *</Label>
            <Input
              id="nom"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              className={errors.nom ? "border-red-500" : ""}
            />
            {errors.nom && <p className="text-sm text-red-500 mt-1">{errors.nom}</p>}
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="telephone">Téléphone</Label>
            <Input
              id="telephone"
              value={formData.telephone || ""}
              onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
              className={errors.telephone ? "border-red-500" : ""}
            />
            {errors.telephone && <p className="text-sm text-red-500 mt-1">{errors.telephone}</p>}
          </div>

          {formData.role === "CONDUCTEUR" && (
            <>
              <div>
                <Label htmlFor="numeroPermis">Numéro de Permis</Label>
                <Input
                  id="numeroPermis"
                  value={formData.numeroPermis || ""}
                  onChange={(e) => setFormData({ ...formData, numeroPermis: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="busAssigne">Bus Assigné</Label>
                <Input
                  id="busAssigne"
                  value={formData.busAssigne || ""}
                  onChange={(e) => setFormData({ ...formData, busAssigne: e.target.value })}
                />
              </div>
            </>
          )}

          <div>
            <Label htmlFor="role">Rôle</Label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
              className="w-full px-3 py-2 border rounded-md bg-background"
            >
              <option value="ADMIN">ADMIN</option>
              <option value="CONDUCTEUR">CONDUCTEUR</option>
              <option value="PASSAGER">PASSAGER</option>
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button type="button" className="bg-[#1e40af] text-white hover:bg-[#1e3a8a]" onClick={handleSubmit}>
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
