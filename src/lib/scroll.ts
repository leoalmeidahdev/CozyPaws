import Lenis from 'lenis'

type ScrollCallback = (y: number, vh: number) => void

const subscribers = new Set<ScrollCallback>()
let lenis: Lenis | null = null
let dirty = true
let started = false

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * One rAF loop for the whole page: drives Lenis (inertial smooth scroll)
 * and notifies every scroll-linked effect with the same frame timing,
 * which is what makes the page feel like one continuous surface.
 */
export function startScroll() {
  if (started) return
  started = true

  if (!prefersReducedMotion()) {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
    })
  }

  let lastY = -1
  const frame = (time: number) => {
    lenis?.raf(time)
    const y = window.scrollY
    if (y !== lastY || dirty) {
      lastY = y
      dirty = false
      const vh = window.innerHeight
      subscribers.forEach((cb) => cb(y, vh))
    }
    requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)

  const markDirty = () => (dirty = true)
  window.addEventListener('resize', markDirty)
  new ResizeObserver(markDirty).observe(document.body)
}

export function onScroll(cb: ScrollCallback) {
  subscribers.add(cb)
  dirty = true
  return () => {
    subscribers.delete(cb)
  }
}

export function scrollToTarget(target: string | number) {
  const offset = -(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 80) - 8
  if (lenis) {
    lenis.scrollTo(target, { offset: typeof target === 'number' ? 0 : offset, duration: 1.6 })
    return
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target })
    return
  }
  const el = document.querySelector(target)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset })
}

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

/* ---------- color morph between sections ---------- */

const hexToRgb = (hex: string) => {
  const n = parseInt(hex.replace('#', ''), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
const mix = (a: number[], b: number[], t: number) =>
  `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(' ')})`

/**
 * Sections declare data-bg / data-ink. While scrolling, the page background
 * is interpolated between neighbours, so there is never a hard edge between
 * sections. Text color stays scoped to each section (--ink on the section),
 * which keeps both the leaving and the arriving text readable mid-blend.
 *
 * Performance: colors are written straight to html/body background-color and
 * the progress bar's transform. Writing custom properties on :root every frame
 * would force a style recalculation of the whole document while scrolling.
 */
export function startThemeMorph() {
  const root = document.documentElement
  const body = document.body
  let sections: HTMLElement[] = []
  let colors: number[][] = []
  let bar: HTMLElement | null = null
  let lastBg = ''
  let lastProgress = -1

  const collect = () => {
    sections = Array.from(document.querySelectorAll<HTMLElement>('[data-bg]'))
    colors = sections.map((s) => hexToRgb(s.dataset.bg!))
    sections.forEach((s) => {
      s.style.setProperty('--ink', s.dataset.ink!)
      s.style.color = 'var(--ink)'
    })
    bar = document.querySelector<HTMLElement>('.scroll-progress')
  }

  return onScroll((y, vh) => {
    if (!sections.length || !sections[0].isConnected) collect()
    if (!sections.length) return

    // reads first…
    const probe = vh * 0.5
    const zone = vh * 0.32
    let idx = 0
    let nextTop = Infinity
    for (let i = 0; i < sections.length; i++) {
      const top = sections[i].getBoundingClientRect().top
      if (top <= probe) idx = i
      else {
        nextTop = top
        break
      }
    }
    const max = root.scrollHeight - vh

    // …then writes
    const next = colors[idx + 1]
    let t = next ? clamp01((probe + zone - nextTop) / zone) : 0
    t = t * t * (3 - 2 * t) // ease the blend so it feels organic, not linear
    const bg = mix(colors[idx], next ?? colors[idx], t)
    if (bg !== lastBg) {
      lastBg = bg
      root.style.backgroundColor = bg
      body.style.backgroundColor = bg
    }

    const progress = max > 0 ? Math.round(clamp01(y / max) * 1000) / 1000 : 0
    if (bar && progress !== lastProgress) {
      lastProgress = progress
      bar.style.transform = `scaleX(${progress})`
    }
  })
}

/* ---------- reveal on enter ---------- */

export function startReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-in', '')
          io.unobserve(entry.target)
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  )
  const scan = () =>
    document.querySelectorAll('.rv:not([data-in]), [data-observe]:not([data-in])').forEach((el) => io.observe(el))
  scan()
  return { io, scan }
}

/* ---------- pause looping animations off screen ---------- */

/**
 * Marquees, blobs, floating photos, gradients… loop forever. Sections that are
 * far from the viewport get [data-offscreen] and CSS pauses everything inside,
 * so the main thread only paints what the visitor can actually see.
 */
export function startOffscreenPause() {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) entry.target.removeAttribute('data-offscreen')
        else entry.target.setAttribute('data-offscreen', '')
      }
    },
    { rootMargin: '300px 0px' },
  )
  document.querySelectorAll('[data-bg]').forEach((el) => io.observe(el))
  return () => io.disconnect()
}
