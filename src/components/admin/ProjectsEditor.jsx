import { useState } from 'react'
import { useOrderedCollection } from '../../hooks/useOrderedCollection'
import { addItem, updateItem, deleteItem, reorderItems } from '../../firebase/firestore'
import { deleteImage } from '../../firebase/storage'
import { useToast } from '../../context/ToastContext'
import SectionHeader from '../shared/SectionHeader'
import EmptyState from '../shared/EmptyState'
import ConfirmDialog from '../shared/ConfirmDialog'
import ProjectEditForm from './ProjectEditForm'
import Loader from '../shared/Loader'

export default function ProjectsEditor() {
  const { items, loading } = useOrderedCollection('projects')
  const { push } = useToast()
  const [editing, setEditing] = useState(null) // project object, or {} for new
  const [saving, setSaving] = useState(false)
  const [pendingDelete, setPendingDelete] = useState(null)

  async function handleSave(form) {
    setSaving(true)
    try {
      if (editing?.id) {
        await updateItem('projects', editing.id, form)
        push('Project updated.')
      } else {
        await addItem('projects', form, items.length)
        push('Project added.')
      }
      setEditing(null)
    } catch {
      push('Could not save project.', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function confirmDelete() {
    try {
      await deleteItem('projects', pendingDelete.id)
      if (pendingDelete.image?.path) await deleteImage(pendingDelete.image.path)
      push('Project deleted.')
    } catch {
      push('Could not delete project.', 'error')
    } finally {
      setPendingDelete(null)
    }
  }

  async function toggleEnabled(project) {
    try {
      await updateItem('projects', project.id, { enabled: project.enabled === false })
    } catch {
      push('Could not update project.', 'error')
    }
  }

  async function move(index, dir) {
    const target = index + dir
    if (target < 0 || target >= items.length) return
    const reordered = [...items]
    ;[reordered[index], reordered[target]] = [reordered[target], reordered[index]]
    try {
      await reorderItems('projects', reordered.map((i) => i.id))
    } catch {
      push('Could not reorder projects.', 'error')
    }
  }

  if (loading) return <Loader />

  return (
    <div>
      <SectionHeader
        title="Works / Projects"
        description="Add, edit, reorder and publish projects shown in the Works grid."
        action={
          <button className="btn-solid" onClick={() => setEditing({})}>
            Add project
          </button>
        }
      />

      {items.length === 0 ? (
        <EmptyState
          title="No projects yet"
          description="Add your first project to populate the Works section."
          action={
            <button className="btn-solid" onClick={() => setEditing({})}>
              Add project
            </button>
          }
        />
      ) : (
        <div className="flex flex-col divide-y divide-line border border-line">
          {items.map((project, i) => (
            <div key={project.id} className="p-4 flex items-center gap-4">
              <div className="flex gap-1 shrink-0">
                <button className="btn-outline !px-2.5" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">
                  ↑
                </button>
                <button className="btn-outline !px-2.5" onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Move down">
                  ↓
                </button>
              </div>

              <div className="w-14 h-14 bg-mist shrink-0 overflow-hidden">
                {project.image?.url && (
                  <img src={project.image.url} alt="" className="w-full h-full object-cover" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{project.title || 'Untitled project'}</p>
                <p className="text-xs text-muted truncate">{project.description}</p>
              </div>

              <label className="flex items-center gap-2 text-xs font-mono shrink-0">
                <input
                  type="checkbox"
                  checked={project.enabled !== false}
                  onChange={() => toggleEnabled(project)}
                />
                Published
              </label>

              <button className="text-xs font-mono shrink-0 hover:underline" onClick={() => setEditing(project)}>
                Edit
              </button>
              <button
                className="text-xs font-mono text-muted hover:text-ink shrink-0"
                onClick={() => setPendingDelete(project)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <ProjectEditForm
        open={!!editing}
        project={editing?.id ? editing : null}
        onSave={handleSave}
        onCancel={() => setEditing(null)}
        saving={saving}
      />

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete project?"
        description={pendingDelete ? `"${pendingDelete.title}" will be permanently removed.` : ''}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  )
}
