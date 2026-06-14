type SectionTitleProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionTitleProps) {
  const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left'
  const descriptionClass =
    align === 'center'
      ? 'mx-auto max-w-[640px] text-base leading-8 text-[--color-text-soft] sm:text-lg'
      : 'max-w-[620px] text-base leading-8 text-[--color-text-soft] sm:text-lg'

  return (
    <div className={`max-w-3xl space-y-5 ${alignment}`} data-reveal="section-title">
      {eyebrow ? (
        <p className="eyebrow">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold leading-[1.02] tracking-[-0.05em] text-[--color-text] sm:text-4xl lg:text-[3.35rem]">
        {title}
      </h2>
      {description ? (
        <p className={descriptionClass}>{description}</p>
      ) : null}
    </div>
  )
}
