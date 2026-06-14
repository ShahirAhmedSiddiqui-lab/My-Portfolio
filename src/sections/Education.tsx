import { educationItems } from '../data/profile'
import { SectionTitle } from '../components/SectionTitle'

export function Education() {
  return (
    <section className="section-shell" id="education">
      <div className="container-shell space-y-10">
        <SectionTitle
          eyebrow="03 / Current Journey"
          title="Currently building, learning, and growing."
          description="A timeline of education, practical training, and founder-led execution."
        />

        <div className="relative grid gap-4 lg:grid-cols-3" data-stagger>
          <div aria-hidden="true" className="absolute left-0 right-0 top-8 hidden h-px bg-white/10 lg:block" />
          {educationItems.map((item, index) => (
            <article key={item.title} className="glass-panel relative rounded-[1.5rem] p-6" data-stagger-item>
              <span className="absolute left-6 top-0 hidden h-4 w-4 -translate-y-1/2 rounded-full border border-[rgba(214,185,129,0.4)] bg-[--color-bg] lg:block" />
              <p className="text-[10px] uppercase tracking-[0.22em] text-[--color-text-muted]">{item.period}</p>
              <h3 className="mt-4 text-2xl font-semibold text-[--color-text]">{item.title}</h3>
              <p className="mt-3 text-sm font-medium text-[--color-accent-champagne]">{item.subtitle}</p>
              <p className="mt-3 text-sm leading-7 text-[--color-text-soft]">{item.detail}</p>
              <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[--color-text-muted]">
                Milestone 0{index + 1}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
