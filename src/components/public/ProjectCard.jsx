export default function ProjectCard({ project, index }) {
  const num = String(index + 1).padStart(3, '0')
  const total = String(project.total ?? '').padStart(3, '0')

  const Wrapper = project.url ? 'a' : 'div'

  const wrapperProps = project.url
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
        group relative flex flex-col overflow-hidden
        border border-line bg-paper
        transition-all duration-500 ease-out
        hover:-translate-y-2
        hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]
      "
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">

        {project.image?.url ? (
          <img
            src={project.image.url}
            alt={project.title || ''}
            className="
              w-full h-full object-cover grayscale
              transition-all duration-700 ease-out
              group-hover:scale-110
              group-hover:grayscale-0
            "
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="label-tag opacity-40">
              No image
            </span>
          </div>
        )}

        {/* Dark overlay */}
        <div
          className="
            absolute inset-0 bg-ink/0
            transition-all duration-500
            group-hover:bg-ink/20
          "
        />

        {/* Project number */}
        <div
          className="
            absolute top-4 left-4
            font-mono text-xs text-white
            opacity-0 translate-y-2
            transition-all duration-500
            group-hover:opacity-100
            group-hover:translate-y-0
          "
        >
          {num} / {total || '00'}
        </div>

        {/* Arrow */}
        <div
          className="
            absolute top-4 right-4
            w-10 h-10
            border border-white
            flex items-center justify-center
            text-white text-lg
            opacity-0 scale-75
            transition-all duration-500
            group-hover:opacity-100
            group-hover:scale-100
          "
        >
          ↗
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">

        {/* Number */}
        <p
          className="
            label-tag
            transition-transform duration-300
            group-hover:translate-x-1
          "
        >
          {num}/{total || '00'}
        </p>

        {/* Title */}
        <h3
          className="
            font-display font-bold text-lg leading-tight
            transition-transform duration-300
            group-hover:translate-x-1
          "
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted flex-1">
          {project.description}
        </p>

        {/* Button */}
        <div className="mt-1">
          <span
            className="
              btn-outline inline-flex items-center gap-3
              transition-all duration-300
              group-hover:bg-ink
              group-hover:text-white
            "
          >
            {project.buttonText || 'Discover'}

            <span
              className="
                transition-transform duration-300
                group-hover:translate-x-1
              "
            >
              →
            </span>
          </span>
        </div>

      </div>
    </Wrapper>
  )
}