export default function EmptyState({ title, description, action }) {
  return (
    <div className="border border-dashed border-line py-14 px-6 text-center">
      <p className="font-display text-xl font-bold mb-1.5">{title}</p>
      {description && (
        <p className="text-sm text-muted max-w-sm mx-auto mb-5">{description}</p>
      )}
      {action}
    </div>
  )
}
