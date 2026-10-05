import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react'
import { onScroll, prefersReducedMotion } from './scroll'

/** Stagger delay helper: style={d(120)} -> --d: 120ms */
export const d = (ms: number, extra?: CSSProperties) => ({ '--d': `${ms}ms`, ...extra }) as CSSProperties

const finePointer = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

/** Fires once when the element enters the viewport. */
export function useInView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return { ref, inView }
}

/** True while the element is on screen (updates both ways). */
export function useVisible<T extends Element>(margin = '0px') {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: margin })
    io.observe(el)
    return () => io.disconnect()
  }, [margin])
  return { ref, visible }
}

/** 18 Contador — counts up once visible, easing out like the real number "lands". */
export function useCounter(target: number, decimals = 0, duration = 1800) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4)
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (prefersReducedMotion()) {
      setValue(target)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(2, -10 * t)
      setValue(target * (t === 1 ? 1 : eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])
  const text = value.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  return { ref, text }
}

/** 24 Inclinar em 3D — returns handlers for a .tilt element. */
export function useTilt(max = 10) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !finePointer() || prefersReducedMotion()) return
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      el.dataset.active = ''
      el.style.setProperty('--ry', `${(px - 0.5) * max * 2}deg`)
      el.style.setProperty('--rx', `${(0.5 - py) * max * 2}deg`)
      el.style.setProperty('--mx', `${px * 100}%`)
      el.style.setProperty('--my', `${py * 100}%`)
    }
    const leave = () => {
      delete el.dataset.active
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [max])
  return ref
}

/** 30 Ímã no cursor — element drifts toward the pointer while hovered. */
export function useMagnet<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !finePointer() || prefersReducedMotion()) return
    el.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)'
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - (r.left + r.width / 2)
      const y = e.clientY - (r.top + r.height / 2)
      el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`
    }
    const leave = () => (el.style.transform = 'translate3d(0,0,0)')
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [strength])
  return ref
}

/** 25 Onda no clique — attach as onPointerDown on a .ripple-host */
export function ripple(e: ReactPointerEvent<HTMLElement>) {
  const host = e.currentTarget
  const r = host.getBoundingClientRect()
  const size = Math.max(r.width, r.height) * 2.4
  const span = document.createElement('span')
  span.className = 'ripple'
  span.style.width = span.style.height = `${size}px`
  span.style.left = `${e.clientX - r.left}px`
  span.style.top = `${e.clientY - r.top}px`
  host.appendChild(span)
  span.addEventListener('animationend', () => span.remove())
}

/** 19 Máquina de escrever — types each phrase, erases, moves to the next. */
export function useTypewriter(phrases: string[], start: boolean, speed = 55) {
  const [text, setText] = useState('')
  useEffect(() => {
    if (!start) return
    if (prefersReducedMotion()) {
      setText(phrases[0])
      return
    }
    let phrase = 0
    let char = 0
    let deleting = false
    let timer = 0
    const step = () => {
      const current = phrases[phrase]
      char += deleting ? -1 : 1
      setText(current.slice(0, char))
      let delay = deleting ? speed * 0.45 : speed + Math.random() * 40
      if (!deleting && char === current.length) {
        deleting = true
        delay = 2200
      } else if (deleting && char === 0) {
        deleting = false
        phrase = (phrase + 1) % phrases.length
        delay = 400
      }
      timer = window.setTimeout(step, delay)
    }
    timer = window.setTimeout(step, 300)
    return () => clearTimeout(timer)
  }, [start, phrases, speed])
  return text
}

/** Subscribe a component to the shared scroll loop. */
export function useScrollFrame(cb: (y: number, vh: number) => void, deps: unknown[] = []) {
  useEffect(() => onScroll(cb), deps) // eslint-disable-line react-hooks/exhaustive-deps
}
