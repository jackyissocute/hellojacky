export const ACCENT_THEMES = ['#f9a8d4', '#86efac', '#c084fc', '#93c5fd'] as const

export type Project = {
  name: string
  language: string
  description: string
  href: string
}

export const siteProfile = {
  name: 'darshan paccha',
  avatarAlt: 'avatar',
  nav: [
    { label: '/home', href: '/' },
    { label: '/projects', href: '/projects' },
  ],
  social: [
    { label: 'github', href: 'https://github.com/d1rshan', icon: 'github' as const },
    { label: 'email', href: 'mailto:darshan.paccha@gmail.com', icon: 'email' as const },
    { label: 'discord', href: 'https://discord.gg/22rFFr8n', icon: 'discord' as const },
    { label: 'linkedin', href: 'https://www.linkedin.com/in/darshan-paccha/', icon: 'linkedin' as const },
    { label: 'x', href: 'https://x.com/d1rshan', icon: 'x' as const },
  ],
  resumeHref: '/resume',
}

export const aboutContent = {
  paragraphs: [
    {
      lines: [
        '19 y/o cs undergrad',
        'i build things i wish existed, and they often end up being useful to other people too.',
      ],
    },
    {
      lines: [
        'i work across the stack: web, mobile, and the occasional clis/tuis.',
        'most of what i make ends up open source.',
      ],
    },
    {
      lines: ['into linux, ricing my setup, and understanding how things work past the surface.'],
    },
  ],
  footer: 'open to work <3',
}

export const projectsContent = {
  viewAllHref: '/projects',
  homePreviewCount: 4,
  items: [
    {
      name: 'tsuki',
      language: 'typescript',
      description: 'just another anime and manga tracker with an insanely good UI',
      href: 'https://github.com/d1rshan/tsuki',
    },
    {
      name: 'decktype',
      language: 'typescript',
      description: 'a monkeytype-inspired typing games platform with competitive multiplayer',
      href: 'https://github.com/d1rshan/decktype',
    },
    {
      name: 'ghstats-cli',
      language: 'python',
      description:
        'a cli to display your github contributions heatmap, streaks, and activity over the past year',
      href: 'https://github.com/d1rshan/ghstats-cli',
    },
    {
      name: 'tmplockr',
      language: 'typescript',
      description: 'a temporary file and note sharing platform with a clean, modern UI and custom auth',
      href: 'https://github.com/d1rshan/tmplockr',
    },
    {
      name: 'vitify',
      language: 'dart',
      description: 'a flutter app for university students to track academics and stay on top of college life',
      href: 'https://github.com/d1rshan/vitify',
    },
    {
      name: 'taskflow',
      language: 'typescript',
      description:
        'a visual workflow automation engine to chain apis, transform data, and build automations visually',
      href: 'https://github.com/d1rshan/taskflow',
    },
  ] satisfies Project[],
}
