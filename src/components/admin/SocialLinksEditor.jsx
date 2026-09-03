import { useState } from 'react'
import { useOrderedCollection } from '../../hooks/useOrderedCollection'
import { addItem, updateItem, deleteItem, reorderItems } from '../../firebase/firestore'
import { useToast } from '../../context/ToastContext'
import SectionHeader from '../shared/SectionHeader'
import EmptyState from '../shared/EmptyState'
import ConfirmDialog from '../shared/ConfirmDialog'
import Loader from '../shared/Loader'

const PLATFORMS = ['twitter', 'facebook', 'instagram', 'linkedin', 'github', 'dribbble']

export default function SocialLinksEditor() {
  const { items, loading } = useOrderedCollection('socialLinks')
  const { push } = useToast()
  const [pendingDelete, setPendingDelete] = useState(null)

  async function handleAdd() {
    try {
      await addItem('socialLinks', { platform: 'instagram', url: '', visible: true }, items.length)
      push('Social link added.')
    } catch {
      push('Could not add social link.', 'error')
    }
  }

  async function handleField(id, field, value) {
    try {
      await updateItem('socialLinks', id, { [field]: value })
    } catch {
      push('Could not update link.', 'error')
    }
  }

  async function move(index, dir) {
    const target = index + dir
    if (target < 0 || target >= items.length) return
    const reordered = [...items]
    ;[reordered[index], reordered[target]] = [reordered[target], reordered[index]]
    try {
      await reorderItems('socialLinks', reordered.map((i) => i.id))
    } catch {
      push('Could not reorder links.', 'error')
    }
  }

  async function confirmDelete() {
    try {
      await deleteItem('socialLinks', pendingDelete.id)
      push('Social link removed.')
    } catch {
      push('Could not delete link.', 'error')
    } finally {
      setPendingDelete(null)
    }
  }

  if (loading) return <Loader />

  return (
    <div>
      <SectionHeader
        title="Social Links"
        description="Links shown in the Contact section."
        action={
          <button className="btn-solid" onClick={handleAdd}>
            Add link
          </button>
        }
      />

      {items.length === 0 ? (
        <EmptyState title="No social links yet" description="Add a platform and URL to show it on the site." />
      ) : (
        <div className="flex flex-col divide-y divide-line border border-line">
          {items.map((item, i) => (
            <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex gap-1 shrink-0">
                <button className="btn-outline !px-2.5" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">
                  ↑
                </button>
                <button className="btn-outline !px-2.5" onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Move down">
                  ↓
                </button>
              </div>
              <select
                className="field sm:w-36 shrink-0"
                value={item.platform}
                onChange={(e) => handleField(item.id, 'platform', e.target.value)}
              >
                {PLATFORMS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <input
                className="field flex-1"
                placeholder="https://…"
                value={item.url || ''}
                onChange={(e) => handleField(item.id, 'url', e.target.value)}
              />
              <label className="flex items-center gap-2 text-xs font-mono shrink-0">
                <input
                  type="checkbox"
                  checked={item.visible !== false}
                  onChange={(e) => handleField(item.id, 'visible', e.target.checked)}
                />
                Visible
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
        title="Delete social link?"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  )
}
