import { NavLink } from 'react-router-dom'
import { logout } from '../../firebase/auth'
import { useNavigate } from 'react-router-dom'

const LINKS = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/hero', label: 'Hero' },
  { to: '/admin/navigation', label: 'Navigation' },
  { to: '/admin/projects', label: 'Works / Projects' },
  { to: '/admin/about', label: 'About' },
  { to: '/admin/contact', label: 'Contact' },
  { to: '/admin/social', label: 'Social Links' },
  { to: '/admin/settings', label: 'Site Settings' },
  { to: '/admin/messages', label: 'Contact Messages' },
]

export default function Sidebar({ onNavigate }) {
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <aside className="w-full md:w-56 shrink-0 border-r border-line md:min-h-screen bg-paper">
      <div className="px-5 py-5 border-b border-line">
        <p className="label-tag">Admin</p>
        <p className="font-display font-bold text-sm mt-0.5">Dashboard</p>
      </div>
      <nav className="flex flex-col py-2">
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `px-5 py-2.5 text-sm font-mono border-l-2 transition-colors ${
                isActive
                  ? 'border-ink bg-mist font-medium'
                  : 'border-transparent text-muted hover:text-ink'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="px-5 py-4 mt-2 border-t border-line">
        <a href="/" target="_blank" rel="noreferrer" className="block text-xs font-mono text-muted mb-3 hover:text-ink">
          View site
        </a>
        <button onClick={handleLogout} className="btn-outline w-full justify-center">
          Sign out
        </button>
      </div>
    </aside>
  )
}
