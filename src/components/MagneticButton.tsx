import type { PointerEvent, ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

type MagneticButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  href?: string
  onClick?: () => void
  ariaLabel?: string
  className?: string
  rel?: string
  target?: string
}

const variantClasses = {
  primary: 'button-primary',
  secondary: 'button-secondary',
  ghost: 'button-ghost',
}

export function MagneticButton({
  children,
  variant = 'primary',
  href,
  onClick,
  ariaLabel,
  className = '',
  rel,
  target,
}: MagneticButtonProps) {
  const reducedMotion = useReducedMotion()
  const offsetX = useMotionValue(0)
  const offsetY = useMotionValue(0)
  const x = useSpring(offsetX, { stiffness: 260, damping: 18, mass: 0.35 })
  const y = useSpring(offsetY, { stiffness: 260, damping: 18, mass: 0.35 })
  const classes = `${variantClasses[variant]} ${className}`.trim()
  const magneticEnabled =
    !reducedMotion &&
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!magneticEnabled || event.pointerType === 'touch') {
      return
    }

    const bounds = event.currentTarget.getBoundingClientRect()
    const relativeX = event.clientX - (bounds.left + bounds.width / 2)
    const relativeY = event.clientY - (bounds.top + bounds.height / 2)

    offsetX.set(relativeX * 0.14)
    offsetY.set(relativeY * 0.2)
  }

  const resetPointer = () => {
    offsetX.set(0)
    offsetY.set(0)
  }

  if (href) {
    return (
      <motion.a
        aria-label={ariaLabel}
        className={classes}
        href={href}
        onPointerLeave={resetPointer}
        onPointerMove={handlePointerMove}
        rel={rel}
        style={magneticEnabled ? { x, y } : undefined}
        target={target}
        whileTap={reducedMotion ? undefined : { scale: 0.98 }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      aria-label={ariaLabel}
      className={classes}
      onClick={onClick}
      onPointerLeave={resetPointer}
      onPointerMove={handlePointerMove}
      style={magneticEnabled ? { x, y } : undefined}
      type="button"
      whileTap={reducedMotion ? undefined : { scale: 0.98 }}
    >
      {children}
    </motion.button>
  )
}
