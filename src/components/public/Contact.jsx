import { useState } from 'react'
import { submitMessage } from '../../firebase/firestore'
import Reveal from '../shared/Reveal'

const ICONS = {
  twitter: 'X',
  facebook: 'FB',
  instagram: 'IG',
  linkedin: 'IN',
  github: 'GH',
  dribbble: 'DR',
}

export default function Contact({ contact, socialLinks }) {
  const [form, setForm] = useState({
    email: '',
    subject: '',
    message: '',
  })

  const [status, setStatus] = useState('idle')
  const [focusedField, setFocusedField] = useState(null)

  if (!contact || contact.enabled === false) return null

  const visibleSocial = (socialLinks || []).filter(
    (s) => s.visible !== false
  )

  async function handleSubmit(e) {
    e.preventDefault()

    if (!form.email || !form.message) return

    setStatus('sending')

    try {
      await submitMessage(form)

      setForm({
        email: '',
        subject: '',
        message: '',
      })

      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      className="relative bg-paper px-5 md:px-8 py-20 md:py-28 overflow-hidden"
    >
      {/* Faint background label */}
      <span className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 font-display font-black text-[18vw] leading-none text-ink/[0.025] select-none whitespace-nowrap">
        CONTACT
      </span>

      {/* Section number */}
      <p className="relative z-10 label-tag text-center mb-10">
        04
      </p>

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">

        {/* Form */}
        <Reveal className="order-2 md:order-1">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                required
                placeholder="Email"
                className="
                  w-full
                  bg-transparent
                  border-0
                  border-b
                  border-line
                  px-0
                  py-3
                  font-sans
                  text-sm
                  outline-none
                  transition-colors
                  duration-300
                  focus:border-ink
                "
                value={form.email}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    email: e.target.value,
                  }))
                }
              />

              <span
                className={`
                  absolute
                  left-0
                  bottom-0
                  h-px
                  bg-ink
                  transition-all
                  duration-300
                  ${focusedField === 'email' ? 'w-full' : 'w-0'}
                `}
              />
            </div>

            {/* Subject */}
            <div className="relative">
              <input
                type="text"
                placeholder="Subject"
                className="
                  w-full
                  bg-transparent
                  border-0
                  border-b
                  border-line
                  px-0
                  py-3
                  font-sans
                  text-sm
                  outline-none
                  transition-colors
                  duration-300
                  focus:border-ink
                "
                value={form.subject}
                onFocus={() => setFocusedField('subject')}
                onBlur={() => setFocusedField(null)}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    subject: e.target.value,
                  }))
                }
              />

              <span
                className={`
                  absolute
                  left-0
                  bottom-0
                  h-px
                  bg-ink
                  transition-all
                  duration-300
                  ${focusedField === 'subject' ? 'w-full' : 'w-0'}
                `}
              />
            </div>

            {/* Message */}
            <div className="relative">
              <textarea
                required
                placeholder="Enter your message"
                rows={5}
                className="
                  w-full
                  bg-transparent
                  border-0
                  border-b
                  border-line
                  px-0
                  py-3
                  font-sans
                  text-sm
                  outline-none
                  resize-none
                  min-h-[140px]
                  transition-colors
                  duration-300
                  focus:border-ink
                "
                value={form.message}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    message: e.target.value,
                  }))
                }
              />

              <span
                className={`
                  absolute
                  left-0
                  bottom-0
                  h-px
                  bg-ink
                  transition-all
                  duration-300
                  ${focusedField === 'message' ? 'w-full' : 'w-0'}
                `}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="
                btn-solid
                self-start
                mt-2
                transition-transform
                duration-300
                hover:-translate-y-0.5
                active:translate-y-0
                disabled:opacity-60
              "
            >
              {status === 'sending'
                ? 'Sending…'
                : contact.buttonText || 'Send'}
            </button>

            {/* Success */}
            {status === 'sent' && (
              <p className="font-mono text-xs text-muted">
                Your message was sent successfully.
              </p>
            )}

            {/* Error */}
            {status === 'error' && (
              <p className="font-mono text-xs text-red-600">
                Your message was not sent — please try again.
              </p>
            )}
          </form>
        </Reveal>

        {/* Contact information */}
        <Reveal
          delay={120}
          className="order-1 md:order-2 flex flex-col gap-8 pt-1"
        >
          {contact.phone && (
            <div className="relative pl-6">
              <span className="absolute left-0 top-2 w-3 h-px bg-ink/30" />

              <p className="label-tag mb-1">
                Phone
              </p>

              <p className="text-sm">
                {contact.phone}
              </p>
            </div>
          )}

          {contact.email && (
            <div className="relative pl-6">
              <span className="absolute left-0 top-2 w-3 h-px bg-ink/30" />

              <p className="label-tag mb-1">
                Email
              </p>

              <p className="text-sm break-all sm:break-words">
                {contact.email}
              </p>
            </div>
          )}

          {contact.location && (
            <div className="relative pl-6">
              <span className="absolute left-0 top-2 w-3 h-px bg-ink/30" />

              <p className="label-tag mb-1">
                Location
              </p>

              <p className="text-sm">
                {contact.location}
              </p>
            </div>
          )}

          {/* Social links */}
          {visibleSocial.length > 0 && (
            <div className="mt-2">
              <h4 className="font-display font-bold text-base mb-4">
                Follow me on social networks
              </h4>

              <div className="flex flex-wrap gap-3">
                {visibleSocial.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      w-10
                      h-10
                      border
                      border-line
                      flex
                      items-center
                      justify-center
                      font-mono
                      text-[10px]
                      transition-all
                      duration-300
                      hover:bg-ink
                      hover:text-paper
                      hover:border-ink
                      hover:-translate-y-1
                    "
                    aria-label={s.platform}
                  >
                    {ICONS[s.platform?.toLowerCase()] ||
                      s.platform
                        ?.slice(0, 2)
                        .toUpperCase()}
                  </a>
                ))}
              </div>
            </div>
          )}
        </Reveal>

      </div>
    </section>
  )
}