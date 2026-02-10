"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useActionState } from "react"
import { Mail, Lock, Eye, EyeOff, Bus, Loader, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { signIn } from "@/actions/auth"
import Link from "next/link"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [state, action, isPending] = useActionState(signIn, null)
  const router = useRouter()

  useEffect(() => {
    if (state?.success && state?.redirect) {
      router.push(state.redirect)
    }
  }, [state, router])

  return (
    <div className="w-full max-w-md">
      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-[#1e40af] p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white rounded-full p-3 shadow-lg">
              <Bus className="w-8 h-8 text-[#1e40af]" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">CityTransit</h1>
         
          <p className="text-blue-100 text-sm">Accédez à votre espace de gestion du transport</p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          {/* Success Message */}
          {state?.success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm font-medium">✓ {state.message}</p>
            </div>
          )}

          {/* Error Message */}
          {state?.success === false && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm font-medium">⚠ {state.message}</p>
            </div>
          )}

          <form action={action} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Adresse Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@entreprise-transport.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isPending}
                  className="pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent disabled:bg-gray-50"
                  aria-label="Adresse email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isPending}
                  className="pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent disabled:bg-gray-50"
                  aria-label="Mot de passe"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isPending}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full py-3 bg-[#1e40af] text-white font-semibold rounded-lg hover:bg-[#1a3a8a] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Connexion en cours...</span>
                </>
              ) : (
                "Se connecter"
              )}
            </Button>
          </form>

           {/* Create Account Link */}
          <div className="mt-6 text-center">
            <Link 
              href="/register" 
              className="inline-flex items-center gap-2 text-[#1e40af] hover:text-[#1a3a8a] font-medium transition-colors text-sm"
            >
              <UserPlus className="w-4 h-4" />
              Créer un compte passager
            </Link>
          </div>

          {/* Links Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-between text-sm">
              <a href="#" className="text-[#1e40af] hover:text-[#1a3a8a] font-medium transition-colors">
                Mot de passe oublié ?
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-700 font-medium transition-colors">
                Support technique
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-100">
          <p className="text-xs text-gray-500">© 2025 TransitPro. Tous droits réservés.</p>
        </div>
      </div>
    </div>
  )
}