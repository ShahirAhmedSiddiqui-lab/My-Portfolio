import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { SectionTitle } from '../components/SectionTitle'
import { SkillPill } from '../components/SkillPill'
import { skillGroups } from '../data/skills'

const SkillsOrbitPreview = lazy(async () => {
  const module = await import('../components/skills/SkillsOrbitPreview')
  return { default: module.SkillsOrbitPreview }
})

export function Skills() {
  const previewRef = useRef<HTMLDivElement | null>(null)
  const [previewReady, setPreviewReady] = useState(false)

  useEffect(() => {
    const previewNode = previewRef.current

    if (!previewNode || previewReady) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setPreviewReady(true)
          observer.disconnect()
        }
      },
      { rootMargin: '240px 0px' },
    )

    observer.observe(previewNode)

    return () => {
      observer.disconnect()
    }
  }, [previewReady])

  return (
    <section className="section-shell" id="skills">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-8">
          <SectionTitle
            eyebrow="04 / Skills"
            title="Skills that connect design, code, and performance."
            description="A live orbit preview that reflects how design, frontend systems, and performance thinking move together."
          />

          <div className="glass-panel-strong rounded-[1.85rem] p-6">
            <div
              className="relative aspect-square overflow-hidden rounded-[1.6rem] border border-white/10 bg-[radial-gradient(circle_at_50%_34%,rgba(214,185,129,0.14),transparent_20%),radial-gradient(circle_at_72%_64%,rgba(124,255,178,0.12),transparent_26%),radial-gradient(circle_at_24%_28%,rgba(77,141,255,0.14),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.42))]"
              ref={previewRef}
            >
              {previewReady ? (
                <Suspense fallback={<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,185,129,0.08),transparent_42%)]" />}>
                  <SkillsOrbitPreview />
                </Suspense>
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,185,129,0.08),transparent_42%)]" />
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-4" data-stagger>
          {skillGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,8,10,0.92),rgba(10,10,12,0.84))] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl"
              data-stagger-item
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-[1.35rem] font-semibold text-[--color-text]">{group.title}</h3>
                <span
                  className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
                  style={{ borderColor: `${group.accent}55`, color: group.accent }}
                >
                  Active Group
                </span>
              </div>
              <div className="mt-5 flex flex-wrap gap-3" data-stagger>
                {group.skills.map((skill) => (
                  <SkillPill accent={group.accent} key={skill} label={skill} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
