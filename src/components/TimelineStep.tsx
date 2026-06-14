import { motion, useReducedMotion } from 'motion/react'

type TimelineStepProps = {
  index: number
  title: string
  description: string
  isActive?: boolean
}

export function TimelineStep({ index, title, description, isActive = false }: TimelineStepProps) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.article
      className={`rounded-[1.6rem] border p-6 ${
        isActive
          ? 'border-[rgba(214,185,129,0.42)] bg-[linear-gradient(180deg,rgba(214,185,129,0.18),rgba(255,255,255,0.04))] shadow-[0_24px_70px_rgba(214,185,129,0.12)]'
          : 'border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]'
      }`}
      data-stagger-item
      whileHover={reducedMotion ? undefined : { y: -6, scale: 1.01 }}
    >
      <div className="flex items-center gap-4">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/20 text-sm font-semibold text-[--color-text]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div>
          <p className="surface-label">Step {index + 1}</p>
          <h3 className="mt-1 text-lg font-semibold text-[--color-text]">{title}</h3>
        </div>
      </div>
      <p className="mt-5 text-sm leading-7 text-[--color-text-soft]">{description}</p>
    </motion.article>
  )
}
