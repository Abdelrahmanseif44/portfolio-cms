import { useEffect, useState } from 'react'
import { useSingleton } from '../../hooks/useSingleton'
import { setSingleton } from '../../firebase/firestore'
import { useToast } from '../../context/ToastContext'
import SectionHeader from '../shared/SectionHeader'
import ImageUpload from '../shared/ImageUpload'
import Loader from '../shared/Loader'

const BLANK = {
  title: '',
  footerText: '',
  metaTitle: '',
  metaDescription: '',
  worksDescription: '',
  favicon: null,
}

export default function SiteSettingsEditor() {
  const { data, loading } = useSingleton('settings')
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
      await setSingleton('settings', form)
      push('Site settings updated.')
    } catch {
      push('Could not save site settings.', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div>
      <SectionHeader title="Site Settings" description="Global site title, favicon, footer and SEO copy." />
      <form onSubmit={handleSave} className="flex flex-col gap-5 max-w-md">
        <div>
          <label className="label-tag block mb-1.5">Website title</label>
          <input
            className="field"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="UNTITLED"
          />
        </div>

        <ImageUpload
          label="Favicon"
          folder="settings"
          value={form.favicon}
          onChange={(favicon) => setForm((f) => ({ ...f, favicon }))}
          aspect="aspect-square !max-w-24"
        />

        <div>
          <label className="label-tag block mb-1.5">Footer text</label>
          <input
            className="field"
            value={form.footerText}
            onChange={(e) => setForm((f) => ({ ...f, footerText: e.target.value }))}
            placeholder="Website created with…"
          />
        </div>

        <div>
          <label className="label-tag block mb-1.5">Works section description</label>
          <textarea
            rows={2}
            className="field resize-none"
            value={form.worksDescription}
            onChange={(e) => setForm((f) => ({ ...f, worksDescription: e.target.value }))}
          />
        </div>

        <div className="hairline pt-5">
          <label className="label-tag block mb-1.5">SEO meta description</label>
          <textarea
            rows={2}
            className="field resize-none"
            value={form.metaDescription}
            onChange={(e) => setForm((f) => ({ ...f, metaDescription: e.target.value }))}
          />
        </div>

        <button type="submit" className="btn-solid self-start" disabled={saving}>
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </form>
    </div>
  )
}
