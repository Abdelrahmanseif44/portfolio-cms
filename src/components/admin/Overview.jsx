import { Link } from 'react-router-dom'
import { useOrderedCollection } from '../../hooks/useOrderedCollection'
import SectionHeader from '../shared/SectionHeader'

export default function Overview() {
  const { items: projects } = useOrderedCollection('projects')
  const { items: messages } = useOrderedCollection('messages', 'createdAt', 'desc')

  const unread = messages.filter((m) => !m.read).length

  const stats = [
    { label: 'Published projects', value: projects.filter((p) => p.enabled !== false).length, to: '/admin/projects' },
    { label: 'Total projects', value: projects.length, to: '/admin/projects' },
    { label: 'Unread messages', value: unread, to: '/admin/messages' },
  ]

  return (
    <div>
      <SectionHeader
        title="Overview"
        description="A quick snapshot of your site content."
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            className="border border-line p-5 hover:border-ink transition-colors"
          >
            <p className="font-display font-black text-3xl">{s.value}</p>
            <p className="label-tag mt-1">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="border border-line p-6">
        <p className="font-display font-bold mb-2">Getting started</p>
        <ul className="text-sm text-muted space-y-1.5 list-disc pl-5">
          <li>Set your greeting, name and hero image under Hero</li>
          <li>Add projects under Works / Projects — drag to reorder</li>
          <li>Fill in About, Contact and Social Links</li>
          <li>Adjust site title, favicon and SEO copy under Site Settings</li>
          <li>Changes save straight to Firestore and appear on the live site immediately</li>
        </ul>
      </div>
    </div>
  )
}
