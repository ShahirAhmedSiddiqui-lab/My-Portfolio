import { type ComponentType, type LazyExoticComponent, type ReactNode, Suspense, useEffect, useRef, useState, startTransition } from 'react'

type DeferredSectionProps<TProps extends Record<string, unknown>> = {
  Component: LazyExoticComponent<ComponentType<TProps>>
  fallback?: ReactNode
  id: string
  minHeightClassName?: string
  props: TProps
  rootMargin?: string
}

export function DeferredSection<TProps extends Record<string, unknown>>({
  Component,
  fallback = null,
  id,
  minHeightClassName = 'min-h-screen',
  props,
  rootMargin = '320px 0px',
}: DeferredSectionProps<TProps>) {
  const anchorRef = useRef<HTMLElement | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const anchor = anchorRef.current

    if (!anchor || isReady) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          startTransition(() => {
            setIsReady(true)
          })
          observer.disconnect()
        }
      },
      { rootMargin },
    )

    observer.observe(anchor)

    return () => {
      observer.disconnect()
    }
  }, [isReady, rootMargin])

  if (isReady) {
    return (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    )
  }

  return (
    <section className={`section-shell ${minHeightClassName}`} id={id} ref={anchorRef}>
      <div aria-hidden="true" className="container-shell">
        <div className="glass-panel rounded-[1.75rem] border-white/6 bg-white/[0.02] p-6 opacity-40">
          {fallback}
        </div>
      </div>
    </section>
  )
}
