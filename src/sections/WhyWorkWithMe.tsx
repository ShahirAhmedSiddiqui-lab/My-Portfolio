import { whyWorkWithMePoints } from '../data/profile'
import { SectionTitle } from '../components/SectionTitle'

export function WhyWorkWithMe() {
  return (
    <section className="section-shell" id="why-work-with-me">
      <div className="container-shell grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
        <SectionTitle
          eyebrow="15 / Why Work With Me"
          title="I care about the details that make a website feel finished."
          description="A trust-building section focused on working values, not decoration."
        />

        <div className="grid gap-4" data-stagger>
          {whyWorkWithMePoints.map((point, index) => (
            <article key={point.title} className="glass-panel rounded-[1.5rem] p-6" data-stagger-item>
              <div className="flex items-start gap-4">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/20 text-sm font-semibold text-[--color-text]">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-[--color-text]">{point.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[--color-text-soft]">{point.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
