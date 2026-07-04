import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

type FuzzyBurstContextValue = {
  burstSignal: number
  accent: string
}

const FuzzyBurstContext = createContext<FuzzyBurstContextValue | null>(null)

type FuzzyBurstProviderProps = {
  accent: string
  themeSignal: number
  children: ReactNode
}

export function FuzzyBurstProvider({ accent, themeSignal, children }: FuzzyBurstProviderProps) {
  const { pathname } = useLocation()
  const [burstSignal, setBurstSignal] = useState(0)
  const isInitialMount = useRef(true)
  const previousPathname = useRef(pathname)
  const previousThemeSignal = useRef(themeSignal)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      previousPathname.current = pathname
      previousThemeSignal.current = themeSignal
      return
    }

    if (
      previousPathname.current !== pathname ||
      previousThemeSignal.current !== themeSignal
    ) {
      previousPathname.current = pathname
      previousThemeSignal.current = themeSignal
      setBurstSignal((current) => current + 1)
    }
  }, [pathname, themeSignal])

  return (
    <FuzzyBurstContext.Provider value={{ burstSignal, accent }}>
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
