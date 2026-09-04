import { useEffect, useState } from 'react'

export default function Hero({ hero }) {
  if (!hero || hero.enabled === false) return null

  const {
    greeting = 'Hello,',
    name = "I'm James Dean",
    image,
  } = hero

  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let ticking = false

    function handleMouseMove(e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2

      setMouse({ x, y })
    }

    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })

        ticking = true
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Keep parallax subtle
  const imageMoveX = mouse.x * -8
  const imageMoveY = mouse.y * -8

  const titleMoveX = mouse.x * 4
  const titleMoveY = mouse.y * 4 - Math.min(scrollY * 0.035, 30)

  const infoMove = mouse.x * 5

  return (
    <section
      id="home"
      className="
        relative
        min-h-[72svh]
        md:min-h-screen
        w-full
        flex
        items-end
        overflow-hidden
        bg-ink
      "
    >
      {/* Background Image */}
      {image?.url && (
        <img
          src={image.url}
          alt=""
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            grayscale
            contrast-125
            opacity-70
            scale-[1.04]
            transition-transform
            duration-700
            ease-out
            will-change-transform
          "
          style={{
            transform: `
              scale(1.04)
              translate(${imageMoveX}px, ${imageMoveY - scrollY * 0.015}px)
            `,
          }}
        />
      )}

      {/* Dark Gradient */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-ink
          via-ink/20
          to-transparent
        "
      />

      {/* Soft moving light */}
      <div
        className="
          pointer-events-none
          absolute
          w-64
          h-64
          rounded-full
          bg-white/[0.025]
          blur-3xl
          transition-transform
          duration-700
          ease-out
        "
        style={{
          left: `calc(50% + ${mouse.x * 120}px)`,
          top: `calc(45% + ${mouse.y * 80}px)`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Main Content */}
      <div
        className="
          relative
          z-10
          px-5
          md:px-8
          pb-12
          md:pb-24
          w-full
        "
      >
        {/* Small intro line */}
        <div
          className="
            mb-5
            md:mb-6
            flex
            items-center
            gap-3
            text-white/50
            font-mono
            text-[10px]
            uppercase
            tracking-[0.2em]
            transition-transform
            duration-500
            ease-out
          "
          style={{
            transform: `translateX(${infoMove}px)`,
          }}
        >
          <span className="w-8 h-px bg-white/40" />
          Front-End Developer
        </div>

        {/* Main Heading */}
        <h1
          className="
            font-display
            font-black
            text-white
            leading-[0.9]
            text-[13vw]
            sm:text-[12vw]
            md:text-[6.2vw]
            will-change-transform
            transition-transform
            duration-500
            ease-out
          "
          style={{
            transform: `
              translate(${titleMoveX}px, ${titleMoveY}px)
            `,
          }}
        >
          {greeting}
          <br />
          {name}
        </h1>

        {/* Bottom Information */}
        <div
          className="
            mt-7
            md:mt-8
            flex
            items-center
            justify-between
            text-white/40
            font-mono
            text-[9px]
            md:text-[10px]
            uppercase
            tracking-wider
          "
        >
          <span>Scroll to explore</span>

          <span className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Available for work
          </span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        type="button"
        onClick={() => {
          const works = document.getElementById('works')

          if (works) {
            works.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            })
          }
        }}
        aria-label="Scroll to works"
        className="
          absolute
          bottom-7
          left-1/2
          -translate-x-1/2
          hidden
          md:flex
          flex-col
          items-center
          gap-2
          text-white/40
          hover:text-white/80
          transition-colors
          duration-300
          cursor-pointer
          group
        "
      >
        <span
          className="
            font-mono
            text-[9px]
            tracking-[0.2em]
            uppercase
          "
        >
          Scroll
        </span>

        {/* Animated line + arrow */}
        <span className="relative flex flex-col items-center">
          <span
            className="
              block
              w-px
              h-9
              bg-white/20
              overflow-hidden
            "
          >
            <span
              className="
                block
                w-full
                h-1/2
                bg-white/70
                animate-[scrollLine_1.8s_ease-in-out_infinite]
              "
            />
          </span>

          <span
            className="
              w-2
              h-2
              border-r
              border-b
              border-white/60
              rotate-45
              -mt-1
              group-hover:border-white
              transition-colors
            "
          />
        </span>
      </button>

      {/* Mobile Scroll Arrow */}
      <button
        type="button"
        onClick={() => {
          const works = document.getElementById('works')

          if (works) {
            works.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            })
          }
        }}
        aria-label="Scroll to works"
        className="
          md:hidden
          absolute
          bottom-5
          left-1/2
          -translate-x-1/2
          text-white/50
          animate-bounce
        "
      >
        <span
          className="
            block
            w-3
            h-3
            border-r
            border-b
            border-white/60
            rotate-45
          "
        />
      </button>
    </section>
  )
}