import { AnimatePresence } from 'motion/react'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { ScrollProgress } from '../components/ScrollProgress'
import { navigationLinks, profile } from '../data/profile'
import { projects, type Project } from '../data/projects'
import { useActiveSection } from '../hooks/useActiveSection'
import { useLenis } from '../hooks/useLenis'
import { useMotionLayer } from '../hooks/useMotionLayer'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { About } from '../sections/About'
import { Contact } from '../sections/Contact'
import { Education } from '../sections/Education'
import { Footer } from '../sections/Footer'
import { HashLink } from '../sections/HashLink'
import { Hero } from '../sections/Hero'
import { Process } from '../sections/Process'
import { ProjectStory } from '../sections/ProjectStory'
import { ProjectsIntro } from '../sections/ProjectsIntro'
import { Services } from '../sections/Services'
import { Skills } from '../sections/Skills'
import { WhyWorkWithMe } from '../sections/WhyWorkWithMe'

const SceneCanvas = lazy(async () => {
  const module = await import('../components/scene/SceneCanvas')
  return { default: module.SceneCanvas }
})

const ProjectModal = lazy(async () => {
  const module = await import('../components/ProjectModal')
  return { default: module.ProjectModal }
})

function App() {
  const appShellRef = useRef<HTMLDivElement | null>(null)
  const mainRef = useRef<HTMLElement | null>(null)
  const reducedMotion = useReducedMotion()
  const activeSection = useActiveSection()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [sceneUnlocked, setSceneUnlocked] = useState(false)
  const sceneReady = sceneUnlocked && !reducedMotion

  useLenis(reducedMotion)
  useMotionLayer(mainRef, reducedMotion)

  useEffect(() => {
    if (reducedMotion) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setSceneUnlocked(true)
    }, 450)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [reducedMotion])

  useEffect(() => {
    const appShell = appShellRef.current

    if (!appShell) {
      return
    }

    if (selectedProject) {
      appShell.setAttribute('aria-hidden', 'true')
      appShell.setAttribute('inert', '')
      return
    }

    appShell.removeAttribute('aria-hidden')
    appShell.removeAttribute('inert')
  }, [selectedProject])

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div ref={appShellRef}>
        <div aria-hidden="true" className="ambient-bg" />
        {sceneReady ? (
          <Suspense fallback={null}>
            <SceneCanvas activeSection={activeSection} />
          </Suspense>
        ) : null}
        <ScrollProgress />

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
          <Skills />
          <ProjectsIntro onOpenProject={setSelectedProject} />
          {projects.map((project, index) => (
            <ProjectStory key={project.id} index={index} onOpenProject={setSelectedProject} project={project} />
          ))}
          <Process />
          <HashLink />
          <Services />
          <WhyWorkWithMe />
          <Contact />
          <Footer />
        </main>
      </div>

      <Suspense fallback={null}>
        <AnimatePresence mode="wait">
          {selectedProject ? (
            <ProjectModal
              key={selectedProject.id}
              onClose={() => setSelectedProject(null)}
              project={selectedProject}
            />
          ) : null}
        </AnimatePresence>
      </Suspense>
    </div>
  )
}

export default App
