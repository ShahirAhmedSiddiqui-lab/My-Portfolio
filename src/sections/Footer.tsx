import { MagneticButton } from '../components/MagneticButton'
import { profile } from '../data/profile'

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-[var(--section-padding-x)] pb-10 pt-8" id="footer">
      <div className="container-shell story-shell px-6 py-8 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-3">
            <p className="surface-label">Footer</p>
            <p className="max-w-[720px] text-sm leading-7 text-[--color-text-soft]">
              {profile.name} - {profile.role}, {profile.founder}, and Software Engineering student focused on
              building modern, responsive, and user-driven web experiences.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-start gap-4 text-sm text-[--color-text-soft] lg:justify-end">
            <a href={profile.emailUrl} rel="noreferrer" target="_blank">Email</a>
            <a href={profile.linkedinUrl} rel="noreferrer" target="_blank">
              LinkedIn
            </a>
            <a href={profile.githubUrl} rel="noreferrer" target="_blank">
              GitHub
            </a>
            <MagneticButton href={profile.resumeUrl} rel="noreferrer" target="_blank">
              Resume
            </MagneticButton>
            <a href="#hero">Back to Top</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
