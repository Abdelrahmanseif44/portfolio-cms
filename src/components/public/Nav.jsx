import { useState, useEffect } from 'react'

export default function Nav({ items, siteTitle, dark }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Hide Components from navigation
  const visible = items.filter(
    (i) =>
      i.enabled !== false &&
      i.target !== 'components'
  )

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
    <nav
      className={`fixed top-0 inset-x-0 z-40 border-b transition-colors duration-300 ${
        dark
          ? 'border-white/15 bg-transparent text-white'
          : 'border-line bg-paper/90 backdrop-blur text-ink'
      }`}
    >
      <div className="flex items-center justify-between px-5 md:px-8 h-14">

        {/* Logo / Website title */}
        <button
          onClick={() => goTo('home')}
          className="font-mono text-xs tracking-wide"
        >
          {siteTitle || 'UNTITLED'}
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6 font-mono text-xs">
          {visible.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => goTo(item.target)}
                className="opacity-90 hover:opacity-100 transition-opacity"
              >
                {item.number} · {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden font-mono text-xs border px-3 py-1.5"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <ul className="md:hidden flex flex-col border-t border-white/15 px-5 py-4 gap-4 font-mono text-sm bg-ink text-white">
          {visible.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => goTo(item.target)}
              >
                {item.number} · {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}