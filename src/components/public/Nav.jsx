import { useEffect, useState } from 'react'

export default function Nav({ items, siteTitle, dark }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  // Hide Components from navigation
  const visible = items.filter(
    (i) =>
      i.enabled !== false &&
      i.target !== 'components'
  )

  // Detect scroll
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40)

      const sections = visible
        .map((item) => document.getElementById(item.target))
        .filter(Boolean)

      let current = 'home'

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()

        if (rect.top <= window.innerHeight * 0.35) {
          current = section.id
        }
      })

      setActive(current)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [items])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  function goTo(target) {
    setOpen(false)

    const el = document.getElementById(target)

    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <>
      <nav
        className={`
          fixed top-0 inset-x-0 z-50
          border-b
          transition-all duration-500
          ${
            dark && !scrolled
              ? 'border-white/15 bg-transparent text-white'
              : 'border-line bg-paper/90 backdrop-blur-xl text-ink shadow-sm'
          }
          ${
            scrolled
              ? 'h-16'
              : 'h-14'
          }
        `}
      >
        <div className="flex items-center justify-between px-5 md:px-8 h-full">

          {/* Logo */}
          <button
            onClick={() => goTo('home')}
            className="
              group
              font-mono text-xs tracking-wide
              transition-opacity duration-300
              hover:opacity-60
            "
          >
            <span>{siteTitle || 'UNTITLED'}</span>
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-7 font-mono text-xs">
            {visible.map((item) => {
              const isActive = active === item.target

              return (
                <li key={item.id}>
                  <button
                    onClick={() => goTo(item.target)}
                    className={`
                      relative py-2
                      transition-all duration-300
                      ${
                        isActive
                          ? 'opacity-100'
                          : 'opacity-50 hover:opacity-100'
                      }
                    `}
                  >
                    {item.number} · {item.label}

                    {/* Active underline */}
                    <span
                      className={`
                        absolute
                        left-0 right-0 bottom-0
                        h-px
                        transition-transform duration-300 origin-left
                        ${
                          isActive
                            ? 'scale-x-100'
                            : 'scale-x-0'
                        }
                        ${
                          dark && !scrolled
                            ? 'bg-white'
                            : 'bg-ink'
                        }
                      `}
                    />
                  </button>
                </li>
              )
            })}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className={`
              md:hidden
              font-mono text-xs
              border
              px-3 py-2
              transition-all duration-300
              ${
                dark && !scrolled
                  ? 'border-white/40 text-white hover:bg-white hover:text-ink'
                  : 'border-line text-ink hover:bg-ink hover:text-white'
              }
            `}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div
        className={`
          fixed inset-0 z-40
          bg-ink text-white
          md:hidden
          transition-all duration-500
          ${
            open
              ? 'opacity-100 visible'
              : 'opacity-0 invisible pointer-events-none'
          }
        `}
      >
        <div className="h-full flex flex-col justify-center px-5">

          <p className="font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase mb-8">
            Navigation
          </p>

          <ul className="flex flex-col">
            {visible.map((item, index) => {
              const isActive = active === item.target

              return (
                <li
                  key={item.id}
                  className={`
                    border-t border-white/10
                    ${
                      index === visible.length - 1
                        ? 'border-b'
                        : ''
                    }
                  `}
                >
                  <button
                    onClick={() => goTo(item.target)}
                    className="
                      w-full
                      flex items-center
                      justify-between
                      py-5
                      text-left
                      group
                    "
                  >
                    <span
                      className={`
                        font-display
                        text-4xl
                        font-bold
                        transition-transform duration-300
                        group-hover:translate-x-2
                        ${
                          isActive
                            ? 'text-white'
                            : 'text-white/50 group-hover:text-white'
                        }
                      `}
                    >
                      {item.label}
                    </span>

                    <span className="font-mono text-xs text-white/40">
                      {item.number}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="absolute bottom-8 left-5 right-5 flex justify-between font-mono text-[10px] text-white/30 uppercase tracking-wider">
            <span>{siteTitle || 'Portfolio'}</span>
            <span>2026</span>
          </div>
        </div>
      </div>
    </>
  )
}