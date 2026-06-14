import { motion, useReducedMotion } from 'motion/react'

type SkillPillProps = {
  label: string
  group?: 'frontend' | 'backend' | 'engineering' | 'performance'
  accent?: string
}

export function SkillPill({ label, accent = '#D6B981' }: SkillPillProps) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.span
      className="inline-flex rounded-full border px-3.5 py-2 text-sm font-medium tracking-[0.01em] text-[--color-text]"
      data-stagger-item
      style={{
        borderColor: `${accent}55`,
        background: `linear-gradient(180deg, ${accent}20, rgba(255,255,255,0.02))`,
      }}
      whileHover={reducedMotion ? undefined : { y: -4, scale: 1.02 }}
    >
      {label}
    </motion.span>
  )
}
