import { MagneticButton } from '../components/MagneticButton'
import { SectionTitle } from '../components/SectionTitle'
import { hashlinkValues, profile } from '../data/profile'

export function HashLink() {
  return (
    <section className="section-shell" id="hashlink">
      <div className="container-shell grid gap-8 xl:grid-cols-[1fr_1fr]">
        <div className="space-y-6">
          <SectionTitle
            eyebrow="13 / HashLink Corporation"
            title="HashLink Corporation - digital solutions with purpose."
            description="HashLink is the software and digital solutions brand behind Shaheer's founder direction."
          />

          <div className="glass-panel-strong rounded-[1.85rem] p-6">
            <p className="surface-label">Mission</p>
            <p className="mt-3 text-sm leading-7 text-[--color-text-soft]">
              To build digital products that are visually strong, technically reliable, and useful for
              real businesses.
            </p>

            <p className="surface-label mt-6">Vision</p>
            <p className="mt-3 text-sm leading-7 text-[--color-text-soft]">
              To grow HashLink Corporation into a trusted software agency known for premium websites,
              full stack development, and creative digital experiences.
            </p>
          </div>
        </div>

        <div className="glass-panel-strong rounded-[2rem] p-6" data-reveal="fade">
          <p className="surface-label">Value Nodes</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2" data-stagger>
            {hashlinkValues.map((value) => (
              <div key={value} className="rounded-[1.35rem] border border-white/10 bg-black/20 p-5" data-stagger-item>
                <p className="text-lg font-semibold text-[--color-text]">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="flex flex-col gap-3 sm:flex-row">
              <MagneticButton href={profile.hashlinkWebsiteUrl} rel="noreferrer" target="_blank">
                Visit HashLink
              </MagneticButton>
              <MagneticButton href={profile.hashlinkLinkedinUrl} rel="noreferrer" target="_blank" variant="secondary">
                HashLink LinkedIn
              </MagneticButton>
              <MagneticButton href="#services" variant="ghost">Explore Services</MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
