"use client"

import type React from "react"
import { createContext, useContext } from "react"

interface Driver {
  id: string
  name: string
  city: string
}

interface AuthContextType {
  driver: Driver
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock: Currently logged in driver
const CURRENT_DRIVER: Driver = {
  id: "d1",
  name: "Ahmed Moussaoui",
  city: "CASABLANCA",
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthContext.Provider value={{ driver: CURRENT_DRIVER }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
