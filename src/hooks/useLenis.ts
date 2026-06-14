import { useEffect } from 'react'
import gsap from 'gsap'
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useLenis(reducedMotion: boolean) {
  useEffect(() => {
    if (reducedMotion) {
      return
    }

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.1,
      lerp: 0.12,
      wheelMultiplier: 0.95,
      smoothWheel: true,
      syncTouch: false,
    })

    const updateScrollTrigger = () => {
      ScrollTrigger.update()
    }

    lenis.on('scroll', updateScrollTrigger)

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)
    ScrollTrigger.refresh()

    return () => {
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
    }
  }, [reducedMotion])
}
