import { MagneticButton } from '../components/MagneticButton'
import type { Project } from '../data/projects'

type ProjectStoryProps = {
  project: Project
  index: number
  onOpenProject: (project: Project) => void
}

export function ProjectStory({ project, index, onOpenProject }: ProjectStoryProps) {
  return (
    <section className="section-shell" id={project.id}>
      <div className="container-shell grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6" data-reveal="fade">
          <div className="space-y-4">
            <p className="eyebrow" style={{ color: project.accentColor }}>
              {String(index + 6).padStart(2, '0')} / {project.category}
            </p>
            <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-[--color-text] sm:text-5xl xl:text-[3.7rem]">
              {project.title}
            </h2>
            <p className="max-w-[620px] text-base leading-8 text-[--color-text-soft] sm:text-lg">
              {project.description}
            </p>
          </div>

          <div className="glass-panel-strong rounded-[1.85rem] p-6">
            <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="surface-label">Key Features</p>
                <ul className="mt-4 space-y-3">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm leading-6 text-[--color-text-soft]">
                      <span
                        className="mt-2 inline-flex h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: project.accentColor }}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
                <p className="surface-label">What It Shows</p>
                <p className="mt-3 text-sm leading-7 text-[--color-text-soft]">{project.shortDescription}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5" data-depth="18" data-parallax data-reveal="fade">
          <div
            className="glass-panel-strong relative overflow-hidden rounded-[1.95rem] p-6"
            style={{
              background: `linear-gradient(155deg, ${project.accentColor}24, rgba(255,255,255,0.04) 45%, rgba(0,0,0,0.28))`,
            }}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[rgba(0,0,0,0.16)]">
              <img
                alt={project.imageAlt}
                className="absolute inset-0 h-full w-full object-cover object-top opacity-90"
                decoding="async"
                fetchPriority="low"
                loading="lazy"
                src={project.image}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${project.accentColor}1f, rgba(5,5,5,0.12) 30%, rgba(5,5,5,0.82) 100%)`,
                }}
              />
              <div className="relative flex h-full items-end justify-between p-6">
                <span
                  className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]"
                  style={{ borderColor: `${project.accentColor}55`, color: project.accentColor, backgroundColor: 'rgba(5,5,5,0.45)' }}
                >
                  Live Preview
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2" data-stagger>
            <article className="glass-panel rounded-[1.55rem] p-5" data-stagger-item>
              <p className="surface-label">Visual Mood</p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-[--color-text-soft]">
                {project.visualMood.map((mood) => (
                  <li key={mood}>{mood}</li>
                ))}
              </ul>
            </article>

            <article className="glass-panel rounded-[1.55rem] p-5" data-stagger-item>
              <p className="surface-label">Tech Stack</p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-[--color-text-soft]">
                {project.techStack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <MagneticButton href={project.liveUrl} rel="noreferrer" target="_blank" variant="secondary">
              Visit Live Website
            </MagneticButton>
            <MagneticButton href={project.githubUrl} rel="noreferrer" target="_blank" variant="ghost">
              View GitHub
            </MagneticButton>
            <MagneticButton onClick={() => onOpenProject(project)}>Open Case Study</MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}
