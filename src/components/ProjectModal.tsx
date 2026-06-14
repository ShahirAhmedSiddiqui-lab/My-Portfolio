import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useId, useRef } from 'react'
import type { Project } from '../data/projects'
import { MagneticButton } from './MagneticButton'

type ProjectModalProps = {
  project: Project
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const titleId = useId()
  const descriptionId = useId()
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) {
        return
      }

      const focusableSelectors = [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ]
      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelectors.join(',')),
      ).filter((element) => !element.hasAttribute('disabled') && !element.getAttribute('aria-hidden'))

      if (!focusableElements.length) {
        event.preventDefault()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey) {
        if (document.activeElement === firstElement || !dialogRef.current.contains(document.activeElement)) {
          event.preventDefault()
          lastElement.focus()
        }
        return
      }

      if (document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus()
    }
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-[60] flex items-stretch justify-center px-0 py-0 sm:items-center sm:px-4 sm:py-6"
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        role="presentation"
        transition={reducedMotion ? { duration: 0.12 } : { duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.button
          animate={{ opacity: 1 }}
          aria-label="Close project case study"
          className="absolute inset-0 bg-[rgba(3,3,4,0.72)] backdrop-blur-sm"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={onClose}
          transition={reducedMotion ? { duration: 0.12 } : { duration: 0.24 }}
          type="button"
        />

        <motion.div
          animate={{ opacity: 1, y: 0, scale: 1 }}
          aria-describedby={descriptionId}
          aria-labelledby={titleId}
          aria-modal="true"
          className="glass-panel-strong relative z-10 min-h-[100dvh] w-full max-w-6xl overflow-hidden rounded-none sm:max-h-[92vh] sm:min-h-0 sm:rounded-[2rem]"
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.98 }}
          ref={dialogRef}
          role="dialog"
          transition={reducedMotion ? { duration: 0.12 } : { duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid h-[100dvh] overflow-y-auto sm:max-h-[92vh] sm:h-auto xl:grid-cols-[1.08fr_0.92fr]">
          <div
            className="relative min-h-[300px] border-b border-white/10 xl:min-h-full xl:border-b-0 xl:border-r"
            style={{ borderColor: `${project.accentColor}28` }}
          >
            <img
              alt={project.imageAlt}
              className="h-full w-full object-cover object-top"
              decoding="async"
              src={project.image}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, transparent 0%, rgba(5,5,5,0.08) 36%, rgba(5,5,5,0.72) 100%), radial-gradient(circle at 18% 18%, ${project.accentColor}38, transparent 26%)`,
              }}
            />
            <div className="absolute inset-x-6 bottom-6 flex flex-wrap gap-3">
              <span
                className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]"
                style={{ borderColor: `${project.accentColor}55`, color: project.accentColor, backgroundColor: 'rgba(5,5,5,0.44)' }}
              >
                Live Project
              </span>
              <span className="rounded-full border border-white/10 bg-[rgba(5,5,5,0.44)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[--color-text-soft]">
                Case Study Preview
              </span>
            </div>
          </div>

            <div className="flex flex-col gap-6 p-5 sm:p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                <p className="eyebrow" style={{ color: project.accentColor }}>
                  {project.category}
                </p>
                <h2 className="text-3xl font-semibold leading-tight tracking-[-0.05em] text-[--color-text] sm:text-4xl" id={titleId}>
                  {project.title}
                </h2>
                <p className="max-w-[42rem] text-sm leading-7 text-[--color-text-soft] sm:text-base sm:leading-8" id={descriptionId}>
                  {project.description}
                </p>
              </div>

              <button
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-[--color-text-muted] transition hover:border-white/20 hover:bg-white/10 hover:text-[--color-text]"
                onClick={onClose}
                ref={closeButtonRef}
                type="button"
              >
                x
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <article className="glass-panel rounded-[1.45rem] p-5">
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
              </article>

              <article className="glass-panel rounded-[1.45rem] p-5">
                <p className="surface-label">Project Signals</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.visualMood.map((mood) => (
                    <span
                      key={mood}
                      className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[--color-text-soft]"
                      style={{ borderColor: `${project.accentColor}44`, backgroundColor: `${project.accentColor}14` }}
                    >
                      {mood}
                    </span>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-7 text-[--color-text-soft]">{project.shortDescription}</p>
              </article>
            </div>

            <article className="glass-panel rounded-[1.45rem] p-5">
              <p className="surface-label">Tech Stack</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[--color-text-soft]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>

            <div className="flex flex-col gap-3">
              <MagneticButton href={project.liveUrl} rel="noreferrer" target="_blank">
                Visit Live Website
              </MagneticButton>
              <MagneticButton className="sm:w-full" href={project.githubUrl} rel="noreferrer" target="_blank" variant="secondary">
                View GitHub Repository
              </MagneticButton>
              <MagneticButton onClick={onClose} variant="ghost">
                Close Case Study
              </MagneticButton>
            </div>
          </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
