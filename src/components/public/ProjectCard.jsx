export default function ProjectCard({ project, index }) {
  const num = String(index + 1).padStart(3, '0')
  const total = String(project.total ?? '').padStart(3, '0')

  const Wrapper = project.url ? 'a' : 'div'
  const wrapperProps = project.url
    ? { href: project.url, target: '_blank', rel: 'noreferrer' }
    : {}

  return (
    <Wrapper
      {...wrapperProps}
      className="group border border-line flex flex-col overflow-hidden bg-paper"
    >
      <div className="aspect-[4/3] overflow-hidden bg-mist">
        {project.image?.url && (
          <img
            src={project.image.url}
            alt=""
            className="w-full h-full object-cover grayscale transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <p className="label-tag">
          {num}/{total || '00'}
        </p>
        <h3 className="font-display font-bold text-lg leading-tight">{project.title}</h3>
        <p className="text-sm text-muted flex-1">{project.description}</p>
        <span className="btn-outline self-start mt-1">{project.buttonText || 'Discover'}</span>
      </div>
    </Wrapper>
  )
}
