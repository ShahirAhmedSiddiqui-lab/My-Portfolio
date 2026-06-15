import { useEffect } from 'react'
import gsap from 'gsap'
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useLenis(reducedMotion: boolean, isLocked = false) {
  useEffect(() => {
    if (reducedMotion) {
      return
    }

    const desktopMedia = window.matchMedia('(min-width: 1024px)')

    if (!desktopMedia.matches) {
      return
    }

    const lenis = new Lenis({
      autoRaf: false,
      duration: 0.9,
      lerp: 0.12,
      wheelMultiplier: 0.9,
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

    if (isLocked) {
      lenis.stop()
    } else {
      lenis.start()
    }

    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)
    ScrollTrigger.refresh()

    return () => {
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
    }
  }, [isLocked, reducedMotion])
}
