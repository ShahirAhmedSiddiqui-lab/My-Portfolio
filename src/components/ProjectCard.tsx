import type { Project } from '../data/projects'
import { MagneticButton } from './MagneticButton'
import { motion, useReducedMotion } from 'motion/react'

type ProjectCardProps = {
  project: Project
  onOpenProject: (project: Project) => void
}

export function ProjectCard({ project, onOpenProject }: ProjectCardProps) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.article
      className="glass-panel group flex h-full flex-col rounded-[1.7rem] p-5"
      data-stagger-item
      whileHover={reducedMotion ? undefined : { y: -8, scale: 1.01 }}
    >
      <div className="relative mb-5 h-44 overflow-hidden rounded-[1.35rem] border border-white/10">
        <img
          alt={project.imageAlt}
          className="h-full w-full object-cover object-top"
          decoding="async"
          fetchPriority="low"
          loading="lazy"
          src={project.image}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, transparent 0%, rgba(5,5,5,0.18) 48%, rgba(5,5,5,0.76) 100%), radial-gradient(circle at 20% 20%, ${project.accentColor}54, transparent 25%)`,
          }}
        />
        <div className="absolute inset-0 flex h-full flex-col justify-between p-4">
          <span
            className="w-fit rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]"
            style={{ borderColor: `${project.accentColor}55`, color: project.accentColor, backgroundColor: 'rgba(5,5,5,0.45)' }}
          >
            Shipped Project
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <p className="surface-label">{project.category}</p>
        <h3 className="mt-3 text-[1.45rem] font-semibold leading-tight text-[--color-text]">{project.title}</h3>
        <p className="mt-3 text-sm leading-7 text-[--color-text-soft]">{project.shortDescription}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.visualMood.slice(0, 2).map((mood) => (
            <span
              key={mood}
              className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[--color-text-soft]"
              style={{ borderColor: `${project.accentColor}40`, backgroundColor: `${project.accentColor}10` }}
            >
              {mood}
            </span>
          ))}
        </div>

        <ul className="mt-5 space-y-2">
          {project.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex gap-2 text-sm leading-6 text-[--color-text-soft]">
              <span className="mt-2 inline-flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: project.accentColor }} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-3">
          <MagneticButton className="w-full" onClick={() => onOpenProject(project)} variant="secondary">
            Case Study
          </MagneticButton>
          <div className="flex flex-col gap-3">
            <MagneticButton className="flex-1" href={project.liveUrl} rel="noreferrer" target="_blank">
              Live Site
            </MagneticButton>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
