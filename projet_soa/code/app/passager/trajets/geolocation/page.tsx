import BusTracker from "@/components/bus-tracker"

export const metadata = {
  title: "Bus Tracker - Suivi en temps réel",
  description: "Suivez les bus en temps réel avec carte interactive Leaflet",
}

export default function Home() {
  return <BusTracker />
}
