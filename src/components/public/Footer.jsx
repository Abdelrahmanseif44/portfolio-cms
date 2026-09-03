export default function Footer({ siteTitle, footerText }) {
  return (
    <footer className="px-5 md:px-8 py-8 border-t border-line">
      <p className="label-tag text-center">
        © {siteTitle || 'UNTITLED'} {new Date().getFullYear()}
        {footerText ? ` — ${footerText}` : ''}
      </p>
    </footer>
  )
}
