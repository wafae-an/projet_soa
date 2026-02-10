"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import StepOne from "./steps/step-one"
import StepTwo from "./steps/step-two"
import StepThree from "./steps/step-three"
import StepFour from "./steps/step-four"
import StepIndicator from "./step-indicator"

export default function BusAssignmentWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [cityId, setCityId] = useState<string>()
  const [lineId, setLineId] = useState<string>()
  const [driverId, setDriverId] = useState<string>()

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleReset = () => {
    setCurrentStep(1)
    setCityId(undefined)
    setLineId(undefined)
    setDriverId(undefined)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Assignation des Bus</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Gérez l'assignation des bus aux conducteurs via ce wizard interactif
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} />

        {/* Step Content */}
        <Card className="p-8 shadow-lg mb-6">
          {currentStep === 1 && <StepOne cityId={cityId} onCitySelect={setCityId} />}
          {currentStep === 2 && <StepTwo cityId={cityId} lineId={lineId} onLineSelect={setLineId} />}
          {currentStep === 3 && (
            <StepThree cityId={cityId} lineId={lineId} driverId={driverId} onDriverSelect={setDriverId} />
          )}
          {currentStep === 4 && (
            <StepFour cityId={cityId} lineId={lineId} driverId={driverId} onComplete={handleReset} />
          )}
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <Button onClick={handlePrevious} disabled={currentStep === 1} variant="outline">
            ← Précédent
          </Button>

          <div className="text-sm text-slate-600 dark:text-slate-400">Étape {currentStep} sur 4</div>

          <Button
            onClick={handleNext}
            disabled={currentStep === 4 || !isStepValid(currentStep, { cityId, lineId, driverId })}
            className="bg-[#1e40af] hover:bg-blue-700 text-white"
          >
            Suivant →
          </Button>
        </div>
      </div>
    </div>
  )
}

function isStepValid(step: number, state: { cityId?: string; lineId?: string; driverId?: string }): boolean {
  switch (step) {
    case 1:
      return !!state.cityId
    case 2:
      return !!state.lineId
    case 3:
      return !!state.driverId
    default:
      return true
  }
}
