import Reveal from "../shared/Reveal";

export default function About({ about }) {
  if (!about || about.enabled === false) return null;

  const {
    heading,
    paragraphs = [],
    image,
  } = about;

  return (
    <section
      id="about"
      className="
        relative
        bg-mist
        px-5
        sm:px-6
        md:px-8
        py-20
        sm:py-24
        md:py-28
        overflow-hidden
      "
    >
      {/* Background typography */}
      <span
        className="
          pointer-events-none
          absolute
          top-10
          left-1/2
          -translate-x-1/2
          font-display
          font-black
          text-[20vw]
          leading-none
          text-ink/[0.025]
          select-none
          whitespace-nowrap
        "
      >
        ABOUT
      </span>

      {/* Section number */}
      <p className="relative z-10 label-tag text-center mb-3">
        03
      </p>

      {/* Heading */}
      <h2
        className="
          relative
          z-10
          font-display
          font-extrabold
          text-3xl
          sm:text-4xl
          md:text-5xl
          text-center
          mb-10
          md:mb-14
        "
      >
        About
      </h2>

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
          lg:gap-20
          items-start
        "
      >
        {/* Text */}
        <Reveal
          className="
            flex
            flex-col
            gap-8
            order-2
            md:order-1
          "
        >
          {heading && (
            <h3
              className="
                font-display
                font-bold
                text-xl
                md:text-2xl
              "
            >
              {heading}
            </h3>
          )}

          {paragraphs.map((block, i) => (
            <div
              key={i}
              className="relative pl-5"
            >
              {/* Small accent line */}
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

              {block.subheading && (
                <h4
                  className="
                    font-display
                    font-bold
                    text-base
                    mb-2
                  "
                >
                  {block.subheading}
                </h4>
              )}

              <p
                className="
                  text-sm
                  text-muted
                  leading-relaxed
                "
              >
                {block.text}
              </p>
            </div>
          ))}
        </Reveal>

        {/* Image */}
        {image && (
          <Reveal
            delay={120}
            className="
              order-1
              md:order-2
              relative
              w-full
            "
          >
            <div
              className="
                relative
                aspect-[4/5]
                overflow-hidden
                group
              "
            >
              <img
                src={
                  typeof image === "string"
                    ? image
                    : image.url
                }
                alt="About"
                className="
                  w-full
                  h-full
                  object-cover
                  grayscale
                  group-hover:grayscale-0
                  scale-105
                  group-hover:scale-100
                  transition-all
                  duration-700
                  ease-out
                "
              />

              {/* Minimal corner details */}
              <span
                className="
                  absolute
                  top-3
                  left-3
                  w-6
                  h-6
                  border-t
                  border-l
                  border-white/40
                "
              />

              <span
                className="
                  absolute
                  bottom-3
                  right-3
                  w-6
                  h-6
                  border-b
                  border-r
                  border-white/40
                "
              />

              {/* Image label */}
              <span
                className="
                  absolute
                  bottom-4
                  left-4
                  flex
                  items-center
                  gap-2
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-[0.15em]
                  text-white/70
                "
              >
                <span
                  className="
                    w-1.5
                    h-1.5
                    rounded-full
                    bg-white
                    animate-pulse
                  "
                />

                About
              </span>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}