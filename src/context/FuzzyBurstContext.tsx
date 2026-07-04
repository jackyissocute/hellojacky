import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react'

type FuzzyBurstContextValue = {
  burstSignal: number
  accent: string
  triggerBurst: () => void
}

const FuzzyBurstContext = createContext<FuzzyBurstContextValue | null>(null)

type FuzzyBurstProviderProps = {
  accent: string
  children: ReactNode
}

export function FuzzyBurstProvider({ accent, children }: FuzzyBurstProviderProps) {
  const [burstSignal, setBurstSignal] = useState(0)

  const triggerBurst = useCallback(() => {
    setBurstSignal((current) => current + 1)
  }, [])

  return (
    <FuzzyBurstContext.Provider value={{ burstSignal, accent, triggerBurst }}>
      {children}
    </FuzzyBurstContext.Provider>
  )
}

export function useFuzzyBurst() {
  const context = useContext(FuzzyBurstContext)
  if (!context) {
    throw new Error('useFuzzyBurst must be used within FuzzyBurstProvider')
  }
  return context
}
