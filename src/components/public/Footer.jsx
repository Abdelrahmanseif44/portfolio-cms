
export default function Footer({ siteTitle, footerText }) {
  return (
    <footer
      className="
        px-5
        sm:px-6
        md:px-8
        py-8
        sm:py-10
        border-t
        border-line
        overflow-hidden
      "
    >
      <div
        className="
          max-w-6xl
          mx-auto
          flex
          flex-col
          sm:flex-row
          items-center
          justify-between
          gap-3
          text-center
          sm:text-left
        "
      >
        <p className="label-tag">
          © {siteTitle || 'UNTITLED'} {new Date().getFullYear()}
        </p>

        {footerText && (
          <p
            className="
              label-tag
              opacity-60
              max-w-full
              sm:max-w-md
              break-words
            "
          >
            {footerText}
          </p>
        )}
      </div>
    </footer>
  )
}