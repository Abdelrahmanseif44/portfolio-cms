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
  const [form, setForm] = useState({ email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  if (!contact || contact.enabled === false) return null

  const visibleSocial = (socialLinks || []).filter((s) => s.visible !== false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.email || !form.message) return
    setStatus('sending')
    try {
      await submitMessage(form)
      setForm({ email: '', subject: '', message: '' })
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="px-5 md:px-8 py-20 md:py-28">
      <p className="label-tag text-center mb-3">03</p>
      <h2 className="font-display font-extrabold text-3xl md:text-4xl text-center mb-14">
        Contact me
      </h2>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <Reveal>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            required
            placeholder="Email"
            className="field"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Subject"
            className="field"
            value={form.subject}
            onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
          />
          <textarea
            required
            placeholder="Enter your message"
            rows={5}
            className="field resize-none"
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          />
          <button type="submit" className="btn-solid self-start" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : contact.buttonText || 'Send'}
          </button>
          {status === 'sent' && (
            <p className="font-mono text-xs bg-ink text-paper px-4 py-3">
              Your message was sent successfully.
            </p>
          )}
          {status === 'error' && (
            <p className="font-mono text-xs bg-red-600 text-white px-4 py-3">
              Your message was not sent — please try again.
            </p>
          )}
        </form>
        </Reveal>

        <Reveal delay={120} className="flex flex-col gap-6 pt-1">
          {contact.phone && (
            <div>
              <p className="label-tag mb-1">Phone</p>
              <p className="text-sm">{contact.phone}</p>
            </div>
          )}
          {contact.email && (
            <div>
              <p className="label-tag mb-1">Email</p>
              <p className="text-sm">{contact.email}</p>
            </div>
          )}
          {contact.location && (
            <div>
              <p className="label-tag mb-1">Location</p>
              <p className="text-sm">{contact.location}</p>
            </div>
          )}

          {visibleSocial.length > 0 && (
            <div className="mt-2">
              <h4 className="font-display font-bold text-base mb-3">
                Follow me on social networks
              </h4>
              <div className="flex gap-3">
                {visibleSocial.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 border border-ink flex items-center justify-center font-mono text-[10px] hover:bg-ink hover:text-paper transition-colors"
                    aria-label={s.platform}
                  >
                    {ICONS[s.platform?.toLowerCase()] || s.platform?.slice(0, 2).toUpperCase()}
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
