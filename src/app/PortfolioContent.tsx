import { lazy, memo, type RefObject } from 'react'
import { DeferredSection } from '../components/DeferredSection'
import { navigationLinks, profile } from '../data/profile'
import type { Project } from '../data/projects'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useMotionLayer } from '../hooks/useMotionLayer'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { About } from '../sections/About'
import { Education } from '../sections/Education'
import { Hero } from '../sections/Hero'

const SkillsSection = lazy(async () => {
  const module = await import('../sections/Skills')
  return { default: module.Skills }
})

const ProjectsIntroSection = lazy(async () => {
  const module = await import('../sections/ProjectsIntro')
  return { default: module.ProjectsIntro }
})

const ProcessSection = lazy(async () => {
  const module = await import('../sections/Process')
  return { default: module.Process }
})

const HashLinkSection = lazy(async () => {
  const module = await import('../sections/HashLink')
  return { default: module.HashLink }
})

const ServicesSection = lazy(async () => {
  const module = await import('../sections/Services')
  return { default: module.Services }
})

const WhyWorkWithMeSection = lazy(async () => {
  const module = await import('../sections/WhyWorkWithMe')
  return { default: module.WhyWorkWithMe }
})

const ContactSection = lazy(async () => {
  const module = await import('../sections/Contact')
  return { default: module.Contact }
})

const FooterSection = lazy(async () => {
  const module = await import('../sections/Footer')
  return { default: module.Footer }
})

type PortfolioContentProps = {
  appShellRef: RefObject<HTMLDivElement | null>
  mainRef: RefObject<HTMLElement | null>
  onOpenProject: (project: Project) => void
}

export const PortfolioContent = memo(function PortfolioContent({
  appShellRef,
  mainRef,
  onOpenProject,
}: PortfolioContentProps) {
  const reducedMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 767px)')

  useMotionLayer(mainRef, reducedMotion || isMobile)

  return (
    <div ref={appShellRef}>
      <div aria-hidden="true" className="ambient-bg" />

      <header className="sticky top-0 z-20 border-b border-white/10 bg-[rgba(5,5,5,0.82)] backdrop-blur-xl">
        <div className="container-shell flex flex-wrap items-center justify-between gap-4 px-5 py-4">
          <a href="#hero" className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(214,185,129,0.45)] bg-[rgba(214,185,129,0.12)] text-sm font-semibold uppercase tracking-[0.22em] text-[--color-accent-champagne]">
              SA
            </span>
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-[--color-text-muted]">HashLink</p>
              <p className="text-sm font-medium text-[--color-text]">{profile.name}</p>
            </div>
          </a>

          <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
            <nav className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
              {navigationLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-transparent px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[--color-text-muted] transition hover:border-white/10 hover:bg-white/5 hover:text-[--color-text] sm:px-4"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <a
              className="button-primary px-5 text-xs uppercase tracking-[0.18em]"
              href={profile.resumeUrl}
              rel="noreferrer"
              target="_blank"
            >
              Resume
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10" ref={mainRef}>
        <Hero />
        <About />
        <Education />

        <DeferredSection
          Component={SkillsSection}
          fallback={<div className="h-24" />}
          id="skills"
          minHeightClassName="min-h-[70vh]"
          props={{}}
        />
        <DeferredSection
          Component={ProjectsIntroSection}
          fallback={<div className="h-24" />}
          id="projects"
          minHeightClassName="min-h-[80vh]"
          props={{ onOpenProject }}
        />
        <DeferredSection
          Component={ProcessSection}
          fallback={<div className="h-24" />}
          id="process"
          minHeightClassName="min-h-[70vh]"
          props={{}}
        />
        <DeferredSection
          Component={HashLinkSection}
          fallback={<div className="h-20" />}
          id="hashlink"
          minHeightClassName="min-h-[60vh]"
          props={{}}
        />
        <DeferredSection
          Component={ServicesSection}
          fallback={<div className="h-20" />}
          id="services"
          minHeightClassName="min-h-[65vh]"
          props={{}}
        />
        <DeferredSection
          Component={WhyWorkWithMeSection}
          fallback={<div className="h-20" />}
          id="why-work-with-me"
          minHeightClassName="min-h-[60vh]"
          props={{}}
        />
        <DeferredSection
          Component={ContactSection}
          fallback={<div className="h-20" />}
          id="contact"
          minHeightClassName="min-h-[55vh]"
          props={{}}
        />
        <DeferredSection
          Component={FooterSection}
          fallback={<div className="h-16" />}
          id="footer"
          minHeightClassName="min-h-[35vh]"
          props={{}}
        />
      </main>
    </div>
  )
})
