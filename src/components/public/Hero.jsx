export default function Hero({ hero }) {
  if (!hero || hero.enabled === false) return null

  const { greeting = 'Hello,', name = "I'm James Dean", image } = hero

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-end overflow-hidden bg-ink"
    >
      {image?.url && (
        <img
          src={image.url}
          alt=""
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-70"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />

      <div className="relative z-10 px-5 md:px-8 pb-16 md:pb-24 w-full">
        <h1 className="font-display font-black text-white leading-[0.95] text-[13vw] md:text-[6.2vw]">
          {greeting}
          <br />
          {name}
        </h1>
      </div>
    </section>
  )
}
