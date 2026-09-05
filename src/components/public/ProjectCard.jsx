import { useRef, useState } from 'react'

export default function ProjectCard({ project, index }) {
  const num = String(index + 1).padStart(2, '0')
  const total = String(project.total ?? '').padStart(2, '0')

  const hasLink = Boolean(project.url)

  const Wrapper = hasLink ? 'a' : 'div'

  const cardRef = useRef(null)

  const [tilt, setTilt] = useState({
    x: 0,
    y: 0,
  })

  const [spot, setSpot] = useState({
    x: 50,
    y: 50,
  })

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()

    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    const rotateY = (x - 0.5) * 10
    const rotateX = (y - 0.5) * -10

    setTilt({
      x: rotateX,
      y: rotateY,
    })

    setSpot({
      x: x * 100,
      y: y * 100,
    })
  }

  const handleMouseLeave = () => {
    setTilt({
      x: 0,
      y: 0,
    })

    setSpot({
      x: 50,
      y: 50,
    })
  }

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
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
        project-card
        group
        relative
        block
        overflow-hidden
        border
        border-line
        bg-paper
        focus-visible:outline-none
      "
      style={{
        transform: `
          perspective(1200px)
          rotateX(${tilt.x}deg)
          rotateY(${tilt.y}deg)
          translateZ(0)
        `,
        transition:
          tilt.x === 0 && tilt.y === 0
            ? 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
            : 'transform 0.12s ease-out',
        '--mouse-x': `${spot.x}%`,
        '--mouse-y': `${spot.y}%`,
      }}
    >
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-20
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-500
        "
        style={{
          background: `
            radial-gradient(
              circle 180px at ${spot.x}% ${spot.y}%,
              rgba(255,255,255,0.12),
              transparent 70%
            )
          `,
        }}
      />

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
              group-hover:scale-[1.07]
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
            -translate-y-3
            group-hover:opacity-100
            group-hover:translate-y-0
            transition-all
            duration-500
            z-10
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

        {hasLink && (
          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              pointer-events-none
              z-10
            "
          >
            <span
              className="
                w-14
                h-14
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
                rotate-[-20deg]
                group-hover:opacity-100
                group-hover:scale-100
                group-hover:rotate-0
                transition-all
                duration-700
                ease-out
              "
            >
              ↗
            </span>
          </div>
        )}

        <div
          className="
            absolute
            bottom-4
            left-4
            right-4
            flex
            items-center
            justify-between
            text-white
            opacity-0
            translate-y-3
            group-hover:opacity-100
            group-hover:translate-y-0
            transition-all
            duration-500
            z-10
          "
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.14em]">
            {project.category || 'Project'}
          </span>

          <span className="font-mono text-[9px] uppercase tracking-[0.14em]">
            {hasLink ? 'Open ↗' : 'View'}
          </span>
        </div>
      </div>

      <div className="relative z-10 p-5 md:p-6 flex flex-col gap-3">
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

        <h3
          className="
            font-display
            font-bold
            text-lg
            md:text-xl
            leading-tight
            transition-all
            duration-500
            ease-out
            group-hover:translate-x-1
          "
        >
          {project.title}
        </h3>

        {project.description && (
          <p
            className="
              text-sm
              text-muted
              leading-relaxed
              line-clamp-3
              transition-all
              duration-500
              group-hover:text-ink/70
            "
          >
            {project.description}
          </p>
        )}

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
              transition-colors
              duration-300
              group-hover:text-ink
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
              ease-out
              group-hover:translate-x-2
              group-hover:-translate-y-1
            "
          >
            →
          </span>
        </div>
      </div>

      <span
        className="
          absolute
          bottom-0
          left-0
          h-[2px]
          w-0
          bg-ink
          group-hover:w-full
          transition-all
          duration-700
          ease-out
          z-30
        "
      />

      <span
        className="
          absolute
          top-0
          left-0
          h-px
          w-0
          bg-ink
          group-hover:w-full
          transition-all
          duration-700
          ease-out
          z-30
        "
      />
    </Wrapper>
  )
}