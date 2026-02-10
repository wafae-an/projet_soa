import { Card } from "@/components/ui/card"

interface DriverCardProps {
  driver: {
    id: string
    name: string
    licenseNumber: string
  }
  isSelected?: boolean
}

export default function DriverCard({ driver, isSelected }: DriverCardProps) {
  // Extraire les initiales du nom complet
  const getInitials = (name: string) => {
    const names = name.split(' ')
    if (names.length >= 2) {
      return `${names[0].charAt(0)}${names[1].charAt(0)}`.toUpperCase()
    }
    return name.charAt(0).toUpperCase()
  }

  return (
    <Card
      className={`p-4 hover:shadow-lg transition-all duration-200 ${
        isSelected ? "border-purple-600 bg-purple-50 dark:bg-purple-950" : "border-slate-200 dark:border-slate-700"
      }`}
    >
      <div className="flex gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
          {getInitials(driver.name)}
        </div>
        <div className="flex-1 text-left">
          <h3 className="font-bold text-slate-900 dark:text-white">
            {driver.name}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Permis: {driver.licenseNumber}
          </p>
        </div>
      </div>
    </Card>
  )
}