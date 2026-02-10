"use client"

import { useDraggable } from "@dnd-kit/core"
import type { Bus } from "@/types"
import { Card } from "@/components/ui/card"
import { GripVertical } from "lucide-react"

interface BusItemProps {
  bus: Bus
}

export default function BusItem({ bus }: BusItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: bus.id,
  })

  // ⚠️ AJOUT IMPORTANT : Gestion du style de transformation
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined

  return (
    <div 
      ref={setNodeRef} 
      style={style} // ⚠️ AJOUT IMPORTANT
      {...listeners} 
      {...attributes}
    >
      <Card
        className={`p-3 cursor-grab active:cursor-grabbing transition-all duration-200 border-2 ${
          isDragging
            ? "opacity-50 border-slate-400"
            : "border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500"
        }`}
      >
        <div className="flex items-start gap-2">
          <GripVertical size={18} className="text-slate-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold text-slate-900 dark:text-white">Bus {bus.busNumber}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{bus.licensePlate}</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Capacité : {bus.capacity} places</p>
          </div>
        </div>
      </Card>
    </div>
  )
}