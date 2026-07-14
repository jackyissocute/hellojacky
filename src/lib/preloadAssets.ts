import { PUBLIC_ASSETS } from '../config/site'
import { repoAsset } from './repoAsset'

export type PreloadProgress = {
  /** 0–1 real load fraction */
  progress: number
  label: string
}

type AssetStep = {
  id: string
  label: string
  weight: number
  load: (onFraction: (f: number) => void) => Promise<void>
}

function decodeBlobUrl(url: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      if (img.decode) {
        img.decode().then(() => resolve(), () => resolve())
      } else {
        resolve()
      }
    }
    img.onerror = () => resolve()
    img.src = url
  })
}

/** Fetch with byte progress when Content-Length is present; always decode pixels. */
async function loadImage(
  src: string,
  onFraction: (f: number) => void,
): Promise<void> {
  try {
    const res = await fetch(src)
    if (!res.ok) throw new Error(String(res.status))
    const total = Number(res.headers.get('content-length')) || 0
    if (res.body && total > 0) {
      const reader = res.body.getReader()
      const chunks: Uint8Array[] = []
      let received = 0
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        if (value) {
          chunks.push(value)
          received += value.byteLength
          onFraction(Math.min(1, received / total))
        }
      }
      const blob = new Blob(chunks)
      const url = URL.createObjectURL(blob)
      try {
        await decodeBlobUrl(url)
      } finally {
        URL.revokeObjectURL(url)
      }
      onFraction(1)
      return
    }
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    try {
      await decodeBlobUrl(url)
    } finally {
      URL.revokeObjectURL(url)
    }
    onFraction(1)
  } catch {
    // Fallback: classic Image() — no byte progress
    await new Promise<void>((resolve) => {
      const img = new Image()
      img.onload = () => {
        if (img.decode) {
          img.decode().then(() => resolve(), () => resolve())
        } else {
          resolve()
        }
      }
      img.onerror = () => resolve()
      img.src = src
    })
    onFraction(1)
  }
}

async function loadFonts(onFraction: (f: number) => void): Promise<void> {
  onFraction(0)
  if (!document.fonts?.load) {
    onFraction(1)
    return
  }
  await Promise.all([
    document.fonts.load('400 16px "Geist Mono"'),
    document.fonts.load('500 16px "Geist Mono"'),
    document.fonts.load('600 16px "Geist Mono"'),
    document.fonts.load('700 16px "Geist Mono"'),
  ])
  await document.fonts.ready
  onFraction(1)
}

const STEPS: AssetStep[] = [
  { id: 'fonts', label: 'fonts', weight: 0.15, load: loadFonts },
  {
    id: 'profile',
    label: 'profile',
    weight: 0.25,
    load: (onFraction) => loadImage(repoAsset(PUBLIC_ASSETS.profilePhoto), onFraction),
  },
  {
    id: 'portrait',
    label: 'portrait',
    weight: 0.3,
    load: (onFraction) =>
      loadImage(repoAsset(PUBLIC_ASSETS.portraitLuminance), onFraction),
  },
  {
    id: 'color',
    label: 'color map',
    weight: 0.3,
    load: (onFraction) =>
      loadImage(repoAsset(PUBLIC_ASSETS.portraitColor), onFraction),
  },
]

let shared: Promise<void> | null = null
let last: PreloadProgress = { progress: 0, label: 'boot' }
const listeners = new Set<(p: PreloadProgress) => void>()

function emit(next: PreloadProgress) {
  last = next
  for (const cb of listeners) cb(next)
}

function nextPaint() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve())
  })
}

async function runPreload(): Promise<void> {
  let done = 0
  emit({ progress: 0, label: 'boot' })
  await nextPaint()

  for (const step of STEPS) {
    emit({ progress: done, label: step.label })
    let lastEmit = done
    await step.load((fraction) => {
      const next = Math.min(1, done + step.weight * Math.min(1, Math.max(0, fraction)))
      // ~1% UI updates — still real progress, less React thrash
      if (next - lastEmit < 0.01 && fraction < 1) return
      lastEmit = next
      emit({ progress: next, label: step.label })
    })
    done += step.weight
    emit({ progress: Math.min(1, done), label: step.label })
    await nextPaint()
  }

  emit({ progress: 1, label: 'ready' })
}

/** Preload critical first-paint assets. Deduped across StrictMode remounts. */
export function preloadCriticalAssets(
  onProgress?: (p: PreloadProgress) => void,
): Promise<void> {
  if (onProgress) {
    listeners.add(onProgress)
    onProgress(last)
  }

  if (!shared) {
    shared = runPreload().finally(() => {
      listeners.clear()
    })
  }

  return shared.then(() => {
    if (onProgress) listeners.delete(onProgress)
  })
}

export function getPreloadSnapshot(): PreloadProgress {
  return last
}
