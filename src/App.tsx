import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AsciiInteractiveBackground } from './components/AsciiInteractiveBackground'
import { SiteLayout } from './components/SiteLayout'
import TargetCursor from './components/TargetCursor'
import { ROUTER_BASENAME } from './config/site'
import { ACCENT_THEMES } from './content/siteContent'
import { HomePage } from './pages/HomePage'
import { ProjectsPage } from './pages/ProjectsPage'

function App() {
  const [themeIndex, setThemeIndex] = useState(0)
  const accent = ACCENT_THEMES[themeIndex]

  return (
    <BrowserRouter basename={ROUTER_BASENAME}>
      <div className="app-shell">
        <AsciiInteractiveBackground />
        <TargetCursor
          spinDuration={2}
          hideDefaultCursor
          parallaxOn
          cursorColorOnTarget={accent}
        />
        <Routes>
          <Route
            element={
              <SiteLayout
                accent={accent}
                onCycleTheme={() => setThemeIndex((current) => (current + 1) % ACCENT_THEMES.length)}
              />
            }
          >
            <Route index element={<HomePage />} />
            <Route path="projects" element={<ProjectsPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
