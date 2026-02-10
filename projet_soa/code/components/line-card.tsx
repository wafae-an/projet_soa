import { Edit2, Trash2, MapPin, Power } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {Button} from '@/components/ui/button'

interface Line {
  id: string
  number: string
  name: string
  city: string
  stops: number
  direction: string
  firstStop: string
  lastStop: string
  status: 'active' | 'inactive'
}

interface LineCardProps {
  line: Line
  onToggleStatus: () => void
  onEdit: () => void
  onDelete: () => void
}

export default function LineCard({ line, onToggleStatus, onEdit, onDelete }: LineCardProps) {
  return (
    <div className={`bg-card border-l-4 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow ${
      line.status === 'active' ? 'border-l-primary' : 'border-l-destructive'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-primary">{line.number}</span>
            <Badge variant={line.status === 'active' ? 'default' : 'secondary'}>
              {line.status === 'active' ? 'Actif' : 'Inactif'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Line Name */}
      <h3 className="text-lg font-semibold text-card-foreground mb-2">{line.name}</h3>

      {/* Direction */}
      <p className="text-sm text-muted-foreground mb-4 flex items-start gap-2">
        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <span>{line.direction}</span>
      </p>

      {/* Stops Info */}
      <div className="flex items-center justify-between mb-4 p-3 bg-muted rounded-lg">
        <div>
          <p className="text-xs text-muted-foreground">Nombre d'arrêts</p>
          <p className="text-lg font-semibold text-card-foreground">{line.stops} arrêts</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Parcours</p>
          <p className="text-xs font-medium text-card-foreground">{line.firstStop} → {line.lastStop}</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button 
          variant={line.status === 'active' ? 'outline' : 'outline'}
          size="sm" 
          className="flex-1"
          onClick={onToggleStatus}
          title={line.status === 'active' ? 'Désactiver' : 'Activer'}
        >
          <Power className="w-4 h-4 mr-1" />
          {line.status === 'active' ? 'Désactiver' : 'Activer'}
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={onEdit}
        >
          <Edit2 className="w-4 h-4 mr-1" />
          Modifier
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={onDelete}
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Supprimer
        </Button>
      </div>
    </div>
  )
}
