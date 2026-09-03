import { useState } from 'react'
import { useOrderedCollection } from '../../hooks/useOrderedCollection'
import { updateItem, deleteItem } from '../../firebase/firestore'
import { useToast } from '../../context/ToastContext'
import SectionHeader from '../shared/SectionHeader'
import EmptyState from '../shared/EmptyState'
import ConfirmDialog from '../shared/ConfirmDialog'
import Loader from '../shared/Loader'

export default function MessagesViewer() {
  const { items, loading } = useOrderedCollection('messages', 'createdAt', 'desc')
  const { push } = useToast()
  const [pendingDelete, setPendingDelete] = useState(null)

  async function markRead(msg) {
    if (msg.read) return
    try {
      await updateItem('messages', msg.id, { read: true })
    } catch {
      push('Could not update message.', 'error')
    }
  }

  async function confirmDelete() {
    try {
      await deleteItem('messages', pendingDelete.id)
      push('Message deleted.')
    } catch {
      push('Could not delete message.', 'error')
    } finally {
      setPendingDelete(null)
    }
  }

  if (loading) return <Loader />

  return (
    <div>
      <SectionHeader title="Contact Messages" description="Submissions from the site's contact form." />

      {items.length === 0 ? (
        <EmptyState title="No messages yet" description="Messages sent through the contact form will appear here." />
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((msg) => (
            <div
              key={msg.id}
              className={`border p-4 ${msg.read ? 'border-line' : 'border-ink'}`}
              onClick={() => markRead(msg)}
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <p className="font-medium text-sm">{msg.email}</p>
                <div className="flex items-center gap-3 shrink-0">
                  {!msg.read && <span className="label-tag">New</span>}
                  <button
                    className="text-xs font-mono text-muted hover:text-ink"
                    onClick={(e) => {
                      e.stopPropagation()
                      setPendingDelete(msg)
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {msg.subject && <p className="text-xs text-muted mb-1.5">{msg.subject}</p>}
              <p className="text-sm">{msg.message}</p>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete message?"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  )
}
