import { MagneticButton } from '../components/MagneticButton'
import { profile } from '../data/profile'

const heroLines = [
  'I build websites',
  'that feel premium,',
  'perform smoothly,',
  'and communicate',
  'value with clarity.',
]

export function Hero() {
  return (
    <section className="section-shell flex items-center" id="hero">
      <div className="container-shell story-shell px-6 py-8 md:px-8 md:py-10 xl:px-12 xl:py-14">
        <div className="relative z-10 grid items-start gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="space-y-8" data-reveal="hero">
            <div className="space-y-4">
              <p className="eyebrow">01 / Hero</p>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-[--color-text-soft] sm:text-base">
                {profile.name}
              </p>
              <h1
                className="max-w-4xl text-5xl font-semibold leading-[0.92] tracking-[-0.065em] text-[--color-text] sm:text-6xl xl:text-[clamp(4.75rem,8vw,8rem)]"
                data-hero-heading
              >
                {heroLines.map((line) => (
                  <span key={line} className="hero-line-shell block overflow-hidden">
                    <span className="hero-line block" data-hero-line>
                      {line}
                    </span>
                  </span>
                ))}
              </h1>
            </div>

            <p className="max-w-[620px] text-base leading-8 text-[--color-text-soft] sm:text-lg" data-copy-reveal>
              {profile.role}, {profile.founder}, and Software Engineering student focused on responsive,
              user-driven web experiences with strong structure and clear brand communication.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row" data-buttons-reveal>
              <MagneticButton href="#projects">View My Work</MagneticButton>
              <MagneticButton href="#contact" variant="secondary">
                Let&apos;s Connect
              </MagneticButton>
            </div>

            <div className="grid gap-3 sm:grid-cols-3" data-stagger>
              <div className="stat-pill" data-stagger-item>
                <div>
                  <p className="surface-label">Focus</p>
                  <p className="mt-1 text-sm text-[--color-text-soft]">Premium websites</p>
                </div>
              </div>
              <div className="stat-pill" data-stagger-item>
                <div>
                  <p className="surface-label">Builder</p>
                  <p className="mt-1 text-sm text-[--color-text-soft]">HashLink founder</p>
                </div>
              </div>
              <div className="stat-pill" data-stagger-item>
                <div>
                  <p className="surface-label">Location</p>
                  <p className="mt-1 text-sm text-[--color-text-soft]">Karachi, Pakistan</p>
                </div>
              </div>
            </div>

            <a
              className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.22em] text-[--color-text-muted]"
              href="#about"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5">
                v
              </span>
              Scroll to explore
            </a>
          </div>

          <div className="relative space-y-4" data-depth="24" data-parallax data-reveal="fade">
            <div className="glass-panel-strong relative overflow-hidden rounded-[2rem] p-4 md:p-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(214,185,129,0.24),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(77,141,255,0.18),transparent_18%)]" />
              <div className="relative" data-photo-reveal>
                <div className="glass-panel relative overflow-hidden rounded-[1.9rem] p-3 md:p-4">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(214,185,129,0.22),transparent_24%),radial-gradient(circle_at_78%_18%,rgba(77,141,255,0.2),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />
                  <img
                    alt={profile.name}
                    className="relative aspect-square w-full rounded-[1.55rem] object-cover object-[center_8%]"
                    src={profile.photo}
                  />
                </div>
              </div>
            </div>
            <div
              className="glass-panel relative overflow-hidden rounded-[1.7rem] p-5 md:p-6"
              data-greeting-card
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(214,185,129,0.12),transparent_35%,rgba(77,141,255,0.1)_100%)]" />
              <div className="relative space-y-3">
                <p className="surface-label">Personal Note</p>
                <p className="text-lg font-medium leading-8 text-[--color-text] md:text-xl">
                  Hello, my name is {profile.name}. Welcome to my portfolio.
                </p>
                <p className="text-sm leading-7 text-[--color-text-soft]">
                  This space brings together my frontend work, motion experiments, and the premium
                  website systems I build for modern brands.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
