/** Frame-rate-independent exponential smoothing (dt from gsap.ticker.deltaRatio()). */
export function expSmooth(
  current: number,
  target: number,
  lambda: number,
  dt: number,
): number {
  const t = 1 - Math.exp(-lambda * dt)
  return current + (target - current) * t
}

export function expSmooth2D(
  current: { x: number; y: number },
  target: { x: number; y: number },
  lambda: number,
  dt: number,
): { x: number; y: number } {
  return {
    x: expSmooth(current.x, target.x, lambda, dt),
    y: expSmooth(current.y, target.y, lambda, dt),
  }
}

/** True when current is close enough to target to snap. */
export function isSettled(current: number, target: number, epsilon = 0.001): boolean {
  return Math.abs(target - current) < epsilon
}
