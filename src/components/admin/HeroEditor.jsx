import { useEffect, useState } from 'react'
import { useSingleton } from '../../hooks/useSingleton'
import { setSingleton } from '../../firebase/firestore'
import { useToast } from '../../context/ToastContext'
import SectionHeader from '../shared/SectionHeader'
import Loader from '../shared/Loader'

export default function HeroEditor() {
  const { data, loading } = useSingleton('hero')
  const { push } = useToast()

  const [form, setForm] = useState({
    greeting: '',
    name: '',
    image: '',
    enabled: true,
  })

  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (data) {
      setForm({
        greeting: data.greeting || '',
        name: data.name || '',
        image: data.image || '',
        enabled: data.enabled !== false,
      })
    }
  }, [data])

  // Choose image from device
  function handleImageChange(e) {
    const file = e.target.files?.[0]

    if (!file) return

    // Only allow images
    if (!file.type.startsWith('image/')) {
      push('Please select an image file.', 'error')
      return
    }

    // Limit image size to 700 KB
    if (file.size > 700 * 1024) {
      push('Image must be smaller than 700 KB.', 'error')
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      setForm((f) => ({
        ...f,
        image: reader.result,
      }))
    }

    reader.readAsDataURL(file)
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)

    try {
      await setSingleton('hero', form)
      push('Hero section updated.')
    } catch (error) {
      console.error(error)
      push('Could not save hero section.', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div>
      <SectionHeader
        title="Hero"
        description="The full-width opening section of the site."
      />

      <form
        onSubmit={handleSave}
        className="flex flex-col gap-6 max-w-md"
      >

        {/* Enable Hero */}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.enabled}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                enabled: e.target.checked,
              }))
            }
          />

          Show hero section
        </label>

        {/* Greeting */}
        <div>
          <label className="label-tag block mb-1.5">
            Greeting
          </label>

          <input
            className="field"
            value={form.greeting}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                greeting: e.target.value,
              }))
            }
            placeholder="Hello, I'm"
          />
        </div>

        {/* Name */}
        <div>
          <label className="label-tag block mb-1.5">
            Name line
          </label>

          <input
            className="field"
            value={form.name}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                name: e.target.value,
              }))
            }
            placeholder="Abdelrahman Seif"
          />
        </div>

        {/* Image */}
        <div>
          <label className="label-tag block mb-1.5">
            Hero Image
          </label>

          <label
            htmlFor="hero-image"
            className="btn-solid inline-block cursor-pointer"
          >
            Choose Image
          </label>

          <input
            id="hero-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          <p className="text-xs opacity-60 mt-2">
            Choose an image from your computer. Maximum size: 700 KB.
          </p>

          {/* Preview */}
          {form.image && (
            <div className="mt-4">
              <img
                src={form.image}
                alt="Hero preview"
                className="w-full aspect-video object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Save */}
        <button
          type="submit"
          className="btn-solid self-start"
          disabled={saving}
        >
          {saving ? 'Saving…' : 'Save changes'}
        </button>

      </form>
    </div>
  )
}