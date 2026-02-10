"use client"

import type React from "react"

import { useState } from "react"
import { Lock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface PaymentFormProps {
  cardData: {
    cardNumber: string
    cardHolder: string
    expiryDate: string
    cvv: string
    cardType: "visa" | "mastercard" | "amex" | "discover" | "diners" | "jcb"
  }
  setCardData: (data: any) => void
  isFlipped: boolean
  setIsFlipped: (flipped: boolean) => void
}

export default function PaymentForm({ cardData, setCardData, isFlipped, setIsFlipped }: PaymentFormProps) {
  const [submitted, setSubmitted] = useState(false)

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "")
    const maxLength = cardData.cardType === "amex" ? 15 : 16
    return cleaned.slice(0, maxLength)
  }

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    if (cleaned.length <= 2) return cleaned
    return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4)
  }

  const formatCVV = (value: string) => {
    const maxLength = cardData.cardType === "amex" ? 4 : 3
    return value.replace(/\D/g, "").slice(0, maxLength)
  }

  const detectCardType = (number: string) => {
    const cleaned = number.replace(/\s/g, "")
    if (/^4/.test(cleaned)) return "visa"
    if (/^5[1-5]/.test(cleaned)) return "mastercard"
    if (/^3[47]/.test(cleaned)) return "amex"
    if (/^6(?:011|5)/.test(cleaned)) return "discover"
    if (/^3(?:0[0-5]|[68])/.test(cleaned)) return "diners"
    if (/^(?:2131|1800|35\d{3})/.test(cleaned)) return "jcb"
    return "visa"
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    const cardType = detectCardType(formatted)
    setCardData({
      ...cardData,
      cardNumber: formatted,
      cardType,
    })
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value)
    setCardData({ ...cardData, expiryDate: formatted })
  }

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCVV(e.target.value)
    setCardData({ ...cardData, cvv: formatted })
  }

  const handleCVVFocus = () => {
    setIsFlipped(true)
  }

  const handleCVVBlur = () => {
    setIsFlipped(false)
  }

  const expectedCardLength = cardData.cardType === "amex" ? 15 : 16
  const expectedCVVLength = cardData.cardType === "amex" ? 4 : 3

  const isFormValid =
    cardData.cardNumber.length === expectedCardLength &&
    cardData.cardHolder.length > 0 &&
    cardData.expiryDate.length === 5 &&
    cardData.cvv.length === expectedCVVLength

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isFormValid) {
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  const testCards: Record<string, string> = {
    visa: "4532 1234 5678 9010",
    mastercard: "5425 2334 3010 9903",
    amex: "374245455400126",
    discover: "6011 1111 1111 1117",
    diners: "3782 822463 10005",
    jcb: "3566 0020 2920 0505",
  }

  return (
    <div className="bg-card rounded-2xl shadow-xl p-8 border border-border/50 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card Number */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Numéro de carte</label>
          <Input
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardData.cardNumber}
            onChange={handleCardNumberChange}
            maxLength={16}
            className="font-mono text-lg tracking-widest bg-input border-border/60 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all rounded-lg"
          />
        </div>

        {/* Cardholder Name */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Titulaire de la carte</label>
          <Input
            type="text"
            placeholder="Jean Dupont"
            value={cardData.cardHolder}
            onChange={(e) => setCardData({ ...cardData, cardHolder: e.target.value.toUpperCase() })}
            maxLength={26}
            className="bg-input border-border/60 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all rounded-lg"
          />
        </div>

        {/* Expiry and CVV Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Date d&apos;expiration</label>
            <Input
              type="text"
              placeholder="MM/YY"
              value={cardData.expiryDate}
              onChange={handleExpiryChange}
              maxLength={5}
              className="font-mono text-lg tracking-widest bg-input border-border/60 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">CVV</label>
            <Input
              type="text"
              placeholder="123"
              value={cardData.cvv}
              onChange={handleCVVChange}
              onFocus={handleCVVFocus}
              onBlur={handleCVVBlur}
              maxLength={4}
              className="font-mono text-lg tracking-widest bg-input border-border/60 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all rounded-lg"
            />
          </div>
        </div>

       

      </form>

      {/* Test Cards Info */}
      <div className="mt-6 pt-6 border-t border-border/30">
        
        <p className="text-xs text-muted-foreground mb-3">
          Acceptons les cartes Visa, Mastercard et autres cartes bancaires marocaines internationales
        </p>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(testCards).map(([type, number]) => (
            <div
              key={type}
              className="text-xs bg-muted/50 rounded p-2 cursor-pointer hover:bg-muted transition-colors"
              onClick={() => {
                setCardData({
                  ...cardData,
                  cardNumber: number.replace(/\s/g, ""),
                  cardType: type,
                })
              }}
            >
              <p className="font-mono text-foreground/80">{number}</p>
              <p className="text-muted-foreground capitalize">{type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
