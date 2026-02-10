"use client"

interface StatusBadgeProps {
  status: "active" | "maintenance" | "inactive"
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    active: {
      label: "Actif",
      className: "bg-emerald-100 text-emerald-800 border border-emerald-300",
    },
    maintenance: {
      label: "Maintenance",
      className: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    },
    inactive: {
      label: "Inactif",
      className: "bg-gray-200 text-gray-800 border border-gray-300",
    },
  }

  const config = statusConfig[status]

  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${config.className}`}>{config.label}</span>
}
