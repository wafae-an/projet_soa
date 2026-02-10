"use client"

const CITIES = ["AGADIR", "CASABLANCA", "FES", "MARRAKECH", "RABAT", "TANGER"]

interface CitySelectorProps {
  selectedCity: string
  onCityChange: (city: string) => void
}

export function CitySelector({ selectedCity, onCityChange }: CitySelectorProps) {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-sm font-semibold text-sidebar-foreground">Sélection Ville</h2>
      <div className="space-y-2">
        {CITIES.map((city) => (
          <button
            key={city}
            onClick={() => onCityChange(city)}
            className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              selectedCity === city
                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                : "bg-sidebar-accent text-sidebar-foreground hover:bg-white/10"
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{city}</span>
              {selectedCity === city && (
                <span className="inline-flex h-2 w-2 rounded-full bg-sidebar-primary-foreground" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
