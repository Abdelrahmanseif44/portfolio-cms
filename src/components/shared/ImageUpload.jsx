import { useRef, useState } from 'react'
import { uploadImage, deleteImage } from '../../firebase/storage'

/**
 * Controlled image upload field.
 * value: { url, path } | null
 * onChange: (value) => void
 */
export default function ImageUpload({ label, folder, value, onChange, aspect = 'aspect-[4/5]' }) {
  const inputRef = useRef(null)
  const [progress, setProgress] = useState(null)
  const [error, setError] = useState('')

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.')
      return
    }
    if (file.size > 8 * 1024 * 1024) {
      setError('Image must be under 8MB.')
      return
    }
    setError('')
    setProgress(0)
    try {
      const previousPath = value?.path
      const result = await uploadImage(file, folder, setProgress)
      onChange({ url: result.url, path: result.path })
      if (previousPath) await deleteImage(previousPath)
    } catch (err) {
      setError(err.message || 'Upload failed.')
    } finally {
      setProgress(null)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  async function handleRemove() {
    if (value?.path) await deleteImage(value.path)
    onChange(null)
  }

  return (
    <div>
      {label && <label className="label-tag block mb-2">{label}</label>}
      <div className={`relative ${aspect} w-full max-w-xs border border-line bg-mist overflow-hidden`}>
        {value?.url ? (
          <img src={value.url} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center label-tag">
            No image
          </div>
        )}
        {progress !== null && (
          <div className="absolute inset-0 bg-ink/70 flex items-center justify-center text-paper font-mono text-xs">
            Uploading {progress}%
          </div>
        )}
      </div>
      <div className="flex gap-2 mt-3">
        <button
          type="button"
          className="btn-outline"
          onClick={() => inputRef.current?.click()}
        >
          {value?.url ? 'Replace' : 'Upload'}
        </button>
        {value?.url && (
          <button type="button" className="btn-outline" onClick={handleRemove}>
            Remove
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      </div>
      {error && <p className="text-xs text-red-600 mt-2 font-mono">{error}</p>}
    </div>
  )
}
