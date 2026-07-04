import type { ElementType } from 'react'
import FuzzyText from './FuzzyText'
import { useFuzzyBurst } from '../context/FuzzyBurstContext'

export const FUZZY_BASE_INTENSITY = 0.12
export const FUZZY_BURST_INTENSITY = 0.92
export const FUZZY_RANGE = 18

type AccentFuzzyTextProps = {
  text: string
  as?: ElementType
  className?: string
  fontSize: number | string
  fontWeight?: number | string
}

export function AccentFuzzyText({
  text,
  as: Tag = 'span',
  className,
  fontSize,
  fontWeight = 700,
}: AccentFuzzyTextProps) {
  const { burstSignal, accent } = useFuzzyBurst()

  return (
    <Tag className={className} aria-label={text}>
      <FuzzyText
        fontSize={fontSize}
        fontWeight={fontWeight}
        fontFamily="inherit"
        color={accent}
        enableHover={false}
        baseIntensity={FUZZY_BASE_INTENSITY}
        hoverIntensity={FUZZY_BASE_INTENSITY}
        fuzzRange={FUZZY_RANGE}
        fps={60}
        direction="horizontal"
        burstSignal={burstSignal}
        burstIntensity={FUZZY_BURST_INTENSITY}
        burstRiseDuration={180}
        burstFallDuration={420}
        className="accent-fuzzy-text"
      >
        {text}
      </FuzzyText>
    </Tag>
  )
}
