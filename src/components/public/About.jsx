import Reveal from '../shared/Reveal'

export default function About({ about }) {
  if (!about || about.enabled === false) return null

  const { heading, paragraphs = [], image } = about

  return (
    <section id="about" className="relative bg-mist px-5 md:px-8 py-20 md:py-28 overflow-hidden">
      {/* Faint background label */}
      <span className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 font-display font-black text-[18vw] leading-none text-ink/[0.03] select-none whitespace-nowrap">
        ABOUT
      </span>

      <p className="label-tag text-center mb-3">03</p>

  

      <div className="relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">

        {/* Text */}
        <Reveal className="flex flex-col gap-8 order-2 md:order-1">
          {heading && (
            <h3 className="font-display font-bold text-xl md:text-2xl">
              {heading}
            </h3>
          )}

          {paragraphs.map((block, i) => (
            <div key={i} className="relative pl-6">
              {/* Accent index line */}
              <span className="absolute left-0 top-1.5 flex items-center gap-2">
                <span className="w-3 h-px bg-ink/30" />
              </span>
              <span className="absolute -left-1 top-0 font-mono text-[10px] text-ink/25">
                {String(i + 1).padStart(2, '0')}
              </span>

              {block.subheading && (
                <h4 className="font-display font-bold text-base mb-2">
                  {block.subheading}
                </h4>
              )}

              <p className="text-sm text-muted leading-relaxed">
                {block.text}
              </p>
            </div>
          ))}
        </Reveal>

        {/* Image */}
        <Reveal
          delay={120}
          className="order-1 md:order-2 relative"
        >
          <div className="relative aspect-[4/5] bg-ink overflow-hidden group">
            {image && (
              <img
                src={typeof image === 'string' ? image : image.url}
                alt=""
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700 ease-out"
              />
            )}

            {/* Corner frame accents */}
            <span className="absolute top-3 left-3 w-6 h-6 border-t border-l border-white/40" />
            <span className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-white/40" />

            {/* Floating tag */}
            <span className="absolute bottom-4 left-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-white/70">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Portrait
            </span>
          </div>
        </Reveal>

      </div>
    </section>
  )
}