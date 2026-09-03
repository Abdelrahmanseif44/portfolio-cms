import { useEffect, useState } from 'react'
import ImageUpload from '../shared/ImageUpload'

const BLANK = {
  title: '',
  description: '',
  buttonText: 'Discover',
  url: '',
  image: null,
  enabled: true,
}

export default function ProjectEditForm({ open, project, onSave, onCancel, saving }) {
  const [form, setForm] = useState(BLANK)

  useEffect(() => {
    setForm(project ? { ...BLANK, ...project } : BLANK)
  }, [project, open])

  if (!open) return null

  function handleSubmit(e) {
    e.preventDefault()
    onSave(form)
  }

  return (
    <div className="fixed inset-0 z-[90] bg-ink/60 flex items-center justify-center p-5 overflow-y-auto" onClick={onCancel}>
      <form
        onSubmit={handleSubmit}
        className="bg-paper border border-ink max-w-lg w-full p-6 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-display font-bold text-lg mb-5">
          {project ? 'Edit project' : 'New project'}
        </p>

        <div className="flex flex-col gap-4">
          <ImageUpload
            label="Project image"
            folder="projects"
            value={form.image}
            onChange={(image) => setForm((f) => ({ ...f, image }))}
            aspect="aspect-[4/3]"
          />

          <div>
            <label className="label-tag block mb-1.5">Title</label>
            <input
              required
              className="field"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />
          </div>

          <div>
            <label className="label-tag block mb-1.5">Description</label>
            <textarea
              rows={3}
              className="field resize-none"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label-tag block mb-1.5">Button text</label>
              <input
                className="field"
                value={form.buttonText}
                onChange={(e) => setForm((f) => ({ ...f, buttonText: e.target.value }))}
              />
            </div>
            <div>
              <label className="label-tag block mb-1.5">Project URL</label>
              <input
                type="url"
                className="field"
                placeholder="https://…"
                value={form.url}
                onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.enabled}
              onChange={(e) => setForm((f) => ({ ...f, enabled: e.target.checked }))}
            />
            Published (visible on site)
          </label>
        </div>

        <div className="flex gap-3 justify-end mt-6">
          <button type="button" className="btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-solid" disabled={saving}>
            {saving ? 'Saving…' : 'Save project'}
          </button>
        </div>
      </form>
    </div>
  )
}
