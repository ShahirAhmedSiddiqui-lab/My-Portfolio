import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type ServiceCardProps = {
  title: string
  description: string
  bestFor?: string
  icon?: ReactNode
}

export function ServiceCard({ title, description, bestFor, icon }: ServiceCardProps) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.article
      className="glass-panel group rounded-[1.6rem] p-6"
      data-stagger-item
      whileHover={reducedMotion ? undefined : { y: -8, scale: 1.01 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="surface-label">Service</p>
          <h3 className="text-[1.35rem] font-semibold leading-tight text-[--color-text]">{title}</h3>
          <p className="text-sm leading-7 text-[--color-text-soft]">{description}</p>
        </div>
        {icon ? <div className="text-[--color-accent-champagne]">{icon}</div> : null}
      </div>

      {bestFor ? (
        <div className="mt-6 rounded-[1.3rem] border border-white/10 bg-[rgba(0,0,0,0.22)] p-4">
          <p className="surface-label">Best For</p>
          <p className="mt-2 text-sm leading-6 text-[--color-text-soft]">{bestFor}</p>
        </div>
      ) : null}
    </motion.article>
  )
}
