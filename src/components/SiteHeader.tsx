import { Link, useLocation } from 'react-router-dom'
import { PUBLIC_ASSETS } from '../config/site'
import { repoAsset } from '../lib/repoAsset'
import { siteProfile } from '../content/siteContent'
import { SplitHeading } from './SplitHeading'
import {
  DiscordIcon,
  EmailIcon,
  GitHubIcon,
  LinkedInIcon,
  XIcon,
} from './icons/SocialIcons'

const socialIconMap = {
  github: GitHubIcon,
  email: EmailIcon,
  discord: DiscordIcon,
  linkedin: LinkedInIcon,
  x: XIcon,
} as const

function SocialLinks({
  size = 22,
  className,
}: {
  size?: number
  className?: string
}) {
  return (
    <>
      {siteProfile.social.map(({ label, href, icon }) => {
        const Icon = socialIconMap[icon]
        return (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`cursor-target ${className ?? ''}`.trim()}
            aria-label={label}
          >
            <Icon size={size} />
          </a>
        )
      })}
    </>
  )
}

type SiteHeaderProps = {
  accent: string
  onCycleTheme: () => void
}

function isNavActive(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/'
  }

  return pathname.startsWith(href)
}

export function SiteHeader({ accent, onCycleTheme }: SiteHeaderProps) {
  const { pathname } = useLocation()

  return (
    <header className="site-card site-header">
      <img
        alt={siteProfile.avatarAlt}
        className="site-avatar cursor-target"
        src={repoAsset(PUBLIC_ASSETS.profilePhoto)}
      />

      <div className="site-header-copy">
        <div className="site-name-wrap">
          <SplitHeading text={siteProfile.name} className="site-heading site-name" />
        </div>

        <nav className="site-nav" aria-label="Primary">
          {siteProfile.nav.map(({ label, href }) => {
            const active = isNavActive(pathname, href)

            return (
              <Link
                key={label}
                to={href}
                className={
                  active
                    ? 'site-nav-link site-nav-link-active cursor-target'
                    : 'site-nav-link cursor-target'
                }
              >
                {label}
              </Link>
            )
          })}
          <button
            type="button"
            className="site-theme-button cursor-target"
            aria-label="Cycle theme"
            onClick={onCycleTheme}
          >
            {accent}
          </button>
        </nav>
      </div>

      <div className="site-header-actions">
        <div className="site-social-grid">
          <SocialLinks className="site-social-link" />
        </div>
        <a
          href={siteProfile.resumeHref}
          target="_blank"
          rel="noopener noreferrer"
          className="site-resume-link cursor-target"
        >
          resume <span className="site-arrow">→</span>
        </a>
      </div>
    </header>
  )
}

export function MobileSocialLinks() {
  return (
    <div className="site-social-grid site-social-grid-mobile">
      <SocialLinks size={20} className="site-social-link site-social-link-accent" />
    </div>
  )
}
