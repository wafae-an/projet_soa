import { Edit2, Trash2, MapPin, Accessibility, Power } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {Button} from '@/components/ui/button'

interface Stop {
  id: string
  name: string
  code: string
  address: string
  latitude: number
  longitude: number
  accessibility: boolean
  status: 'active' | 'inactive'
  associatedLines: string[]
}

interface StopsTableProps {
  stops: Stop[]
  onEdit: (stop: Stop) => void
  onDelete: (id: string) => void
  onToggleStatus: (id: string) => void
}

export default function StopsTable({ stops, onEdit, onDelete, onToggleStatus }: StopsTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full">
        {/* Table Header */}
        <thead className="border-b border-border bg-muted">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Nom de l'arrêt
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Code
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">
              Adresse
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Coordonnées
            </th>
            <th className="px-6 py-4 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              PMR
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Lignes
            </th>
            <th className="px-6 py-4 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Statut
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {stops.map((stop, index) => (
            <tr key={stop.id} className={index !== stops.length - 1 ? 'border-b border-border' : ''}>
              {/* Name */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium text-foreground">{stop.name}</span>
                </div>
              </td>

              {/* Code */}
              <td className="px-6 py-4">
                <code className="px-2 py-1 rounded bg-muted text-muted-foreground text-xs font-mono">
                  {stop.code}
                </code>
              </td>

              {/* Address */}
              <td className="px-6 py-4 hidden md:table-cell">
                <p className="text-sm text-muted-foreground">{stop.address}</p>
              </td>

              {/* Coordinates */}
              <td className="px-6 py-4">
                <p className="text-xs text-muted-foreground font-mono">
                  {stop.latitude.toFixed(4)}, {stop.longitude.toFixed(4)}
                </p>
              </td>

              {/* Accessibility */}
              <td className="px-6 py-4 text-center">
                {stop.accessibility ? (
                  <div className="flex justify-center">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Accessibility className="w-4 h-4 text-accent" />
                    </div>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </td>

              {/* Associated Lines */}
              <td className="px-6 py-4">
                <div className="flex gap-1 flex-wrap">
                  {stop.associatedLines.length > 0 ? (
                    stop.associatedLines.map(line => (
                      <Badge key={line} variant="default">
                        {line}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </div>
              </td>

              {/* Status */}
              <td className="px-6 py-4 text-center">
                <Badge variant={stop.status === 'active' ? 'default' : 'secondary'}>
                  {stop.status === 'active' ? 'Actif' : 'Inactif'}
                </Badge>
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onToggleStatus(stop.id)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                    title={stop.status === 'active' ? 'Désactiver' : 'Activer'}
                  >
                    <Power className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </button>
                  <button
                    onClick={() => onEdit(stop)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                    title="Modifier"
                  >
                    <Edit2 className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </button>
                  <button
                    onClick={() => onDelete(stop.id)}
                    className="p-2 hover:bg-destructive hover:text-destructive-foreground rounded-lg transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
