import { projectsContent } from '../content/siteContent'
import { ProjectList } from '../components/ProjectList'

export function ProjectsPage() {
  return (
    <div className="site-card site-body site-projects-page">
      <div className="site-body-scroll">
        <ProjectList projects={projectsContent.items} variant="page" />
      </div>
    </div>
  )
}
