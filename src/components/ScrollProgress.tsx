import { useEffect, useEffectEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function ScrollProgress() {
  const reducedMotion = useReducedMotion()
  const progress = useMotionValue(0)
  const scaleX = useSpring(progress, {
    stiffness: 180,
    damping: 28,
    mass: 0.35,
  })

  const updateProgress = useEffectEvent(() => {
    const scrollRange = document.documentElement.scrollHeight - window.innerHeight
    progress.set(scrollRange <= 0 ? 0 : window.scrollY / scrollRange)
  })

  useEffect(() => {
    updateProgress()

    const handleScroll = () => {
      updateProgress()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[30] h-1 origin-left bg-[linear-gradient(90deg,var(--color-accent-champagne),var(--color-accent-blue),var(--color-accent-green))] shadow-[0_0_24px_rgba(214,185,129,0.4)]"
      style={{ scaleX: reducedMotion ? 0 : scaleX }}
    />
  )
}
