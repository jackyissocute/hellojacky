import FuzzyText from './FuzzyText'
import { useFuzzyBurst } from '../context/FuzzyBurstContext'

type AccentFuzzyHeadingProps = {
  text: string
  className?: string
}

const FUZZY_BASE_INTENSITY = 0.12
const FUZZY_BURST_INTENSITY = 0.92
const FUZZY_RANGE = 18

export function AccentFuzzyHeading({ text, className }: AccentFuzzyHeadingProps) {
  const { burstSignal, accent } = useFuzzyBurst()

  return (
    <h2 className={`site-heading site-heading-fuzzy ${className ?? ''}`.trim()} aria-label={text}>
      <FuzzyText
        fontSize="1.5rem"
        fontWeight={700}
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
    </h2>
  )
}
