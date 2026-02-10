"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserTable } from "./user-table"
import { EditUserModal } from "./edit-user-modal"
import { CreateDriverModal } from "./create-driver-modal"
import { DeactivateConfirmationDialog } from "./deactivate-confirmation-dialog"
import { useToast } from "@/hooks/use-toast"

export type UserRole = "ADMIN" | "CONDUCTEUR" | "PASSAGER"

export interface User {
  id: number
  firstname: string
  lastname: string
  email: string
  phone?: string
  numero_permis?: string
  role: UserRole
  ville: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export function UserManagementDashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredRole, setFilteredRole] = useState<UserRole | "ALL">("ALL")
  const [loading, setLoading] = useState(true)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [deactivatingUser, setDeactivatingUser] = useState<User | null>(null)
  const [showCreateDriver, setShowCreateDriver] = useState(false)
  const { toast } = useToast()

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://localhost:3001/api/utilisateurs/users")
        if (!response.ok) throw new Error("Failed to fetch users")
        const data = await response.json()
        setUsers(data.users || data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load users",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [toast])

  // Filtrer les utilisateurs par rôle
  const filteredUsers = filteredRole === "ALL" 
    ? users 
    : users.filter((user) => user.role === filteredRole)

  const handleEditUser = async (updatedUser: Partial<User>) => {
    if (!editingUser) return

    try {
      const response = await fetch(`http://localhost:3001/api/utilisateurs/users/${editingUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      })

      if (!response.ok) throw new Error("Failed to update user")

      setUsers(users.map((u) => (u.id === editingUser.id ? { ...u, ...updatedUser } : u)))
      setEditingUser(null)
      toast({
        title: "Success",
        description: "User updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive",
      })
    }
  }

  const handleDeactivateUser = async () => {
    if (!deactivatingUser) return

    try {
      const response = await fetch(`http://localhost:3001/api/utilisateurs/users/${deactivatingUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: false }),
      })

      if (!response.ok) throw new Error("Failed to deactivate user")

      setUsers(users.map((u) => (u.id === deactivatingUser.id ? { ...u, is_active: false } : u)))
      setDeactivatingUser(null)
      toast({
        title: "Success",
        description: "User deactivated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to deactivate user",
        variant: "destructive",
      })
    }
  }

  const handleDriverCreated = () => {
    // Recharger la liste des utilisateurs après création
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/utilisateurs/users")
        if (response.ok) {
          const data = await response.json()
          setUsers(data.users || data)
        }
      } catch (error) {
        console.error("Error refreshing users:", error)
      }
    }

    fetchUsers()
    setShowCreateDriver(false)
    toast({
      title: "Success",
      description: "Conducteur créé avec succès!",
    })
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Gestion des Utilisateurs</h1>
        <p className="text-muted-foreground">Manage and organize all user accounts</p>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            {(["ALL", "ADMIN", "CONDUCTEUR", "PASSAGER"] as const).map((role) => (
              <button
                key={role}
                onClick={() => setFilteredRole(role)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  filteredRole === role ? "bg-[#1e40af] text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {role === "ALL" ? "Tous les utilisateurs" : role}
              </button>
            ))}
          </div>
          <Button onClick={() => setShowCreateDriver(true)} className="bg-[#1e40af] text-white hover:bg-[#1e3a8a]">
            Créer Conducteur
          </Button>
        </div>

        <UserTable
          users={filteredUsers}
          loading={loading}
          onEditUser={setEditingUser}
          onDeactivateUser={setDeactivatingUser}
        />
      </Card>

      {editingUser && (
        <EditUserModal
          user={editingUser}
          open={!!editingUser}
          onOpenChange={(open) => !open && setEditingUser(null)}
          onSave={handleEditUser}
        />
      )}

      {deactivatingUser && (
        <DeactivateConfirmationDialog
          user={deactivatingUser}
          open={!!deactivatingUser}
          onOpenChange={(open) => !open && setDeactivatingUser(null)}
          onConfirm={handleDeactivateUser}
        />
      )}

      {showCreateDriver && (
        <CreateDriverModal
          open={showCreateDriver}
          onOpenChange={setShowCreateDriver}
          onSuccess={handleDriverCreated}
        />
      )}
    </div>
  )
}