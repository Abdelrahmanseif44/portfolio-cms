import ProjectCard from './ProjectCard'
import EmptyState from '../shared/EmptyState'
import Reveal from '../shared/Reveal'

export default function Works({ projects, description }) {
  const visible = projects.filter((p) => p.enabled !== false)

  return (
    <section id="works" className="px-5 md:px-8 py-20 md:py-28">
      <p className="label-tag text-center mb-3">02</p>
      <h2 className="font-display font-extrabold text-3xl md:text-4xl text-center mb-6">
        Works
      </h2>
      {description && (
        <p className="text-sm text-muted text-center max-w-xl mx-auto mb-14">
          {description}
        </p>
      )}

      {visible.length === 0 ? (
        <EmptyState
          title="No projects yet"
          description="Projects added from the admin dashboard will appear here."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {visible.map((project, i) => (
            <Reveal key={project.id} delay={(i % 3) * 80}>
              <ProjectCard
                project={{ ...project, total: visible.length }}
                index={i}
              />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  )
}
