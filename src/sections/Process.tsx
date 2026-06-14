import { useEffect, useRef, useState } from 'react'
import { SectionTitle } from '../components/SectionTitle'
import { TimelineStep } from '../components/TimelineStep'
import { processSteps } from '../data/process'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function Process() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const reducedMotion = useReducedMotion()
  const [activeStep, setActiveStep] = useState(-1)

  useEffect(() => {
    const section = sectionRef.current

    if (!section || reducedMotion) {
      setActiveStep(-1)
      return
    }

    const media = window.matchMedia('(min-width: 768px)')

    const stepCount = processSteps.length
    const resolveStepIndex = (progress: number) =>
      Math.min(stepCount - 1, Math.max(0, Math.round(progress * (stepCount - 1))))

    const updateProgress = () => {
      if (!media.matches) {
        setActiveStep(-1)
        return
      }

      const rect = section.getBoundingClientRect()
      const activationPoint = window.innerHeight * 0.14

      if (rect.top > activationPoint) {
        setActiveStep(-1)
        return
      }

      const viewportHeight = window.innerHeight
      const stickyTravel = Math.max(section.offsetHeight - viewportHeight, 1)
      const consumed = Math.min(Math.max(-rect.top, 0), stickyTravel)
      const progress = consumed / stickyTravel
      setActiveStep(resolveStepIndex(progress))
    }

    const handleChange = () => {
      updateProgress()
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    media.addEventListener('change', handleChange)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
      media.removeEventListener('change', handleChange)
    }
  }, [reducedMotion])

  return (
    <section
      className="section-shell md:min-h-[420vh]"
      id="process"
      ref={sectionRef}
    >
      <div className="container-shell">
        <div className="space-y-10 md:sticky md:top-24 md:flex md:min-h-[calc(100vh-8rem)] md:flex-col md:justify-center md:py-6">
          <SectionTitle
            eyebrow="12 / Process"
            title="From brand understanding to final experience."
            description="A guided sequence where the process stays in focus and each step takes over before the page continues."
          />

          <div className="glass-panel-strong hidden rounded-[1.9rem] p-6 md:block">
            <div
              aria-hidden="true"
              className="mb-6 h-px bg-[linear-gradient(90deg,transparent,rgba(214,185,129,0.8),transparent)]"
              data-progress-line
            />
            <div className="grid gap-4 md:grid-cols-6">
              {processSteps.map((step, index) => (
                <div key={step.title} className="flex items-center gap-3">
                  <span
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs font-semibold transition ${
                      index <= activeStep
                        ? 'border-[rgba(214,185,129,0.4)] bg-[rgba(214,185,129,0.18)] text-[--color-text]'
                        : 'border-white/10 bg-black/20 text-[--color-text]'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <div
                    className={`h-px flex-1 transition ${
                      index < activeStep ? 'bg-[rgba(214,185,129,0.55)]' : 'bg-white/10'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 md:hidden">
            {processSteps.map((step, index) => (
              <details className="glass-panel rounded-[1.45rem] p-5" key={step.title} open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/20 text-sm font-semibold text-[--color-text]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="surface-label">Step {index + 1}</p>
                      <h3 className="mt-1 text-base font-semibold text-[--color-text]">{step.title}</h3>
                    </div>
                  </div>
                  <span className="text-xs uppercase tracking-[0.22em] text-[--color-text-muted]">Open</span>
                </summary>
                <p className="pt-4 text-sm leading-7 text-[--color-text-soft]">{step.description}</p>
              </details>
            ))}
          </div>

          <div className="hidden gap-4 md:grid xl:grid-cols-3" data-stagger>
            {processSteps.map((step, index) => (
              <TimelineStep
                description={step.description}
                index={index}
                isActive={index === activeStep}
                key={step.title}
                title={step.title}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
