import Reveal from '../shared/Reveal'

export default function ComponentsShowcase() {
  return (
    <section id="components" className="bg-mist px-5 md:px-8 py-20 md:py-28">
      <p className="label-tag text-center mb-3">05</p>
      <h2 className="font-display font-extrabold text-3xl md:text-4xl text-center mb-14">
        Components
      </h2>

      <Reveal className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-14">
        <div>
          <h3 className="label-tag mb-4">Text</h3>
          <p className="text-sm leading-relaxed">
            This is regular body copy, and <strong>this is bold</strong>, and{' '}
            <em>this is italic</em>. Set in Inter for comfortable reading at small sizes,
            with a measure kept under 80 characters per line.
          </p>
        </div>

        <div>
          <h3 className="label-tag mb-4">Icons</h3>
          <div className="flex gap-3">
            {['X', 'FB', 'IG', 'IN'].map((i) => (
              <span
                key={i}
                className="w-9 h-9 border border-ink flex items-center justify-center font-mono text-[10px]"
              >
                {i}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="label-tag mb-4">Headings</h3>
          <div className="flex flex-col gap-2">
            <p className="font-display font-black text-3xl">H1 — Heading</p>
            <p className="font-display font-extrabold text-2xl">H2 — Heading</p>
            <p className="font-display font-bold text-xl">H3 — Heading</p>
            <p className="font-display font-semibold text-base">H4 — Heading</p>
          </div>
        </div>

        <div>
          <h3 className="label-tag mb-4">Buttons</h3>
          <div className="flex flex-wrap gap-3">
            <button className="btn-solid">Primary</button>
            <button className="btn-outline">Default</button>
          </div>
        </div>

        <div>
          <h3 className="label-tag mb-4">List</h3>
          <ul className="text-sm space-y-1.5 list-disc pl-5">
            <li>First item in the list</li>
            <li>Second item, slightly longer to show wrapping</li>
            <li>Third item</li>
          </ul>
        </div>

        <div>
          <h3 className="label-tag mb-4">Inputs</h3>
          <input className="field" placeholder="Email address" />
        </div>
      </Reveal>
    </section>
  )
}
