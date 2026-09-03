export default function SectionHeader({ title, description, action }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-8">
      <div>
        <h1 className="font-display font-extrabold text-2xl">{title}</h1>
        {description && <p className="text-sm text-muted mt-1 max-w-md">{description}</p>}
      </div>
      {action}
    </div>
  )
}
