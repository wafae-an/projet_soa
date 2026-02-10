"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard_ayout"

export default function Home() {
  const [activeTab, setActiveTab] = useState<"buses" | "schedule">("buses")

  return <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab} />
}
