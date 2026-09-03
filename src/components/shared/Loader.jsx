export default function Loader({ label = 'Loading' }) {
  return (
    <div className="flex items-center gap-3 py-16 justify-center label-tag">
      <span className="inline-block w-3 h-3 border border-ink border-t-transparent rounded-full animate-spin" />
      {label}…
    </div>
  )
}
