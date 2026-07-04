type SplitHeadingProps = {
  text: string
  className?: string
}

export function SplitHeading({ text, className }: SplitHeadingProps) {
  return (
    <h2 className={className}>
      {text.split('').map((char, index) => (
        <span key={`${char}-${index}`} className={char === ' ' ? 'split-heading-space' : undefined}>
          {char}
        </span>
      ))}
    </h2>
  )
}
