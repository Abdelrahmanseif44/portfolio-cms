export default function ConfirmDialog({
  open,
  title = 'Are you sure?',
  description,
  confirmLabel = 'Delete',
  onConfirm,
  onCancel,
  danger = true,
}) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-[90] bg-ink/60 flex items-center justify-center p-5"
      role="dialog"
      aria-modal="true"
      onClick={onCancel}
    >
      <div
        className="bg-paper border border-ink max-w-sm w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-display text-lg font-bold mb-2">{title}</p>
        {description && <p className="text-sm text-muted mb-6">{description}</p>}
        <div className="flex gap-3 justify-end">
          <button className="btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button
            className={danger ? 'btn-solid !bg-ink' : 'btn-solid'}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
