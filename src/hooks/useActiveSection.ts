import { useEffect, useState } from 'react'
import { normalizeSceneSection, type SceneSection } from '../components/scene/sceneConfig'

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<SceneSection>('hero')

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'))

    if (!sections.length) {
      return
    }

    const updateActiveSection = () => {
      const viewportCenter = window.innerHeight * 0.45
      let nearestSectionId = 'hero'
      let nearestDistance = Number.POSITIVE_INFINITY

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const sectionCenter = rect.top + rect.height / 2
        const distance = Math.abs(sectionCenter - viewportCenter)

        if (distance < nearestDistance) {
          nearestDistance = distance
          nearestSectionId = section.id
        }
      })

      setActiveSection(normalizeSceneSection(nearestSectionId))
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [])

  return activeSection
}
