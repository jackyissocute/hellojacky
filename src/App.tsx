import { useCallback, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AsciiInteractiveBackground } from './components/AsciiInteractiveBackground'
import { LoadingScreen } from './components/LoadingScreen'
import { LongPressHint } from './components/LongPressHint'
import { SiteLayout } from './components/SiteLayout'
import TargetCursor from './components/TargetCursor'
import { ROUTER_BASENAME } from './config/site'
import { FuzzyBurstProvider } from './context/FuzzyBurstContext'
import { ACCENT_THEMES } from './content/siteContent'
import { preloadCriticalAssets } from './lib/preloadAssets'
import { HomePage } from './pages/HomePage'
import { ProjectsPage } from './pages/ProjectsPage'

function App() {
  const [themeIndex, setThemeIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [assetsReady, setAssetsReady] = useState(false)
  const [bootComplete, setBootComplete] = useState(false)
  const [reveal, setReveal] = useState(false)
  const [showBoot, setShowBoot] = useState(true)

  const accent = ACCENT_THEMES[themeIndex]
  // Mount shell under boot once assets decoded so ASCII/canvas can warm up
  const shellMounted = assetsReady

  useEffect(() => {
    document.documentElement.classList.add('is-booting')
    let cancelled = false

    preloadCriticalAssets(({ progress: p }) => {
      if (cancelled) return
      flushSync(() => setProgress(p))
    }).then(() => {
      if (!cancelled) setAssetsReady(true)
    })

    return () => {
      cancelled = true
    }
  }, [])

  // Crossfade after shell has a moment to paint under the boot overlay
  useEffect(() => {
    if (!shellMounted || !bootComplete) return
    const warm = window.setTimeout(() => {
      setReveal(true)
    }, 200)
    return () => window.clearTimeout(warm)
  }, [shellMounted, bootComplete])

  useEffect(() => {
    if (showBoot) return
    document.documentElement.classList.remove('is-booting')
  }, [showBoot])

  const handleBootComplete = useCallback(() => {
    setBootComplete(true)
  }, [])

  const handleBootExited = useCallback(() => {
    setShowBoot(false)
  }, [])

  const handleCycleTheme = () => {
    flushSync(() => {
      setThemeIndex((current) => (current + 1) % ACCENT_THEMES.length)
    })
  }

  return (
    <>
      {shellMounted && (
        <BrowserRouter basename={ROUTER_BASENAME}>
          <FuzzyBurstProvider accent={accent}>
            <div
              className={`app-shell${
                reveal ? ' app-shell--ready' : ' app-shell--entering'
              }`}
            >
              <AsciiInteractiveBackground />
              <Routes>
                <Route
                  element={
                    <SiteLayout
                      accent={accent}
                      onCycleTheme={handleCycleTheme}
                    />
                  }
                >
                  <Route index element={<HomePage />} />
                  <Route path="projects" element={<ProjectsPage />} />
                </Route>
              </Routes>
              {reveal && <LongPressHint />}
              {reveal && (
                <TargetCursor
                  spinDuration={2}
                  hideDefaultCursor
                  parallaxOn
                  cursorColorOnTarget={accent}
                />
              )}
            </div>
          </FuzzyBurstProvider>
        </BrowserRouter>
      )}
      {showBoot && (
        <LoadingScreen
          progress={progress}
          assetsReady={assetsReady}
          exiting={reveal}
          onBootComplete={handleBootComplete}
          onExited={handleBootExited}
        />
      )}
    </>
  )
}

export default App
