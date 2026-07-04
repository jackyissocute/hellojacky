export const ACCENT_THEMES = ['#f9a8d4', '#86efac', '#c084fc', '#93c5fd'] as const

export type Project = {
  name: string
  language: string
  description: string
  href: string
}

export const siteProfile = {
  name: 'jacky lin',
  avatarAlt: 'avatar',
  nav: [
    { label: '/home', href: '/' },
    { label: '/projects', href: '/projects' },
  ],
  social: [
    { label: 'github', href: 'https://github.com/jackyissocute', icon: 'github' as const },
    { label: 'email', href: 'mailto:jackyissocute@proton.me', icon: 'email' as const },
    { label: 'discord', href: 'https://discord.gg/qG2NhuAfUw', icon: 'discord' as const },
    { label: 'linkedin', href: 'https://www.linkedin.com/in/jackylinhelpsualot', icon: 'linkedin' as const },
    { label: 'x', href: 'https://x.com/jackyissocute', icon: 'x' as const },
  ],
  resumeHref: '/resume',
}

export const aboutContent = {
  paragraphs: [
    {
      lines: ["duke kunshan 27' undergrad"],
    },
    {
      lines: [
        'working in molecular bioscience, biophysics, medical physics 3D Modeling, and protein engineering',
      ],
    },
    {
      lines: ['now into vibe coding, solving real life problems.'],
    },
  ],
  footer: "'what i cannot create, i do not understand.'",
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
