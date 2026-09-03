import { useEffect, useState } from 'react'
import { useSingleton } from '../../hooks/useSingleton'
import { setSingleton } from '../../firebase/firestore'
import { useToast } from '../../context/ToastContext'
import SectionHeader from '../shared/SectionHeader'
import Loader from '../shared/Loader'

const BLANK = { phone: '', email: '', location: '', buttonText: 'Send', enabled: true }

export default function ContactEditor() {
  const { data, loading } = useSingleton('contact')
  const { push } = useToast()
  const [form, setForm] = useState(BLANK)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (data) setForm({ ...BLANK, ...data })
  }, [data])

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    try {
      await setSingleton('contact', form)
      push('Contact section updated.')
    } catch {
      push('Could not save Contact section.', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div>
      <SectionHeader title="Contact" description="Contact details shown next to the message form." />
      <form onSubmit={handleSave} className="flex flex-col gap-5 max-w-md">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.enabled}
            onChange={(e) => setForm((f) => ({ ...f, enabled: e.target.checked }))}
          />
          Show Contact section
        </label>

        <div>
          <label className="label-tag block mb-1.5">Phone</label>
          <input
            className="field"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          />
        </div>
        <div>
          <label className="label-tag block mb-1.5">Email</label>
          <input
            type="email"
            className="field"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
        </div>
        <div>
          <label className="label-tag block mb-1.5">Location</label>
          <input
            className="field"
            value={form.location}
            onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
          />
        </div>
        <div>
          <label className="label-tag block mb-1.5">Form button text</label>
          <input
            className="field"
            value={form.buttonText}
            onChange={(e) => setForm((f) => ({ ...f, buttonText: e.target.value }))}
          />
        </div>

        <button type="submit" className="btn-solid self-start" disabled={saving}>
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </form>
    </div>
  )
}
