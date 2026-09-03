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
    function handleMouseMove(e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2

      setMouse({ x, y })
    }

    function handleScroll() {
      setScrollY(window.scrollY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full flex items-end overflow-hidden bg-ink"
    >
      {/* Background Image */}
      {image?.url && (
        <img
          src={image.url}
          alt=""
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-70 transition-transform duration-700 ease-out"
          style={{
            transform: `
              scale(1.05)
              translate(${mouse.x * -12}px, ${mouse.y * -12}px)
            `,
          }}
        />
      )}

      {/* Dark Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

      {/* Mouse Glow */}
      <div
        className="pointer-events-none absolute w-80 h-80 rounded-full bg-white/[0.035] blur-3xl transition-transform duration-300"
        style={{
          left: `calc(50% + ${mouse.x * 250}px)`,
          top: `calc(50% + ${mouse.y * 180}px)`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Small top label */}
      <div
        className="absolute top-24 left-5 md:left-8 text-white/50 font-mono text-[10px] tracking-[0.2em] uppercase"
        style={{
          transform: `translateY(${scrollY * 0.15}px)`,
        }}
      >
        Portfolio / 2026
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-5 md:px-8 pb-16 md:pb-24 w-full">
        <div
          className="mb-6 flex items-center gap-3 text-white/50 font-mono text-[10px] uppercase tracking-[0.2em]"
          style={{
            transform: `translateX(${mouse.x * 8}px)`,
          }}
        >
          <span className="w-8 h-px bg-white/40" />
          Front-End Developer
        </div>

        <h1
          className="font-display font-black text-white leading-[0.9] text-[13vw] md:text-[6.2vw] transition-transform duration-500 ease-out"
          style={{
            transform: `
              translate(
                ${mouse.x * 6}px,
                ${mouse.y * 6 - scrollY * 0.05}px
              )
            `,
          }}
        >
          {greeting}
          <br />
          {name}
        </h1>

        {/* Bottom info */}
        <div className="mt-8 flex items-center justify-between text-white/40 font-mono text-[10px] uppercase tracking-wider">
          <span>Scroll to explore</span>

          <span className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Available for work
          </span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/40">
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase">
          Scroll
        </span>

        <div className="w-px h-10 bg-white/20 overflow-hidden">
          <div className="w-full h-1/2 bg-white animate-bounce" />
        </div>
      </div>
    </section>
  )
}