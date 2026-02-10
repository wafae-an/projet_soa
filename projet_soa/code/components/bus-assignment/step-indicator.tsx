import { Check } from "lucide-react"

interface StepIndicatorProps {
  currentStep: number
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = ["Ville", "Ligne", "Conducteur", "Bus"]

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep

          return (
            <div key={step} className="flex items-center flex-1">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold
                  transition-all duration-200
                  ${
                    isCompleted
                      ? "bg-green-600 text-white"
                      : isCurrent
                        ? "bg-[#1e40af] text-white ring-4 ring-blue-200 dark:ring-blue-900"
                        : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                  }
                `}
              >
                {isCompleted ? <Check size={20} /> : stepNumber}
              </div>
              <div className="ml-3">
                <p
                  className={`text-sm font-medium ${isCurrent ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400"}`}
                >
                  {step}
                </p>
              </div>

              {stepNumber < steps.length && (
                <div
                  className={`flex-1 h-1 mx-4 rounded-full ${
                    isCompleted ? "bg-green-600" : "bg-slate-200 dark:bg-slate-700"
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
