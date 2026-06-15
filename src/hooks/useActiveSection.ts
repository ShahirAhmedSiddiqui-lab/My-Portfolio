import { useEffect, useState } from 'react'
import { normalizeSceneSection, type SceneSection } from '../components/scene/sceneConfig'

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<SceneSection>('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio)

        if (!visibleEntries.length) {
          return
        }

        const nextSection = visibleEntries[0].target.getAttribute('id')
        const normalizedSection = normalizeSceneSection(nextSection)

        setActiveSection((currentSection) =>
          currentSection === normalizedSection ? currentSection : normalizedSection,
        )
      },
      {
        root: null,
        rootMargin: '-24% 0px -42% 0px',
        threshold: [0.2, 0.35, 0.5, 0.65],
      },
    )

    const observedSections = new Set<HTMLElement>()
    const main = document.querySelector('main')

    if (!main) {
      observer.disconnect()
      return
    }

    const observeSections = () => {
      const sections = Array.from(main.querySelectorAll<HTMLElement>('section[id]'))

      sections.forEach((section) => {
        if (observedSections.has(section)) {
          return
        }

        observer.observe(section)
        observedSections.add(section)
      })
    }

    observeSections()

    const mutationObserver = new MutationObserver(() => {
      observeSections()
    })

    mutationObserver.observe(main, { childList: true, subtree: true })

    return () => {
      mutationObserver.disconnect()
      observer.disconnect()
    }
  }, [])

  return activeSection
}
