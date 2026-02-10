"use client"

import { DndContext, type DragEndEvent, closestCenter } from "@dnd-kit/core"
import { useState } from "react"
import type { Bus } from "@/types"
import BusColumn from "./bus-column"

interface DragDropContainerProps {
  availableBuses: Bus[]
  assignedBuses: Bus[]
  onAssignmentChange: (busIds: string[]) => void
}

export default function DragDropContainer({
  availableBuses,
  assignedBuses,
  onAssignmentChange,
}: DragDropContainerProps) {
  const [localAssignedBuses, setLocalAssignedBuses] = useState(assignedBuses.map((b) => b.id))

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const busId = active.id as string
    const targetDropZone = over.id as string

    // Mettre à jour l'état APRÈS l'animation de drag
    setTimeout(() => {
      if (targetDropZone === "assigned-zone") {
        if (!localAssignedBuses.includes(busId)) {
          const updated = [...localAssignedBuses, busId]
          setLocalAssignedBuses(updated)
          onAssignmentChange(updated)
        }
      } else if (targetDropZone === "available-zone") {
        const updated = localAssignedBuses.filter((id) => id !== busId)
        setLocalAssignedBuses(updated)
        onAssignmentChange(updated)
      }
    }, 100) // Petit délai pour laisser l'animation se terminer
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BusColumn 
          title="Bus Disponibles" 
          buses={availableBuses.filter(bus => !localAssignedBuses.includes(bus.id))} 
          zoneId="available-zone" 
          variant="available" 
        />
        <BusColumn
          title="Bus Assignés"
          buses={assignedBuses.filter((b) => localAssignedBuses.includes(b.id))}
          zoneId="assigned-zone"
          variant="assigned"
        />
      </div>
    </DndContext>
  )
}