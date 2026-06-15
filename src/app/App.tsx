import { AnimatePresence } from 'motion/react'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { PortfolioContent } from './PortfolioContent'
import { SceneCanvas } from '../components/scene/SceneCanvas'
import { ScrollProgress } from '../components/ScrollProgress'
import { type Project } from '../data/projects'
import { useActiveSection } from '../hooks/useActiveSection'
import { useLenis } from '../hooks/useLenis'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useReducedMotion } from '../hooks/useReducedMotion'

const ProjectModal = lazy(async () => {
  const module = await import('../components/ProjectModal')
  return { default: module.ProjectModal }
})

function App() {
  const appShellRef = useRef<HTMLDivElement | null>(null)
  const mainRef = useRef<HTMLElement | null>(null)
  const reducedMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 767px)')
  const activeSection = useActiveSection()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useLenis(reducedMotion, Boolean(selectedProject))

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
      <SceneCanvas activeSection={activeSection} />
      {!isMobile ? <ScrollProgress /> : null}
      <PortfolioContent appShellRef={appShellRef} mainRef={mainRef} onOpenProject={setSelectedProject} />

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
