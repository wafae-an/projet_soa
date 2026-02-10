"use client"

import type { User } from "./user-management-dashboard"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface UserTableProps {
  users: User[]
  loading: boolean
  onEditUser: (user: User) => void
  onDeactivateUser: (user: User) => void
}

export function UserTable({ users, loading, onEditUser, onDeactivateUser }: UserTableProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Aucun utilisateur trouvé</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-semibold">Nom Complet</th>
            <th className="text-left py-3 px-4 font-semibold">Email</th>
            <th className="text-left py-3 px-4 font-semibold">Rôle</th>
            <th className="text-left py-3 px-4 font-semibold">Téléphone</th>
            <th className="text-left py-3 px-4 font-semibold">Numéro de Permis</th>
            <th className="text-left py-3 px-4 font-semibold">Statut</th>
            <th className="text-left py-3 px-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-muted/50 transition-colors">
              <td className="py-3 px-4">
                {user.firstname} {user.lastname}
              </td>
              <td className="py-3 px-4 text-sm">{user.email}</td>
              <td className="py-3 px-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user.role === "ADMIN"
                      ? "bg-blue-100 text-blue-800"
                      : user.role === "CONDUCTEUR"
                        ? "bg-green-100 text-green-800"
                        : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td className="py-3 px-4 text-sm">{user.phone || "-"}</td>
              <td className="py-3 px-4 text-sm">
                {user.role === "CONDUCTEUR" ? (
                  user.numero_permis ? (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-mono">
                      {user.numero_permis}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs">Non renseigné</span>
                  )
                ) : (
                  <span className="text-gray-400 text-xs">-</span>
                )}
              </td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    user.is_active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.is_active ? "Actif" : "Inactif"}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex gap-2">
                  <Button
                    onClick={() => onEditUser(user)}
                    className="bg-[#1e40af] text-white hover:bg-[#1e3a8a] text-sm"
                    size="sm"
                  >
                    Modifier
                  </Button>
                  {user.is_active && (
                    <Button onClick={() => onDeactivateUser(user)} variant="destructive" className="text-sm" size="sm">
                      Désactiver
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}