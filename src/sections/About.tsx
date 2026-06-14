import { SectionTitle } from '../components/SectionTitle'
import { aboutCards, profile } from '../data/profile'

export function About() {
  return (
    <section className="section-shell" id="about">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="space-y-6">
          <SectionTitle
            eyebrow="02 / About Me"
            title="Developer with a product mindset and a design eye."
            description={profile.summary}
          />
          <p className="max-w-[620px] text-sm leading-8 text-[--color-text-soft] sm:text-base">
            I enjoy turning ideas into real digital products through structured planning, clean UI design,
            scalable code, API integration, and practical problem-solving.
          </p>

          <div className="glass-panel max-w-[620px] rounded-[1.7rem] p-6">
            <p className="surface-label">Core Approach</p>
            <p className="mt-3 text-sm leading-7 text-[--color-text-soft]">
              The goal is not just to ship a working page. It is to make the brand feel intentional,
              trustworthy, and clearly valuable from the first scroll.
            </p>
          </div>
        </div>

        <div className="grid gap-4 self-start sm:grid-cols-2 xl:grid-cols-3" data-stagger>
          {aboutCards.map((card, index) => (
            <article
              key={card.title}
              className={`glass-panel rounded-[1.7rem] p-6 ${
                index === 2 ? 'sm:col-span-2 xl:col-span-1' : ''
              }`}
              data-stagger-item
            >
              <p className="surface-label">0{index + 1}</p>
              <h3 className="mt-6 text-[1.4rem] font-semibold leading-tight text-[--color-text]">{card.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[--color-text-soft]">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
