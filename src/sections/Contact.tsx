import { MagneticButton } from '../components/MagneticButton'
import { SectionTitle } from '../components/SectionTitle'
import { profile } from '../data/profile'

export function Contact() {
  return (
    <section className="section-shell" id="contact">
      <div className="container-shell">
        <div className="story-shell px-6 py-8 md:px-10 md:py-12 xl:px-14 xl:py-16">
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <SectionTitle
              align="center"
              eyebrow="16 / Contact"
              title="Have an idea for a website, landing page, or web application?"
              description="Shaheer can help turn it into a clean, responsive, and modern digital experience."
            />

            <div className="mt-8 grid gap-4 md:grid-cols-3" data-stagger>
              <a className="glass-panel rounded-[1.45rem] p-5 text-left" data-stagger-item href={profile.emailUrl} rel="noreferrer" target="_blank">
                <p className="surface-label">Email</p>
                <p className="mt-3 break-all text-sm leading-6 text-[--color-text-soft]">{profile.email}</p>
              </a>
              <a
                className="glass-panel rounded-[1.45rem] p-5 text-left"
                data-stagger-item
                href={profile.githubUrl}
                rel="noreferrer"
                target="_blank"
              >
                <p className="surface-label">GitHub</p>
                <p className="mt-3 text-sm leading-6 text-[--color-text-soft]">{profile.githubLabel}</p>
              </a>
              <a
                className="glass-panel rounded-[1.45rem] p-5 text-left"
                data-stagger-item
                href={profile.linkedinUrl}
                rel="noreferrer"
                target="_blank"
              >
                <p className="surface-label">LinkedIn</p>
                <p className="mt-3 text-sm leading-6 text-[--color-text-soft]">{profile.linkedinLabel}</p>
              </a>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <MagneticButton href={profile.emailUrl} rel="noreferrer" target="_blank">Start a Project</MagneticButton>
              <MagneticButton href={profile.githubUrl} variant="secondary">
                View GitHub
              </MagneticButton>
              <MagneticButton href={profile.linkedinUrl} variant="ghost">
                Connect on LinkedIn
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
