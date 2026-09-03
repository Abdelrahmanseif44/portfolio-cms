import { useEffect, useState } from 'react'
import { useSingleton } from '../../hooks/useSingleton'
import { setSingleton } from '../../firebase/firestore'
import { useToast } from '../../context/ToastContext'
import SectionHeader from '../shared/SectionHeader'
import Loader from '../shared/Loader'

const BLANK = {
  heading: '',
  paragraphs: [],
  image: '',
  enabled: true,
}

export default function AboutEditor() {
  const { data, loading } = useSingleton('about')
  const { push } = useToast()

  const [form, setForm] = useState(BLANK)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (data) {
      setForm({
        ...BLANK,
        ...data,
        paragraphs: data.paragraphs || [],
        image:
          typeof data.image === 'string'
            ? data.image
            : data.image?.url || '',
      })
    }
  }, [data])

  function updateParagraph(index, field, value) {
    setForm((f) => {
      const paragraphs = [...f.paragraphs]
      paragraphs[index] = {
        ...paragraphs[index],
        [field]: value,
      }

      return {
        ...f,
        paragraphs,
      }
    })
  }

  function addParagraph() {
    setForm((f) => ({
      ...f,
      paragraphs: [
        ...f.paragraphs,
        {
          subheading: '',
          text: '',
        },
      ],
    }))
  }

  function removeParagraph(index) {
    setForm((f) => ({
      ...f,
      paragraphs: f.paragraphs.filter((_, i) => i !== index),
    }))
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      push('Please select an image file.', 'error')
      return
    }

    // Firestore document size limit
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
      await setSingleton('about', form)
      push('About section updated.')
    } catch (error) {
      console.error(error)
      push('Could not save About section.', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div>
      <SectionHeader
        title="About"
        description="Section title, portrait and body copy."
      />

      <form
        onSubmit={handleSave}
        className="flex flex-col gap-6 max-w-lg"
      >

        {/* Enable About */}
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

          Show About section
        </label>

        {/* Profile Image */}
        <div>
          <label className="label-tag block mb-1.5">
            Profile image
          </label>

          <label
            htmlFor="about-image"
            className="btn-solid inline-block cursor-pointer"
          >
            Choose Image
          </label>

          <input
            id="about-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          <p className="text-xs opacity-60 mt-2">
            Choose an image from your computer. Maximum size: 700 KB.
          </p>

          {form.image && (
            <img
              src={form.image}
              alt="Profile preview"
              className="mt-4 w-full aspect-[4/5] object-cover rounded-lg"
            />
          )}
        </div>

        {/* Heading */}
        <div>
          <label className="label-tag block mb-1.5">
            Main heading
          </label>

          <input
            className="field"
            value={form.heading}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                heading: e.target.value,
              }))
            }
          />
        </div>

        {/* Paragraphs */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="label-tag">
              Paragraphs
            </label>

            <button
              type="button"
              className="text-xs font-mono hover:underline"
              onClick={addParagraph}
            >
              + Add paragraph
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {form.paragraphs.map((p, i) => (
              <div
                key={i}
                className="border border-line p-4"
              >
                <input
                  className="field mb-2"
                  placeholder="Subheading (optional)"
                  value={p.subheading || ''}
                  onChange={(e) =>
                    updateParagraph(
                      i,
                      'subheading',
                      e.target.value
                    )
                  }
                />

                <textarea
                  rows={3}
                  className="field resize-none mb-2"
                  placeholder="Paragraph text"
                  value={p.text || ''}
                  onChange={(e) =>
                    updateParagraph(
                      i,
                      'text',
                      e.target.value
                    )
                  }
                />

                <button
                  type="button"
                  className="text-xs font-mono text-muted hover:text-ink"
                  onClick={() => removeParagraph(i)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
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