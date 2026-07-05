/** Interactive targets that should win over the portrait long-press hint when nearby. */
export const PRIORITY_PROXIMITY_SELECTORS = [
  '.site-view-all',
  '.site-resume-link',
  '.site-social-link',
] as const

/** Per-target proximity padding (px). Smaller targets get more; large targets get less. */
export const PROXIMITY_PADDING_BY_SELECTOR: Record<string, number> = {
  '.site-social-link': 20,
  '.site-resume-link': 14,
  '.site-view-all': 72,
}

export const DEFAULT_CURSOR_TARGET_PADDING = 10

/** Bias toward keeping the current lock so nearby targets do not fight. */
export const TARGET_SWITCH_STICKINESS = 16

export function isPointInExpandedRect(
  x: number,
  y: number,
  rect: DOMRect,
  padding: number,
): boolean {
  return (
    x >= rect.left - padding &&
    x <= rect.right + padding &&
    y >= rect.top - padding &&
    y <= rect.bottom + padding
  )
}

export function distanceToRect(x: number, y: number, rect: DOMRect): number {
  const dx = x < rect.left ? rect.left - x : x > rect.right ? x - rect.right : 0
  const dy = y < rect.top ? rect.top - y : y > rect.bottom ? y - rect.bottom : 0
  return Math.hypot(dx, dy)
}

export function getProximityPadding(element: Element): number {
  for (const [selector, padding] of Object.entries(PROXIMITY_PADDING_BY_SELECTOR)) {
    if (element.matches(selector)) return padding
  }
  return DEFAULT_CURSOR_TARGET_PADDING
}

export function getNearestCursorTarget(
  x: number,
  y: number,
  targetSelector = '.cursor-target',
  activeTarget: Element | null = null,
  stickiness = TARGET_SWITCH_STICKINESS,
): Element | null {
  const candidates = document.querySelectorAll<HTMLElement>(targetSelector)
  let best: { el: Element; score: number } | null = null
  let activeDist = activeTarget
    ? distanceToRect(x, y, activeTarget.getBoundingClientRect())
    : Infinity

  for (const el of candidates) {
    const rect = el.getBoundingClientRect()
    if (rect.width === 0 && rect.height === 0) continue

    const dist = distanceToRect(x, y, rect)
    const padding = getProximityPadding(el)
    if (dist > padding) continue

    let score = dist

    if (activeTarget) {
      if (el === activeTarget) {
        score -= stickiness * 0.55
      } else {
        const advantage = activeDist - dist
        // Resist switching only when the newcomer is not clearly closer.
        if (advantage < 10) score += stickiness * 0.35
      }
    }

    if (!best || score < best.score) {
      best = { el, score }
    }
  }

  return best?.el ?? null
}

/** @deprecated Use getNearestCursorTarget instead. */
export function getPriorityProximityTarget(
  x: number,
  y: number,
  padding = PROXIMITY_PADDING_BY_SELECTOR['.site-view-all'],
): Element | null {
  for (const selector of PRIORITY_PROXIMITY_SELECTORS) {
    const element = document.querySelector(selector)
    if (!element) continue

    const rect = element.getBoundingClientRect()
    const targetPadding = getProximityPadding(element)
    if (isPointInExpandedRect(x, y, rect, Math.min(padding, targetPadding))) return element
  }

  return null
}

/** True when the pointer should prefer a tracking box over the long-press hint. */
export function isLongPressSuppressedZone(
  x: number,
  y: number,
  _padding = PROXIMITY_PADDING_BY_SELECTOR['.site-view-all'],
): boolean {
  const el = document.elementFromPoint(x, y)
  if (el) {
    for (const selector of PRIORITY_PROXIMITY_SELECTORS) {
      if (el.closest(selector)) return true
    }
  }

  return getNearestCursorTarget(x, y, PRIORITY_PROXIMITY_SELECTORS.join(', ')) !== null
}
