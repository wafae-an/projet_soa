"use client"

import { useDroppable } from "@dnd-kit/core"
import type { Bus } from "@/types"
import { Card } from "@/components/ui/card"
import BusItem from "./bus-item"
import { BusIcon } from "lucide-react"

interface BusColumnProps {
  title: string
  buses: Bus[]
  zoneId: string
  variant: "available" | "assigned"
}

export default function BusColumn({ title, buses, zoneId, variant }: BusColumnProps) {
  const { isOver, setNodeRef } = useDroppable({ id: zoneId }) // ⚠️ AJOUT de isOver

  const bgColor = variant === "available" 
    ? (isOver ? "bg-blue-100 dark:bg-blue-900" : "bg-blue-50 dark:bg-blue-950") // ⚠️ AJOUT conditionnel
    : (isOver ? "bg-green-100 dark:bg-green-900" : "bg-green-50 dark:bg-green-950")

  const borderColor = variant === "available" 
    ? (isOver ? "border-blue-300 dark:border-blue-600" : "border-blue-200 dark:border-blue-800") // ⚠️ AJOUT conditionnel
    : (isOver ? "border-green-300 dark:border-green-600" : "border-green-200 dark:border-green-800")

  const textColor = variant === "available" ? "text-blue-900 dark:text-blue-200" : "text-green-900 dark:text-green-200"

  return (
    <Card ref={setNodeRef} className={`p-4 min-h-96 ${bgColor} border-2 ${borderColor}`}>
      <div className="flex items-center gap-2 mb-4">
        <BusIcon className={textColor} size={20} />
        <h3 className={`font-bold text-lg ${textColor}`}>{title}</h3>
        <span className="ml-auto bg-white dark:bg-slate-800 px-2 py-1 rounded text-sm font-medium text-slate-700 dark:text-slate-300">
          {buses.length}
        </span>
      </div>

      <div className="space-y-2">
        {buses.length === 0 ? (
          <div className={`text-center py-8 ${textColor} ${isOver ? "opacity-100" : "opacity-50"}`}>
            {variant === "available" ? "Aucun bus disponible" : "Glissez les bus ici"}
          </div>
        ) : (
          buses.map((bus) => <BusItem key={bus.id} bus={bus} />)
        )}
      </div>
    </Card>
  )
}