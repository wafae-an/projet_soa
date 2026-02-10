"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useActionState } from "react"
import { Mail, Lock, Eye, EyeOff, User, Phone, UserPlus, ArrowLeft, Loader } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { signUp } from "@/actions/register"
import Link from "next/link"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
  })
  const [state, action, isPending] = useActionState(signUp, null)
  const router = useRouter()

  useEffect(() => {
    if (state?.success) {
      // Redirection après un délai pour voir le message de succès
      const timer = setTimeout(() => {
        if (state.redirect) {
          router.push(state.redirect)
        }
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [state, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-[#1e40af] p-8 text-center relative">
            {/* Back Button */}
            <Link 
              href="/login" 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            
            <div className="flex justify-center mb-4">
              <div className="bg-white rounded-full p-3 shadow-lg">
                <UserPlus className="w-8 h-8 text-[#1e40af]" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Créer un compte</h1>
            <p className="text-blue-100 text-sm">Rejoignez CityTransit en tant que passager</p>
          </div>

          {/* Form Section */}
          <div className="p-8">
            {/* Success Message */}
            {state?.success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm font-medium">✓ {state.message}</p>
                <p className="text-green-700 text-sm mt-1">Redirection en cours...</p>
              </div>
            )}

            {/* Error Message */}
            {state?.success === false && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm font-medium">⚠ {state.message}</p>
              </div>
            )}

            <form action={action} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstname" className="block text-sm font-semibold text-gray-700">
                    Prénom *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="firstname"
                      name="firstname"
                      type="text"
                      placeholder="Votre prénom"
                      value={formData.firstname}
                      onChange={handleChange}
                      disabled={isPending}
                      className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent disabled:bg-gray-50"
                      required
                      minLength={2}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="lastname" className="block text-sm font-semibold text-gray-700">
                    Nom *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="lastname"
                      name="lastname"
                      type="text"
                      placeholder="Votre nom"
                      value={formData.lastname}
                      onChange={handleChange}
                      disabled={isPending}
                      className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent disabled:bg-gray-50"
                      required
                      minLength={2}
                    />
                  </div>
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                  Téléphone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+33 1 23 45 67 89"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isPending}
                    className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isPending}
                    className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent disabled:bg-gray-50"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                  Mot de passe *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Au moins 6 caractères"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isPending}
                    className="pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent disabled:bg-gray-50"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isPending}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500">Le mot de passe doit contenir au moins 6 caractères</p>
              </div>

              {/* Register Button */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full py-3 bg-[#1e40af] text-white font-semibold rounded-lg hover:bg-[#1a3a8a] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
              >
                {isPending ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Création du compte...</span>
                  </>
                ) : (
                  "Créer mon compte"
                )}
              </Button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Déjà un compte ?{" "}
                <Link 
                  href="/login" 
                  className="text-[#1e40af] hover:text-[#1a3a8a] font-medium transition-colors"
                >
                  Se connecter
                </Link>
              </p>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-sm font-semibold text-[#1e40af] mb-2">Informations</h3>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• Tous les champs marqués d'un * sont obligatoires</li>
                <li>• Vous serez automatiquement inscrit en tant que passager</li>
                <li>• Votre mot de passe sera sécurisé par hachage</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-100">
            <p className="text-xs text-gray-500">© 2025 CityTransit. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </div>
  )
}