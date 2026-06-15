import type { RefObject } from 'react'
import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useMotionLayer(
  scopeRef: RefObject<HTMLElement | null>,
  reducedMotion: boolean,
) {
  useLayoutEffect(() => {
    const scope = scopeRef.current

    if (!scope) {
      return
    }

    const compactViewport = window.matchMedia('(max-width: 1023px)').matches

    let refreshFrame = 0

    const ctx = gsap.context(() => {
      const sectionNodes = scope.querySelectorAll<HTMLElement>('.section-shell')
      const storyShells = scope.querySelectorAll<HTMLElement>('.story-shell')
      const strongPanels = scope.querySelectorAll<HTMLElement>('.glass-panel-strong')
      const revealNodes = scope.querySelectorAll<HTMLElement>('[data-reveal]')
      const staggerGroups = scope.querySelectorAll<HTMLElement>('[data-stagger]')
      const parallaxNodes = scope.querySelectorAll<HTMLElement>('[data-parallax]')
      const progressLine = scope.querySelector<HTMLElement>('[data-progress-line]')
      const heroHeadings = scope.querySelectorAll<HTMLElement>('[data-hero-heading]')
      const copyNodes = scope.querySelectorAll<HTMLElement>('[data-copy-reveal]')
      const buttonGroups = scope.querySelectorAll<HTMLElement>('[data-buttons-reveal]')
      const photoNodes = scope.querySelectorAll<HTMLElement>('[data-photo-reveal]')
      const greetingCards = scope.querySelectorAll<HTMLElement>('[data-greeting-card]')

      if (reducedMotion) {
        gsap.set(sectionNodes, { clearProps: 'all' })
        gsap.set(storyShells, { clearProps: 'all' })
        gsap.set(strongPanels, { clearProps: 'all' })
        gsap.set(revealNodes, { clearProps: 'all' })
        gsap.set(staggerGroups, { clearProps: 'all' })
        gsap.set(parallaxNodes, { clearProps: 'all' })
        gsap.set(heroHeadings, { clearProps: 'all' })
        gsap.set(copyNodes, { clearProps: 'all' })
        gsap.set(buttonGroups, { clearProps: 'all' })
        gsap.set(photoNodes, { clearProps: 'all' })
        gsap.set(greetingCards, { clearProps: 'all' })
        if (progressLine) {
          gsap.set(progressLine, { clearProps: 'all' })
        }
        return
      }

      sectionNodes.forEach((section, index) => {
        if (section.id === 'hero') {
          return
        }

        if (compactViewport) {
          return
        }

        gsap.fromTo(
          section,
          { autoAlpha: 0.35, y: 120, scale: 0.92 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 92%',
              end: 'top 50%',
              scrub: 1.15,
              invalidateOnRefresh: true,
            },
          },
        )

        gsap.to(section, {
          yPercent: index % 2 === 0 ? -4 : -7,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        })
      })

      storyShells.forEach((shell, index) => {
        if (compactViewport) {
          return
        }

        gsap.fromTo(
          shell,
          {
            rotateX: 10,
            rotateY: index % 2 === 0 ? -5 : 5,
            z: -80,
            transformPerspective: 1400,
          },
          {
            rotateX: 0,
            rotateY: 0,
            z: 0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: shell,
              start: 'top 88%',
              end: 'top 52%',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        )
      })

      strongPanels.forEach((panel, index) => {
        if (compactViewport) {
          return
        }

        gsap.fromTo(
          panel,
          {
            autoAlpha: 0.2,
            y: 56,
            scale: 0.94,
            rotateZ: index % 2 === 0 ? -1.2 : 1.2,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotateZ: 0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              start: 'top 90%',
              end: 'top 60%',
              scrub: 0.95,
              invalidateOnRefresh: true,
            },
          },
        )
      })

      const heroRoot = scope.querySelector<HTMLElement>('[data-reveal="hero"]')

      if (heroRoot) {
        const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
        heroTimeline.fromTo(
          heroRoot,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.85 },
        )
      }

      revealNodes.forEach((node) => {
        const variant = node.dataset.reveal ?? 'fade'

        if (variant === 'hero') {
          return
        }

        const distance = variant === 'hero' ? 40 : 26
        const duration = variant === 'hero' ? 1.1 : 0.9

        gsap.fromTo(
          node,
          { autoAlpha: 0, y: distance },
          {
            autoAlpha: 1,
            y: 0,
            duration,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: node,
              start: 'top 88%',
              once: true,
              invalidateOnRefresh: true,
            },
          },
        )
      })

      staggerGroups.forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>('[data-stagger-item]')

        if (!items.length) {
          return
        }

        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: group,
              start: 'top 84%',
              once: true,
              invalidateOnRefresh: true,
            },
          },
        )
      })

      heroHeadings.forEach((heading) => {
        const lines = heading.querySelectorAll<HTMLElement>('[data-hero-line]')

        if (!lines.length) {
          return
        }

        gsap.set(lines, { yPercent: 112, autoAlpha: 0 })
        gsap.to(lines, {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.95,
          ease: 'power4.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: heading,
            start: 'top 96%',
            end: 'bottom 45%',
            scrub: 1.1,
            invalidateOnRefresh: true,
          },
        })

        gsap.to(heading, {
          yPercent: -18,
          scale: 0.92,
          ease: 'none',
          scrollTrigger: {
            trigger: heading,
            start: 'top top',
            end: 'bottom top',
            scrub: compactViewport ? false : 1.1,
            once: compactViewport,
            invalidateOnRefresh: true,
          },
        })
      })

      copyNodes.forEach((node) => {
        gsap.fromTo(
          node,
          { autoAlpha: 0, y: 26, filter: 'blur(8px)' },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: node,
              start: 'top 86%',
              once: true,
              invalidateOnRefresh: true,
            },
          },
        )
      })

      buttonGroups.forEach((group) => {
        const buttons = group.querySelectorAll<HTMLElement>('a,button')

        if (!buttons.length) {
          return
        }

        gsap.fromTo(
          buttons,
          { autoAlpha: 0, y: 18, scale: 0.96 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: group,
              start: 'top 88%',
              once: true,
              invalidateOnRefresh: true,
            },
          },
        )
      })

      photoNodes.forEach((node) => {
        gsap.fromTo(
          node,
          { autoAlpha: 0, y: 34, rotateX: 8, scale: 0.94, transformPerspective: 1000 },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 1.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: node,
              start: 'top 86%',
              once: true,
              invalidateOnRefresh: true,
            },
          },
        )

        gsap.to(node, {
          y: compactViewport ? -8 : -18,
          ease: 'none',
          scrollTrigger: {
            trigger: node,
            start: 'top bottom',
            end: 'bottom top',
            scrub: compactViewport ? 0.4 : true,
            invalidateOnRefresh: true,
          },
        })
      })

      greetingCards.forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 24, scale: 0.97 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              once: true,
              invalidateOnRefresh: true,
            },
          },
        )

        gsap.to(card, {
          boxShadow: '0 26px 80px rgba(214, 185, 129, 0.14)',
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })

      const ambientBackground = document.querySelector<HTMLElement>('.ambient-bg')

      if (ambientBackground) {
        if (compactViewport) {
          return
        }

        gsap.to(ambientBackground, {
          scale: 1.14,
          rotate: 10,
          opacity: 0.9,
          ease: 'none',
          transformOrigin: 'center center',
          scrollTrigger: {
            trigger: scope,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.4,
            invalidateOnRefresh: true,
          },
        })
      }

      parallaxNodes.forEach((node) => {
        if (compactViewport) {
          return
        }

        const depth = Number(node.dataset.depth ?? 18)

        gsap.fromTo(
          node,
          { y: depth },
          {
            y: depth * -1,
            ease: 'none',
            scrollTrigger: {
              trigger: node,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        )
      })

      if (progressLine) {
        gsap.fromTo(
          progressLine,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: progressLine,
              start: 'top 85%',
              end: 'bottom 60%',
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        )
      }

      refreshFrame = window.requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    }, scope)

    return () => {
      window.cancelAnimationFrame(refreshFrame)
      ctx.revert()
    }
  }, [reducedMotion, scopeRef])
}
