import { useEffect, useState } from 'react'

export default function Nav({ items = [], siteTitle, dark }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  const visible = items.filter(
    (item) =>
      item.enabled !== false &&
      item.target !== 'components'
  )

  // Navbar scroll state
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Detect active section
  useEffect(() => {
    const sections = visible
      .map((item) => document.getElementById(item.target))
      .filter(Boolean)

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top -
              b.boundingClientRect.top
          )

        if (visibleSections.length > 0) {
          setActive(visibleSections[0].target.id)
        }
      },
      {
        root: null,
        rootMargin: '-25% 0px -60% 0px',
        threshold: 0,
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
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

    const element = document.getElementById(target)

    if (!element) return

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const lightNav = dark && !scrolled

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`
          fixed top-0 inset-x-0 z-50
          border-b
          transition-all duration-500 ease-out
          ${
            lightNav
              ? 'border-white/15 bg-transparent text-white'
              : 'border-line bg-paper/90 backdrop-blur-xl text-ink shadow-sm'
          }
          ${scrolled ? 'h-16' : 'h-14'}
        `}
      >
        <div className="flex items-center justify-between px-5 md:px-8 h-full">

          {/* LOGO */}
          <button
            onClick={() => goTo('home')}
            className="
              font-mono
              text-xs
              tracking-wide
              transition-all
              duration-300
              hover:opacity-60
            "
          >
            {siteTitle || 'UNTITLED'}
          </button>

          {/* DESKTOP NAV */}
          <ul className="hidden md:flex items-center gap-7 font-mono text-xs">
            {visible.map((item) => {
              const isActive = active === item.target

              return (
                <li key={item.id}>
                  <button
                    onClick={() => goTo(item.target)}
                    className={`
                      relative
                      py-2
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? 'opacity-100'
                          : 'opacity-45 hover:opacity-100'
                      }
                    `}
                  >
                    {item.number} · {item.label}

                    {/* ACTIVE LINE */}
                    <span
                      className={`
                        absolute
                        left-0
                        right-0
                        bottom-0
                        h-px
                        origin-left
                        transition-transform
                        duration-300
                        ${
                          isActive
                            ? 'scale-x-100'
                            : 'scale-x-0'
                        }
                        ${
                          lightNav
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

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label="Toggle navigation"
            className={`
              md:hidden
              font-mono
              text-xs
              border
              px-3
              py-2
              transition-all
              duration-300
              ${
                lightNav
                  ? 'border-white/40 text-white hover:bg-white hover:text-ink'
                  : 'border-line text-ink hover:bg-ink hover:text-white'
              }
            `}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`
          fixed
          inset-0
          z-40
          bg-ink
          text-white
          md:hidden
          transition-all
          duration-500
          ${
            open
              ? 'opacity-100 visible'
              : 'opacity-0 invisible pointer-events-none'
          }
        `}
      >
        <div className="h-full flex flex-col justify-center px-5">

          <p className="
            font-mono
            text-[10px]
            text-white/40
            tracking-[0.2em]
            uppercase
            mb-8
          ">
            Navigation
          </p>

          <ul className="flex flex-col">
            {visible.map((item, index) => {
              const isActive = active === item.target

              return (
                <li
                  key={item.id}
                  className={`
                    border-t
                    border-white/10
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
                      flex
                      items-center
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
                        transition-all
                        duration-300
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

                    <span className="
                      font-mono
                      text-xs
                      text-white/40
                    ">
                      {item.number}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="
            absolute
            bottom-8
            left-5
            right-5
            flex
            justify-between
            font-mono
            text-[10px]
            text-white/30
            uppercase
            tracking-wider
          ">
            <span>
              {siteTitle || 'Portfolio'}
            </span>

            <span>
              {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}