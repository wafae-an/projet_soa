"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { getWeekDates, formatDate } from "@/lib/date-utils"

interface ScheduleSlot {
  time: string
  bus: string
  route: string
  type: "service" | "break" | "rest"
}

interface DaySchedule {
  day: string
  date: string
  slots: ScheduleSlot[]
  isRestDay: boolean
}

const MOCK_SCHEDULE: Record<string, DaySchedule[]> = {
  default: [
    {
      day: "Lundi",
      date: "2024-01-08",
      isRestDay: false,
      slots: [
        { time: "06:00 - 08:30", bus: "CB-1001", route: "Centre - Aéroport", type: "service" },
        { time: "08:30 - 10:00", bus: "CB-1001", route: "Aéroport - Gare", type: "service" },
        { time: "10:00 - 11:00", bus: "CB-1001", route: "Pause", type: "break" },
        { time: "11:00 - 13:30", bus: "CB-1001", route: "Gare - Centre", type: "service" },
      ],
    },
    {
      day: "Mardi",
      date: "2024-01-09",
      isRestDay: false,
      slots: [
        { time: "06:30 - 09:00", bus: "CB-1002", route: "Banlieue - Centre", type: "service" },
        { time: "09:00 - 10:30", bus: "CB-1002", route: "Centre - Port", type: "service" },
        { time: "10:30 - 11:00", bus: "CB-1002", route: "Pause", type: "break" },
      ],
    },
    {
      day: "Mercredi",
      date: "2024-01-10",
      isRestDay: false,
      slots: [
        { time: "05:00 - 07:30", bus: "CB-1001", route: "Gare - Centre", type: "service" },
        { time: "07:30 - 09:00", bus: "CB-1001", route: "Centre - Aéroport", type: "service" },
      ],
    },
    {
      day: "Jeudi",
      date: "2024-01-11",
      isRestDay: false,
      slots: [
        { time: "06:00 - 08:00", bus: "CB-2001", route: "Quartiers - Centre", type: "service" },
        { time: "08:00 - 10:00", bus: "CB-2001", route: "Centre - Banlieue", type: "service" },
      ],
    },
    {
      day: "Vendredi",
      date: "2024-01-12",
      isRestDay: false,
      slots: [
        { time: "07:00 - 09:00", bus: "CB-1001", route: "Aéroport - Centre", type: "service" },
        { time: "09:00 - 11:00", bus: "CB-1001", route: "Centre - Port", type: "service" },
      ],
    },
    {
      day: "Samedi",
      date: "2024-01-13",
      isRestDay: false,
      slots: [{ time: "08:00 - 10:00", bus: "CB-1002", route: "Centre - Quartiers", type: "service" }],
    },
    {
      day: "Dimanche",
      date: "2024-01-14",
      isRestDay: true,
      slots: [],
    },
  ],
}

export function WeeklyScheduleView() {
  const { driver } = useAuth()
  const [currentWeekStart, setCurrentWeekStart] = useState(
    new Date(2024, 0, 8), // Monday, January 8, 2024
  )

  const weekDates = getWeekDates(currentWeekStart)
  const schedule = MOCK_SCHEDULE.default

  const handlePreviousWeek = () => {
    setCurrentWeekStart(new Date(currentWeekStart.getTime() - 7 * 24 * 60 * 60 * 1000))
  }

  const handleNextWeek = () => {
    setCurrentWeekStart(new Date(currentWeekStart.getTime() + 7 * 24 * 60 * 60 * 1000))
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Planning Semaine</h1>
            <p className="text-muted-foreground">{driver.city}</p>
          </div>

          {/* Week Navigation */}
          <div className="flex items-center gap-4">
            <button onClick={handlePreviousWeek} className="p-2 hover:bg-accent rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <span className="text-sm font-medium text-foreground min-w-48 text-center">
              {formatDate(currentWeekStart)} -{" "}
              {formatDate(new Date(currentWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000))}
            </span>
            <button onClick={handleNextWeek} className="p-2 hover:bg-accent rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Weekly Grid */}
        <div className="grid grid-cols-7 gap-3 mb-8">
          {schedule.map((daySchedule, idx) => (
            <div
              key={idx}
              className={`rounded-lg border ${
                daySchedule.isRestDay ? "border-border bg-muted" : "border-border bg-card"
              } overflow-hidden`}
            >
              {/* Day Header */}
              <div
                className={`px-4 py-3 border-b border-border ${daySchedule.isRestDay ? "bg-muted/50" : "bg-accent"}`}
              >
                <p className="text-sm font-semibold text-foreground">{daySchedule.day}</p>
                <p className="text-xs text-muted-foreground">{daySchedule.date}</p>
              </div>

              {/* Day Content */}
              <div className="p-4">
                {daySchedule.isRestDay ? (
                  <div className="text-center py-6">
                    <p className="text-sm font-medium text-muted-foreground">REPOS</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {daySchedule.slots.map((slot, slotIdx) => (
                      <div
                        key={slotIdx}
                        className={`p-2 rounded text-xs border ${
                          slot.type === "break"
                            ? "bg-amber-50 border-amber-200 text-amber-700"
                            : "bg-emerald-50 border-emerald-200 text-emerald-700"
                        }`}
                      >
                        <p className="font-semibold">{slot.time}</p>
                        <p className="text-xs opacity-75 mt-1">{slot.bus}</p>
                        <p className="text-xs opacity-75">{slot.route}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-emerald-50 border border-emerald-200" />
            <span className="text-foreground">Service</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-amber-50 border border-amber-200" />
            <span className="text-foreground">Pause</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-muted border border-border" />
            <span className="text-foreground">Repos</span>
          </div>
        </div>
      </div>
    </div>
  )
}
