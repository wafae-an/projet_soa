"use client"

import type { User } from "./user-management-dashboard"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DeactivateConfirmationDialogProps {
  user: User
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function DeactivateConfirmationDialog({
  user,
  open,
  onOpenChange,
  onConfirm,
}: DeactivateConfirmationDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Désactiver l'utilisateur</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to deactivate <strong>{user.nom}</strong>? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-red-600 hover:bg-red-700">
            Désactiver
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
