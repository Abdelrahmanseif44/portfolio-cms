import { useEffect, useRef, useState } from 'react' 
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
 
  const sectionRef = useRef(null) 
  const backgroundRef = useRef(null) 
 
  if (!contact || contact.enabled === false) return null 
 
  const visibleSocial = (socialLinks || []).filter( 
    (s) => s.visible !== false 
  ) 
 
  useEffect(() => { 
    const section = sectionRef.current 
    const background = backgroundRef.current 
 
    if (!section || !background) return 
 
    const reduceMotion = window.matchMedia( 
      '(prefers-reduced-motion: reduce)' 
    ).matches 
 
    if (reduceMotion) return 
 
    let ticking = false 
 
    function updateParallax() { 
      if (ticking) return 
 
      ticking = true 
 
      requestAnimationFrame(() => { 
        const rect = section.getBoundingClientRect() 
 
        const viewportCenter = window.innerHeight / 2 
        const sectionCenter = rect.top + rect.height / 2 
 
        const distance = 
          (viewportCenter - sectionCenter) / window.innerHeight 
 
        const movement = Math.max( 
          -35, 
          Math.min(35, distance * 35) 
        ) 
 
        background.style.transform = ` 
          translate3d(-50%, ${movement}px, 0) 
        ` 
 
        ticking = false 
      }) 
    } 
 
    updateParallax() 
 
    window.addEventListener('scroll', updateParallax, { 
      passive: true, 
    }) 
 
    window.addEventListener('resize', updateParallax) 
 
    return () => { 
      window.removeEventListener('scroll', updateParallax) 
      window.removeEventListener('resize', updateParallax) 
    } 
  }, []) 
 
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
      ref={sectionRef} 
      id="contact" 
      className=" 
        relative 
        bg-paper 
        px-5 
        md:px-8 
        py-20 
        md:py-28 
        overflow-hidden 
      " 
    > 
      {/* Faint background label */} 
      <span 
        ref={backgroundRef} 
        aria-hidden="true" 
        className=" 
          pointer-events-none 
          absolute 
          top-10 
          left-1/2 
          font-display 
          font-black 
          text-[18vw] 
          leading-none 
          text-ink/[0.025] 
          select-none 
          whitespace-nowrap 
          will-change-transform 
        " 
      > 
        CONTACT 
      </span> 
 
      {/* Section number */} 
      <p className="relative z-10 label-tag text-center mb-10"> 
        04 
      </p> 
 
      {/* Main content */} 
      <div 
        className=" 
          relative 
          z-10 
          max-w-5xl 
          mx-auto 
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-10 
          md:gap-14 
          items-start 
        " 
      > 
        {/* Form */} 
        <Reveal className="order-2 md:order-1"> 
          <form 
            onSubmit={handleSubmit} 
            className="flex flex-col gap-5" 
          > 
            {/* Email */} 
            <div className="relative group"> 
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
                  duration-500 
                  ease-out 
                  ${ 
                    focusedField === 'email' 
                      ? 'w-full' 
                      : 'w-0' 
                  } 
                `} 
              /> 
            </div> 
 
            {/* Subject */} 
            <div className="relative group"> 
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
                  duration-500 
                  ease-out 
                  ${ 
                    focusedField === 'subject' 
                      ? 'w-full' 
                      : 'w-0' 
                  } 
                `} 
              /> 
            </div> 
 
            {/* Message */} 
            <div className="relative group"> 
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
                  duration-500 
                  ease-out 
                  ${ 
                    focusedField === 'message' 
                      ? 'w-full' 
                      : 'w-0' 
                  } 
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
                relative 
                overflow-hidden 
                transition-all 
                duration-300 
                hover:-translate-y-1 
                active:translate-y-0 
                active:scale-[0.98] 
                disabled:opacity-60 
                disabled:hover:translate-y-0 
              " 
            > 
              <span 
                className=" 
                  absolute 
                  inset-0 
                  bg-white/[0.08] 
                  -translate-x-full 
                  transition-transform 
                  duration-500 
                  group-hover:translate-x-0 
                " 
              /> 
 
              <span className="relative flex items-center gap-2"> 
                {status === 'sending' && ( 
                  <span 
                    className=" 
                      w-3 
                      h-3 
                      rounded-full 
                      border-2 
                      border-paper/40 
                      border-t-paper 
                      animate-spin 
                    " 
                  /> 
                )} 
 
                {status === 'sending' 
                  ? 'Sending…' 
                  : contact.buttonText || 'Send'} 
 
                {status !== 'sending' && ( 
                  <span className="transition-transform duration-300"> 
                    → 
                  </span> 
                )} 
              </span> 
            </button> 
 
            {/* Success */} 
            {status === 'sent' && ( 
              <p 
                className=" 
                  font-mono 
                  text-xs 
                  text-muted 
                  animate-[reveal_0.4s_ease-out] 
                " 
              > 
                Your message was sent successfully. 
              </p> 
            )} 
 
            {/* Error */} 
            {status === 'error' && ( 
              <p 
                className=" 
                  font-mono 
                  text-xs 
                  text-red-600 
                  animate-[reveal_0.4s_ease-out] 
                " 
              > 
                Your message was not sent — please try again. 
              </p> 
            )} 
          </form> 
        </Reveal> 
 
        {/* Contact information */} 
        <Reveal 
          delay={120} 
          className=" 
            order-1 
            md:order-2 
            flex 
            flex-col 
            gap-8 
            pt-1 
          " 
        > 
          {contact.phone && ( 
            <div 
              className=" 
                relative 
                pl-6 
                transition-transform 
                duration-300 
                hover:translate-x-1 
              " 
            > 
              <span 
                className=" 
                  absolute 
                  left-0 
                  top-2 
                  w-3 
                  h-px 
                  bg-ink/30 
                  transition-all 
                  duration-300 
                " 
              /> 
 
              <p className="label-tag mb-1"> 
                Phone 
              </p> 
 
              <p className="text-sm break-words"> 
                {contact.phone} 
              </p> 
            </div> 
          )} 
 
          {contact.email && ( 
            <div 
              className=" 
                relative 
                pl-6 
                transition-transform 
                duration-300 
                hover:translate-x-1 
              " 
            > 
              <span 
                className=" 
                  absolute 
                  left-0 
                  top-2 
                  w-3 
                  h-px 
                  bg-ink/30 
                " 
              /> 
 
              <p className="label-tag mb-1"> 
                Email 
              </p> 
 
              <p className="text-sm break-all sm:break-words"> 
                {contact.email} 
              </p> 
            </div> 
          )} 
 
          {contact.location && ( 
            <div 
              className=" 
                relative 
                pl-6 
                transition-transform 
                duration-300 
                hover:translate-x-1 
              " 
            > 
              <span 
                className=" 
                  absolute 
                  left-0 
                  top-2 
                  w-3 
                  h-px 
                  bg-ink/30 
                " 
              /> 
 
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
                {visibleSocial.map((s, index) => ( 
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
                      active:translate-y-0 
                    " 
                    style={{ 
                      transitionDelay: `${index * 30}ms`, 
                    }} 
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