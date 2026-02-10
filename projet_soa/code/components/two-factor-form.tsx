"use client"

import React from "react"
import { useState, useEffect, useRef } from "react"
import { Shield, Copy, ArrowLeft } from "lucide-react"
import { verifyEmailCode } from "@/actions/verifyEmailCode"
import { resendEmailCode } from "@/actions/resend_otp"
import { useActionState } from "react"
import { useSearchParams, useRouter } from "next/navigation"

export default function TwoFactorForm() {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [isExpired, setIsExpired] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])
  const [state, action, isPending] = useActionState(verifyEmailCode, null)
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get("email") || ""

  // Initialiser les refs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6)
  }, [])

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true)
      return
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timeLeft])

  // Gérer la réponse de vérification
  useEffect(() => {
    if (state?.success) {
      if (state.token) {
        localStorage.setItem("token", state.token)
      }
      if (state.userId) {  // ← NOUVELLE LIGNE AJOUTÉE
        localStorage.setItem("userId", state.userId)
      }
      if (state.redirect) {
        router.push(state.redirect)
      }
    }
}, [state, router])

  const handleResendCode = async () => {
    setIsResending(true)
    try {
      const success = await resendEmailCode(email)
      if (success) {
        setTimeLeft(300) // Réinitialiser à 5 minutes
        setIsExpired(false)
        setCode(["", "", "", "", "", ""])
        // Focus sur le premier input
        inputRefs.current[0]?.focus()
      } else {
        alert("Échec de l'envoi du code. Veuillez réessayer.")
      }
    } catch (error) {
      console.error("Erreur lors du renvoi:", error)
      alert("Erreur lors du renvoi du code")
    } finally {
      setIsResending(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleDigitChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) value = value.slice(-1)
    if (!/^\d*$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input if digit entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Soumettre automatiquement quand le code est complet
    if (newCode.every(digit => digit !== "") && index === 5) {
      handleSubmit()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!code[index] && index > 0) {
        // Aller à l'input précédent si actuel est vide
        inputRefs.current[index - 1]?.focus()
      } else if (code[index]) {
        // Effacer la valeur actuelle
        const newCode = [...code]
        newCode[index] = ""
        setCode(newCode)
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    if (/^\d+$/.test(pastedData)) {
      const newCode = pastedData.split('').concat(Array(6 - pastedData.length).fill(''))
      setCode(newCode)
      // Focus sur le dernier input rempli
      const focusIndex = Math.min(pastedData.length, 5)
      inputRefs.current[focusIndex]?.focus()
    }
  }

  const handleSubmit = async () => {
    if (code.join("").length !== 6 || isExpired) return

    setIsVerifying(true)
    
    const formData = new FormData()
    formData.append("email", email)
    formData.append("code", code.join(""))

    try {
      await action(formData)
    } finally {
      setIsVerifying(false)
    }
  }

  // Afficher les messages d'erreur
  const showError = state && !state.success

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
        {/* Header with Icon */}
        <div className="flex flex-col items-center space-y-4">
          <div className="p-3 bg-[#1e40af] rounded-full">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">Vérification par e-mail</h1>
            <p className="text-sm text-gray-600">
              Entrez le code à 6 chiffres envoyé à 
              <br />
              <strong>{email}</strong>
            </p>
          </div>
        </div>

        {/* Message d'erreur */}
        {showError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{state.message}</p>
          </div>
        )}

        {/* Code Input Fields */}
        <form action={action}>
          <input type="hidden" name="email" value={email} />
          <div className="flex justify-center gap-2" onPaste={handlePaste}>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                name={`digit-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={isExpired || isVerifying || isPending}
                className="w-12 h-12 border-2 border-gray-300 rounded-lg text-center text-lg font-semibold focus:border-[#1e40af] focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
              />
            ))}
          </div>
        </form>

        {/* Verify Button */}
        <button
          onClick={handleSubmit}
          disabled={code.join("").length !== 6 || isExpired || isVerifying || isPending}
          className="w-full bg-[#1e40af] hover:bg-[#1e3a8a] disabled:bg-gray-300 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Shield className="w-4 h-4" />
          {isVerifying || isPending ? "Vérification..." : "Vérifier le code"}
        </button>

        {/* Expired/Timer Alert */}
        {isExpired ? (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">Le code a expiré. Veuillez demander un nouveau code.</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Renvoyer le code dans</span>
              <span className="font-semibold text-[#1e40af]">{formatTime(timeLeft)}</span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#1e40af] h-full transition-all duration-1000"
                style={{ width: `${(timeLeft / 300) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Resend Button */}
        <button
          onClick={handleResendCode}
          disabled={!isExpired && timeLeft > 0 || isResending}
          className="w-full border-2 border-[#1e40af] text-[#1e40af] hover:bg-[#1e40af] hover:text-white disabled:border-gray-300 disabled:text-gray-300 font-semibold py-2 rounded-lg transition-colors disabled:cursor-not-allowed"
        >
          {isResending ? "Envoi en cours..." : "Renvoyer le code"}
        </button>

        {/* Security Info Box */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-semibold text-[#1e40af] mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Conseils de sécurité
          </h3>
          <ul className="text-xs text-gray-700 space-y-1">
            <li>• Le code expire dans 5 minutes</li>
            <li>• Vérifiez votre boîte de réception et vos spams</li>
            <li>• Le code se soumet automatiquement quand les 6 chiffres sont saisis</li>
          </ul>
        </div>

        {/* Back to Login Link */}
        <button 
          onClick={() => router.back()}
          className="w-full text-sm text-[#1e40af] hover:text-[#1e3a8a] font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à la connexion
        </button>
      </div>
    </div>
  )
}