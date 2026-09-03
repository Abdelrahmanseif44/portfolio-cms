import { useState } from 'react'
import { useOrderedCollection } from '../../hooks/useOrderedCollection'
import { addItem, updateItem, deleteItem, reorderItems } from '../../firebase/firestore'
import { useToast } from '../../context/ToastContext'
import SectionHeader from '../shared/SectionHeader'
import EmptyState from '../shared/EmptyState'
import ConfirmDialog from '../shared/ConfirmDialog'
import Loader from '../shared/Loader'

const SECTIONS = [
  { target: 'home', label: 'Home' },
  { target: 'works', label: 'Works' },
  { target: 'about', label: 'About me' },
  { target: 'contact', label: 'Contact' }
]

export default function NavigationEditor() {
  const { items, loading } = useOrderedCollection('navigation')
  const { push } = useToast()
  const [pendingDelete, setPendingDelete] = useState(null)

  async function handleAdd() {
    const used = items.map((i) => i.target)
    const next = SECTIONS.find((s) => !used.includes(s.target)) || SECTIONS[0]
    try {
      await addItem(
        'navigation',
        {
          label: next.label,
          target: next.target,
          number: String(items.length + 1).padStart(2, '0'),
          enabled: true,
        },
        items.length
      )
      push('Navigation item added.')
    } catch {
      push('Could not add navigation item.', 'error')
    }
  }

  async function handleField(id, field, value) {
    try {
      await updateItem('navigation', id, { [field]: value })
    } catch {
      push('Could not update item.', 'error')
    }
  }

  async function move(index, dir) {
    const target = index + dir
    if (target < 0 || target >= items.length) return
    const reordered = [...items]
    ;[reordered[index], reordered[target]] = [reordered[target], reordered[index]]
    try {
      await reorderItems('navigation', reordered.map((i) => i.id))
    } catch {
      push('Could not reorder items.', 'error')
    }
  }

  async function confirmDelete() {
    try {
      await deleteItem('navigation', pendingDelete.id)
      push('Navigation item removed.')
    } catch {
      push('Could not delete item.', 'error')
    } finally {
      setPendingDelete(null)
    }
  }

  if (loading) return <Loader />

  return (
    <div>
      <SectionHeader
        title="Navigation"
        description="Labels and order for the site's main navigation."
        action={
          <button className="btn-solid" onClick={handleAdd}>
            Add item
          </button>
        }
      />

      {items.length === 0 ? (
        <EmptyState title="No navigation items" description="The site will fall back to a default menu until you add items here." />
      ) : (
        <div className="flex flex-col divide-y divide-line border border-line">
          {items.map((item, i) => (
            <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex gap-1 shrink-0">
                <button className="btn-outline !px-2.5" onClick={() => move(i, -1)} aria-label="Move up" disabled={i === 0}>
                  ↑
                </button>
                <button className="btn-outline !px-2.5" onClick={() => move(i, 1)} aria-label="Move down" disabled={i === items.length - 1}>
                  ↓
                </button>
              </div>

              <input
                className="field !w-16 shrink-0"
                value={item.number || ''}
                onChange={(e) => handleField(item.id, 'number', e.target.value)}
              />
              <input
                className="field flex-1"
                value={item.label || ''}
                onChange={(e) => handleField(item.id, 'label', e.target.value)}
              />
              <select
                className="field sm:w-40 shrink-0"
                value={item.target}
                onChange={(e) => handleField(item.id, 'target', e.target.value)}
              >
                {SECTIONS.map((s) => (
                  <option key={s.target} value={s.target}>
                    {s.label}
                  </option>
                ))}
              </select>
              <label className="flex items-center gap-2 text-xs font-mono shrink-0">
                <input
                  type="checkbox"
                  checked={item.enabled !== false}
                  onChange={(e) => handleField(item.id, 'enabled', e.target.checked)}
                />
                Enabled
              </label>
              <button
                className="text-xs font-mono text-muted hover:text-ink shrink-0"
                onClick={() => setPendingDelete(item)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete navigation item?"
        description={pendingDelete ? `Remove "${pendingDelete.label}" from the menu.` : ''}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  )
}
