import ProjectCard from './ProjectCard'
import Reveal from '../shared/Reveal'

function PlaceholderCard({ index }) {
  const num = String(index + 1).padStart(2, '0')

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        border
        border-line
        bg-paper
        aspect-[4/3]
        flex
        flex-col
        justify-between
        p-5
        md:p-6
        transition-all
        duration-500
        hover:border-ink
      "
    >
      {/* Subtle hover background */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-ink/[0.015]
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-500
        "
      />

      {/* Top */}
      <div className="relative flex items-center justify-between">
        <span
          className="
            font-mono
            text-[10px]
            uppercase
            tracking-[0.18em]
            text-muted
          "
        >
          Project {num}
        </span>

        <span
          className="
            flex
            items-center
            gap-2
            font-mono
            text-[9px]
            uppercase
            tracking-[0.12em]
            text-muted
          "
        >
          <span className="w-1.5 h-1.5 rounded-full bg-ink/30 animate-pulse" />
          Empty
        </span>
      </div>

      {/* Center */}
      <div className="relative">
        <div className="w-12 h-px bg-line mb-5 group-hover:w-20 transition-all duration-500" />

        <h3
          className="
            font-display
            font-bold
            text-lg
            md:text-xl
            text-ink/30
            transition-colors
            duration-500
            group-hover:text-ink/50
          "
        >
          New project
        </h3>

        <p className="mt-2 text-sm text-muted/60 max-w-xs">
          Add a project from the admin dashboard.
        </p>
      </div>

      {/* Bottom */}
      <div
        className="
          relative
          flex
          items-center
          justify-between
          border-t
          border-line
          pt-4
        "
      >
        <span
          className="
            font-mono
            text-[9px]
            uppercase
            tracking-[0.15em]
            text-muted
          "
        >
          Coming soon
        </span>

        <span
          className="
            font-mono
            text-[10px]
            text-muted
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
        >
          →
        </span>
      </div>
    </div>
  )
}

function EmptyWorksState() {
  return (
    <div className="max-w-6xl mx-auto">
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-5
          md:gap-6
        "
      >
        {[0, 1, 2].map((i) => (
          <Reveal key={i} delay={i * 100}>
            <PlaceholderCard index={i} />
          </Reveal>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3 mt-10">
        <span className="w-8 h-px bg-line" />

        <p
          className="
            text-center
            text-muted
            font-mono
            text-[10px]
            uppercase
            tracking-[0.16em]
          "
        >
          Projects will appear here once added
        </p>

        <span className="w-8 h-px bg-line" />
      </div>
    </div>
  )
}

export default function Works({ projects = [], description }) {
  const visible = projects.filter(
    (p) => p.enabled !== false
  )

  return (
    <section
      id="works"
      className="
        relative
        px-5
        sm:px-6
        md:px-8
        py-20
        sm:py-24
        md:py-28
        overflow-hidden
      "
    >
      {/* Background typography */}
      <span
        className="
          pointer-events-none
          absolute
          top-10
          left-1/2
          -translate-x-1/2
          font-display
          font-black
          text-[20vw]
          leading-none
          text-ink/[0.025]
          select-none
          whitespace-nowrap
        "
      >
        WORKS
      </span>

      {/* Section number */}
      <p className="relative z-10 label-tag text-center mb-3">
        02
      </p>

      {/* Heading */}
      <h2
        className="
          relative
          z-10
          font-display
          font-extrabold
          text-3xl
          sm:text-4xl
          md:text-5xl
          text-center
          mb-5
        "
      >
        Works
      </h2>

      {/* Description */}
      {description && (
        <p
          className="
            relative
            z-10
            text-sm
            text-muted
            text-center
            leading-relaxed
            max-w-xl
            mx-auto
            mb-12
            md:mb-14
          "
        >
          {description}
        </p>
      )}

      {/* Projects */}
      {visible.length === 0 ? (
        <EmptyWorksState />
      ) : (
        <div
          className="
            relative
            z-10
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-5
            md:gap-6
            max-w-6xl
            mx-auto
          "
        >
          {visible.map((project, i) => (
            <Reveal
              key={project.id}
              delay={(i % 3) * 80}
            >
              <ProjectCard
                project={{
                  ...project,
                  total: visible.length,
                }}
                index={i}
              />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  )
}