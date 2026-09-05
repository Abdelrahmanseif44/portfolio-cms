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
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true)
    }, 100)

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

    window.addEventListener('mousemove', handleMouseMove, {
      passive: true,
    })

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const imageMoveX = mouse.x * -24
  const imageMoveY = mouse.y * -24

  const titleMoveX = mouse.x * 14
  const titleMoveY =
    mouse.y * 12 - Math.min(scrollY * 0.06, 55)

  const infoMoveX = mouse.x * 18

  const lightX = mouse.x * 220
  const lightY = mouse.y * 150

  const rotateX = mouse.y * -3
  const rotateY = mouse.x * 4

  const scrollOpacity = Math.max(
    0,
    1 - scrollY / 500
  )

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
        perspective-[1200px]
      "
    >
      {image?.url && (
        <div
          className="
            absolute
            inset-[-35px]
            overflow-hidden
            will-change-transform
          "
          style={{
            transform: `
              translate3d(${imageMoveX}px, ${imageMoveY}px, 0)
              rotateX(${rotateX}deg)
              rotateY(${rotateY}deg)
              scale(1.08)
            `,
            transition:
              'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
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
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-ink/10
              animate-[heroZoom_10s_ease-in-out_infinite_alternate]
            "
          />
        </div>
      )}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-ink
          via-ink/25
          to-transparent
          pointer-events-none
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          w-[420px]
          h-[420px]
          rounded-full
          bg-white/[0.045]
          blur-[100px]
          mix-blend-screen
          will-change-transform
        "
        style={{
          left: `calc(50% + ${lightX}px)`,
          top: `calc(45% + ${lightY}px)`,
          transform: 'translate(-50%, -50%)',
          transition:
            'left 0.7s cubic-bezier(0.22, 1, 0.36, 1), top 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />

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
        <div
          className={`
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
            transition-all
            duration-1000
            ease-out
            ${
              loaded
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-10'
            }
          `}
          style={{
            transform: `translateX(${infoMoveX}px)`,
          }}
        >
          <span className="w-8 h-px bg-white/40" />

          <span className="relative">
            Front-End Developer

            <span
              className="
                absolute
                left-0
                -bottom-2
                h-px
                w-full
                bg-white/30
                origin-left
                animate-[heroLine_2s_ease-out_0.8s_both]
              "
            />
          </span>
        </div>

        <h1
          className={`
            font-display
            font-black
            text-white
            leading-[0.9]
            text-[13vw]
            sm:text-[12vw]
            md:text-[6.2vw]
            will-change-transform
            transition-all
            duration-[1200ms]
            ease-[cubic-bezier(0.16,1,0.3,1)]
            ${
              loaded
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-16'
            }
          `}
          style={{
            transform: `
              translate3d(${titleMoveX}px, ${titleMoveY}px, 0)
            `,
          }}
        >
          <span className="inline-block">
            {greeting}
          </span>

          <br />

          <span
            className="
              inline-block
              animate-[heroTextFloat_5s_ease-in-out_infinite]
            "
          >
            {name}
          </span>
        </h1>

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
            transition-opacity
            duration-500
          "
          style={{
            opacity: scrollOpacity,
          }}
        >
          <span>
            Scroll to explore
          </span>

          <span className="flex items-center gap-2">
            <span
              className="
                inline-block
                w-1.5
                h-1.5
                rounded-full
                bg-white
                animate-[heroPulse_1.4s_ease-in-out_infinite]
              "
            />

            Available for work
          </span>
        </div>
      </div>

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
          hover:text-white
          transition-all
          duration-300
          cursor-pointer
          group
        "
        style={{
          opacity: scrollOpacity,
        }}
      >
        <span
          className="
            font-mono
            text-[9px]
            tracking-[0.2em]
            uppercase
            animate-[heroScrollText_2s_ease-in-out_infinite]
          "
        >
          Scroll
        </span>

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
                bg-white/80
                animate-[scrollLine_1.3s_ease-in-out_infinite]
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
              group-hover:translate-y-1
              transition-all
              duration-300
            "
          />
        </span>
      </button>

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