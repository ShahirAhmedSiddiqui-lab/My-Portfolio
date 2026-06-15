import { useEffect, useState } from 'react'
import { normalizeSceneSection, type SceneSection } from '../components/scene/sceneConfig'

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<SceneSection>('hero')

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'))

    if (!sections.length) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio)

        if (!visibleEntries.length) {
          return
        }

        const nextSection = visibleEntries[0].target.getAttribute('id')

        setActiveSection(normalizeSceneSection(nextSection))
      },
      {
        root: null,
        rootMargin: '-24% 0px -42% 0px',
        threshold: [0.2, 0.35, 0.5, 0.65],
      },
    )

    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return activeSection
}
