import { Link } from 'react-router-dom'
import type { Project } from '../content/siteContent'
import { AccentFuzzyHeading } from './AccentFuzzyHeading'
import { AccentFuzzyText } from './AccentFuzzyText'

type ProjectListProps = {
  projects: Project[]
  variant: 'preview' | 'page'
  viewAllHref?: string
}

export function ProjectList({ projects, variant, viewAllHref }: ProjectListProps) {
  if (variant === 'page') {
    return (
      <div className="site-project-list site-project-list-page">
        {projects.map((project) => (
          <article key={project.name} className="site-project site-project-page">
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="site-project-link cursor-target"
            >
              <AccentFuzzyText
                as="h3"
                text={project.name}
                className="site-project-name site-project-name-fuzzy"
                fontSize="1.25rem"
                fontWeight={600}
              />
              <p className="site-project-description">{project.description}</p>
              <p className="site-project-stack">* {project.language}</p>
            </a>
          </article>
        ))}
      </div>
    )
  }

  return (
    <section className="site-projects">
      <div className="site-projects-header">
        <AccentFuzzyHeading text="projects" />
        {viewAllHref ? (
          <Link to={viewAllHref} className="site-view-all cursor-target">
            view all <span className="site-arrow">→</span>
          </Link>
        ) : null}
      </div>

      <div className="site-project-list">
        {projects.map((project) => (
          <article key={project.name} className="site-project">
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="site-project-link cursor-target"
            >
              <div className="site-project-title-row">
                <h3 className="site-project-name">{project.name}</h3>
                <p className="site-project-language">{project.language}</p>
              </div>
              <p className="site-project-description">{project.description}</p>
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
