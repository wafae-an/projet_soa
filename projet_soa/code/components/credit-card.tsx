"use client"

import { useMemo } from "react"

interface CreditCardProps {
  cardNumber: string
  cardHolder: string
  expiryDate: string
  cvv: string
  cardType: "visa" | "mastercard" | "amex" | "discover" | "diners" | "jcb"
  isFlipped: boolean
}

const cardTypeConfig = {
  visa: {
    gradient: "from-blue-600 via-blue-500 to-cyan-400",
    chipColor: "from-yellow-400 to-yellow-600",
    logo: (
      <svg className="w-14 h-9" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="4" y="24" fontSize="16" fontWeight="bold" fill="white" fontFamily="Arial" letterSpacing="2">
          VISA
        </text>
      </svg>
    ),
  },
  mastercard: {
    gradient: "from-red-500 via-orange-500 to-yellow-400",
    chipColor: "from-amber-400 to-amber-600",
    logo: (
      <div className="flex gap-1.5">
        <div className="w-6 h-6 rounded-full bg-red-500" />
        <div className="w-6 h-6 rounded-full bg-orange-500 -ml-2" />
      </div>
    ),
  },
  amex: {
    gradient: "from-indigo-600 via-indigo-500 to-blue-400",
    chipColor: "from-green-400 to-green-600",
    logo: (
      <svg className="w-14 h-9" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="2" y="24" fontSize="14" fontWeight="bold" fill="white" fontFamily="Arial" letterSpacing="1">
          AMEX
        </text>
      </svg>
    ),
  },
  discover: {
    gradient: "from-orange-600 via-yellow-500 to-orange-400",
    chipColor: "from-red-400 to-red-600",
    logo: (
      <div className="flex flex-col items-end">
        <div className="w-10 h-6 rounded-full border-2 border-white" />
      </div>
    ),
  },
  diners: {
    gradient: "from-slate-700 via-slate-600 to-blue-600",
    chipColor: "from-slate-300 to-slate-500",
    logo: (
      <div className="flex gap-1">
        <div className="w-5 h-5 rounded border border-white" />
        <div className="w-5 h-5 rounded border border-white" />
      </div>
    ),
  },
  jcb: {
    gradient: "from-blue-700 via-indigo-600 to-red-600",
    chipColor: "from-purple-400 to-purple-600",
    logo: (
      <svg className="w-12 h-8" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="6" y="24" fontSize="12" fontWeight="bold" fill="white" fontFamily="Arial" letterSpacing="1">
          JCB
        </text>
      </svg>
    ),
  },
}

export default function CreditCard({ cardNumber, cardHolder, expiryDate, cvv, cardType, isFlipped }: CreditCardProps) {
  const displayCardNumber = useMemo(() => {
    const cleaned = cardNumber.replace(/\s/g, "")
    let formatted = ""
    for (let i = 0; i < cleaned.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += " "
      formatted += cleaned[i]
    }
    return formatted.padEnd(19, "•")
  }, [cardNumber])

  const config = cardTypeConfig[cardType] || cardTypeConfig.visa

  return (
    <div
      className="w-full max-w-sm h-64 transition-transform duration-500 ease-out"
      style={{
        perspective: "1000px",
      }}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front side */}
        <div
          className={`absolute w-full h-full bg-gradient-to-br ${config.gradient} rounded-3xl p-7 shadow-2xl border border-white/20 flex flex-col justify-between`}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Top section with chip and logo */}
          <div className="flex items-start justify-between">
            <div className={`bg-gradient-to-br ${config.chipColor} rounded-xl p-2.5 shadow-lg w-14 h-11`}>
              <div className="w-full h-full rounded-sm bg-gradient-to-br from-yellow-300/20 to-transparent" />
            </div>
            <div className="opacity-90">{config.logo}</div>
          </div>

          {/* Card number */}
          <div className="space-y-2">
            <p className="text-xs text-white/70 font-semibold tracking-wider uppercase">Numéro de carte</p>
            <p className="text-2xl font-mono text-white tracking-widest font-bold leading-none drop-shadow-md">
              {displayCardNumber}
            </p>
          </div>

          {/* Bottom section */}
          <div className="flex items-end justify-between">
            <div className="flex-1">
              <p className="text-xs text-white/70 font-semibold mb-1">Titulaire</p>
              <p className="text-base font-medium text-white uppercase tracking-wider drop-shadow-sm max-w-48 truncate">
                {cardHolder || "NOM COMPLET"}
              </p>
            </div>
            <div className="flex items-end gap-8">
              <div className="text-right">
                <p className="text-xs text-white/70 font-semibold mb-1">Valide jusqu&apos;au</p>
                <p className="text-base font-mono text-white font-bold drop-shadow-sm">{expiryDate || "MM/YY"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Back side */}
        <div
          className={`absolute w-full h-full bg-gradient-to-br ${config.gradient} rounded-3xl p-7 shadow-2xl border border-white/20 flex flex-col justify-center items-end`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="w-full h-14 bg-black/30 mb-6 rounded-sm" />
          <div className="w-32 bg-white/95 rounded-lg p-3 shadow-lg">
            <p className="text-xs text-gray-700 font-semibold mb-2">Code de sécurité</p>
            <p className="text-lg font-mono text-gray-900 font-bold tracking-wider">{cvv || "•••"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
