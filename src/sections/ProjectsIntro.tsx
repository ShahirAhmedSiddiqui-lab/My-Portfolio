import { ProjectCard } from '../components/ProjectCard'
import { SectionTitle } from '../components/SectionTitle'
import { projects, type Project } from '../data/projects'

type ProjectsIntroProps = {
  onOpenProject: (project: Project) => void
}

export function ProjectsIntro({ onOpenProject }: ProjectsIntroProps) {
  return (
    <section className="section-shell" id="projects">
      <div className="container-shell space-y-10">
        <SectionTitle
          align="center"
          eyebrow="05 / Featured Projects"
          title="Six concepts. Six different industries. One focus: premium digital experiences."
          description="A curated set of landing page and website concepts built around real brand use cases."
        />

        <div className="glass-panel-strong grid gap-4 rounded-[1.9rem] p-6 md:grid-cols-[0.85fr_1.15fr]">
          <div data-reveal="fade">
            <p className="surface-label">Project System</p>
            <p className="mt-3 max-w-[420px] text-sm leading-7 text-[--color-text-soft]">
              Each concept is designed to prove a different strength: luxury presentation, editorial
              structure, hospitality storytelling, architectural restraint, playful warmth, and motion-led
              automotive energy.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3" data-stagger>
            <div className="rounded-[1.3rem] border border-white/10 bg-black/20 p-4" data-stagger-item>
              <p className="surface-label">6 Concepts</p>
              <p className="mt-2 text-sm text-[--color-text-soft]">Distinct verticals with one shared premium system.</p>
            </div>
            <div className="rounded-[1.3rem] border border-white/10 bg-black/20 p-4" data-stagger-item>
              <p className="surface-label">1 Storyline</p>
              <p className="mt-2 text-sm text-[--color-text-soft]">A single-page journey instead of detached pages.</p>
            </div>
            <div className="rounded-[1.3rem] border border-white/10 bg-black/20 p-4" data-stagger-item>
              <p className="surface-label">Next Phase</p>
              <p className="mt-2 text-sm text-[--color-text-soft]">Motion, modal detail, and 3D mood changes.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" data-stagger>
          {projects.map((project) => (
            <ProjectCard key={project.id} onOpenProject={onOpenProject} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
