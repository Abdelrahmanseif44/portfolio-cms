import Reveal from '../shared/Reveal'

export default function About({ about }) {
  if (!about || about.enabled === false) return null

  const { heading, paragraphs = [], image } = about

  return (
    <section id="about" className="bg-mist px-5 md:px-8 py-20 md:py-28">
      <p className="label-tag text-center mb-3">01</p>

      <h2 className="font-display font-extrabold text-3xl md:text-4xl text-center mb-14">
        About me
      </h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">

        {/* Text */}
        <Reveal className="flex flex-col gap-6 order-2 md:order-1">
          {heading && (
            <h3 className="font-display font-bold text-xl md:text-2xl">
              {heading}
            </h3>
          )}

          {paragraphs.map((block, i) => (
            <div key={i}>
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
          className="order-1 md:order-2 aspect-[4/5] bg-ink overflow-hidden"
        >
          {image && (
            <img
              src={typeof image === 'string' ? image : image.url}
              alt=""
              className="w-full h-full object-cover grayscale"
            />
          )}
        </Reveal>

      </div>
    </section>
  )
}