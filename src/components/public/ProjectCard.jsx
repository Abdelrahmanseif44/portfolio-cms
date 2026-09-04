
export default function ProjectCard({ project, index }) {
  const num = String(index + 1).padStart(2, '0')
  const total = String(project.total ?? '').padStart(2, '0')

  const hasLink = Boolean(project.url)

  const Wrapper = hasLink ? 'a' : 'div'

  const wrapperProps = hasLink
    ? {
        href: project.url,
        target: '_blank',
        rel: 'noreferrer',
      }
    : {}

  return (
    <Wrapper
      {...wrapperProps}
      className="
        group
        relative
        block
        overflow-hidden
        border
        border-line
        bg-paper
        transition-all
        duration-500
        hover:border-ink
        hover:-translate-y-1
        focus-visible:outline-none
      "
    >
      {/* IMAGE */}
      <div
        className="
          relative
          aspect-[4/3]
          overflow-hidden
          bg-mist
        "
      >
        {project.image?.url ? (
          <img
            src={project.image.url}
            alt={project.title || 'Project'}
            loading="lazy"
            className="
              w-full
              h-full
              object-cover
              grayscale
              transition-all
              duration-700
              ease-out
              group-hover:scale-[1.045]
              group-hover:grayscale-0
            "
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-mist">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
              No preview
            </span>
          </div>
        )}

        {/* DARK HOVER OVERLAY */}
        <div
          className="
            absolute
            inset-0
            bg-ink/0
            group-hover:bg-ink/35
            transition-colors
            duration-500
          "
        />

        {/* TOP PROJECT NUMBER */}
        <div
          className="
            absolute
            top-4
            left-4
            right-4
            flex
            items-center
            justify-between
            font-mono
            text-[9px]
            uppercase
            tracking-[0.16em]
            text-white
            opacity-0
            -translate-y-2
            group-hover:opacity-100
            group-hover:translate-y-0
            transition-all
            duration-500
          "
        >
          <span>
            {num}/{total || '00'}
          </span>

          {hasLink && (
            <span>
              View project
            </span>
          )}
        </div>

        {/* CENTER ARROW */}
        {hasLink && (
          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              pointer-events-none
            "
          >
            <span
              className="
                w-12
                h-12
                border
                border-white/70
                rounded-full
                flex
                items-center
                justify-center
                text-white
                text-lg
                opacity-0
                scale-75
                group-hover:opacity-100
                group-hover:scale-100
                transition-all
                duration-500
              "
            >
              ↗
            </span>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 md:p-6 flex flex-col gap-3">

        {/* META */}
        <div className="flex items-center justify-between gap-4">
          <p className="label-tag">
            {num}/{total || '00'}
          </p>

          {project.category && (
            <span
              className="
                font-mono
                text-[9px]
                uppercase
                tracking-[0.12em]
                text-muted
                text-right
              "
            >
              {project.category}
            </span>
          )}
        </div>

        {/* TITLE */}
        <h3
          className="
            font-display
            font-bold
            text-lg
            md:text-xl
            leading-tight
            transition-transform
            duration-500
            group-hover:translate-x-1
          "
        >
          {project.title}
        </h3>

        {/* DESCRIPTION */}
        {project.description && (
          <p
            className="
              text-sm
              text-muted
              leading-relaxed
              line-clamp-3
            "
          >
            {project.description}
          </p>
        )}

        {/* BOTTOM */}
        <div
          className="
            pt-3
            mt-1
            border-t
            border-line
            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              font-mono
              text-[10px]
              uppercase
              tracking-[0.14em]
              text-muted
            "
          >
            {project.buttonText || 'Discover'}
          </span>

          <span
            className="
              font-mono
              text-sm
              transition-all
              duration-500
              group-hover:translate-x-1
              group-hover:-translate-y-1
            "
          >
            →
          </span>
        </div>
      </div>

      {/* BOTTOM ACCENT LINE */}
      <span
        className="
          absolute
          bottom-0
          left-0
          h-px
          w-0
          bg-ink
          group-hover:w-full
          transition-all
          duration-700
          ease-out
        "
      />
    </Wrapper>
  )
}