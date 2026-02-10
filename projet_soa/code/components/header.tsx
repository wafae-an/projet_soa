import { Search } from 'lucide-react'

interface HeaderProps {
  currentCity: string
  setCurrentCity: (city: string) => void
  currentPage: string
}

export default function Header({ currentCity, setCurrentCity, currentPage }: HeaderProps) {
  const cities = ['Agadir', 'Casablanca', 'Marrakech', 'Fès', 'Tanger']
  
  const pageTitle = currentPage === 'lines' ? 'Gestion des Lignes' : 'Gestion des Arrêts'

  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{pageTitle}</h1>
        <p className="text-sm text-muted-foreground mt-1">Gérez votre réseau de transport urbain</p>
      </div>

      <div className="flex items-center gap-4">
        {/* City Selector */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-foreground">Ville:</label>
          <select
            value={currentCity}
            onChange={(e) => setCurrentCity(e.target.value)}
            className="px-3 py-2 rounded-lg border border-input bg-card text-foreground text-sm"
          >
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>
    </header>
  )
}
