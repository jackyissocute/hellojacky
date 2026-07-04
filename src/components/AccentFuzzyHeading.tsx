import { AccentFuzzyText } from './AccentFuzzyText'

type AccentFuzzyHeadingProps = {
  text: string
  className?: string
}

export function AccentFuzzyHeading({ text, className }: AccentFuzzyHeadingProps) {
  return (
    <AccentFuzzyText
      as="h2"
      text={text}
      className={`site-heading site-heading-fuzzy ${className ?? ''}`.trim()}
      fontSize="1.5rem"
      fontWeight={700}
    />
  )
}
