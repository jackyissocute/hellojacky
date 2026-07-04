import { Outlet } from 'react-router-dom'
import { SiteHeader } from './SiteHeader'

type SiteLayoutProps = {
  accent: string
  onCycleTheme: () => void
}

export function SiteLayout({ accent, onCycleTheme }: SiteLayoutProps) {
  return (
    <main className="site-main" style={{ ['--color-accent' as string]: accent }}>
      <SiteHeader accent={accent} onCycleTheme={onCycleTheme} />
      <Outlet />
    </main>
  )
}
