import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Heart, Plus, Star } from 'lucide-react'
import { hero, photo, pics } from '../lib/images'
import { brl, useCart } from '../lib/cart'
import { clamp01 } from '../lib/scroll'
import { d, ripple, useMagnet, useScrollFrame } from '../lib/interactions'

type Product = {
  name: string
  category: string
  price: number
  old?: number
  rating: number
  img: string
  contain?: boolean
  tag?: string
}

const PRODUCTS: Product[] = [
  { name: 'Casinha Arranhador Cozy', category: 'Gatos', price: 249.9, old: 299.9, rating: 4.9, img: hero.productCard, contain: true, tag: 'Mais vendido' },
  { name: 'Ração Natural Frango & Batata-doce 10kg', category: 'Cães', price: 189.9, rating: 4.8, img: photo(pics.kibbleBowl, 600, 750) },
  { name: 'Ossinhos Crocantes de Aveia', category: 'Petiscos', price: 29.9, rating: 4.7, img: photo(pics.biscuits, 600, 750), tag: 'Novo' },
  { name: 'Cama Nuvem Ortopédica', category: 'Conforto', price: 219.9, rating: 4.9, img: photo(pics.dogBed, 600, 750) },
  { name: 'Caminha de Fibra Natural', category: 'Conforto', price: 179.9, rating: 4.6, img: photo(pics.basketBed, 600, 750) },
  { name: 'Camiseta Pet Ensolarada', category: 'Moda', price: 69.9, old: 87.4, rating: 4.8, img: photo(pics.frenchieShirt, 600, 750), tag: '-20%' },
  { name: 'Coleira Azul Refletiva', category: 'Passeio', price: 59.9, rating: 4.8, img: photo(pics.labCollar, 600, 750) },
  { name: 'Óculos Fashion Pet', category: 'Acessórios', price: 49.9, rating: 4.5, img: photo(pics.schnauzerGlasses, 600, 750), tag: 'Viral' },
]

/* Own component: ticking every second no longer re-renders the whole shelf. */
function Countdown() {
  const [left, setLeft] = useState('')
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const end = new Date(now)
      end.setHours(23, 59, 59, 999)
      const s = Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000))
      const pad = (n: number) => String(n).padStart(2, '0')
      setLeft(`${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`)
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="text-xs font-medium tabular-nums text-forest/60">termina em {left}</span>
}

const desktopQuery = window.matchMedia('(min-width: 768px)')

function ProductCard({ p, i }: { p: Product; i: number }) {
  const [loaded, setLoaded] = useState(false)
  const [liked, setLiked] = useState(false)
  const { add } = useCart()

  return (
    <div className="rv w-[260px] shrink-0 snap-start md:w-[300px]" style={d(Math.min(i, 4) * 90)}>
      {/* 03 Elevar no hover */}
      <article className="lift group h-full rounded-[24px] bg-white p-3">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-mint">
          {/* 15 Esqueleto while the photo loads */}
          {!loaded && <div className="skel absolute inset-0" />}
          <img
            src={p.img}
            alt={p.name}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            data-loaded={loaded}
            className={`img-fade h-full w-full group-hover:scale-105 ${p.contain ? 'object-contain p-5' : 'object-cover'}`}
          />
          {p.tag && (
            <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-forest">
              {p.tag}
            </span>
          )}
          <button
            aria-label={liked ? 'Remover dos favoritos' : 'Favoritar'}
            aria-pressed={liked}
            onClick={() => setLiked((v) => !v)}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-forest transition-transform active:scale-90"
          >
            <Heart
              size={16}
              key={String(liked)}
              className={liked ? 'badge-bump text-orange' : ''}
              fill={liked ? 'currentColor' : 'none'}
            />
          </button>
        </div>

        <div className="px-1 pb-1 pt-4">
          <p className="text-xs text-forest/50">{p.category}</p>
          <h3 className="mt-1 line-clamp-2 min-h-[2.6em] font-medium leading-snug text-forest">{p.name}</h3>
          <div className="mt-2 flex items-end justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold text-forest">{brl(p.price)}</span>
              {p.old && <s className="text-xs text-forest/40">{brl(p.old)}</s>}
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-forest/70">
              <Star size={13} className="text-orange" fill="currentColor" />
              {p.rating.toLocaleString('pt-BR')}
            </span>
          </div>
          {/* 25 Onda no clique */}
          <button
            onPointerDown={ripple}
            onClick={() => add({ name: p.name, price: p.price, image: p.img })}
            className="ripple-host mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-forest py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-hover"
          >
            <Plus size={16} /> Adicionar
          </button>
        </div>
      </article>
    </div>
  )
}

function EndCard() {
  const magnet = useMagnet<HTMLSpanElement>(0.4)
  return (
    <div className="rv w-[260px] shrink-0 snap-start md:w-[300px]" data-rv="pop">
      <a
        href="#loja"
        className="group flex h-full min-h-[420px] flex-col justify-between rounded-[24px] bg-forest p-7 text-mint"
      >
        <p className="font-serif-display text-[40px] leading-[1.02] tracking-tight">
          Mais de <span className="italic text-sage">950</span> produtos esperando por ele
        </p>
        <span ref={magnet} className="grid h-20 w-20 place-items-center self-end rounded-full bg-orange text-white">
          <ArrowRight size={28} className="transition-transform duration-500 group-hover:-rotate-45" />
        </span>
      </a>
    </div>
  )
}

export default function Products() {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const measured = useRef<{ vh: number; distance: number } | null>(null)
  const lastP = useRef(-1)

  // Track width only changes on resize: measure then, not on every frame.
  useEffect(() => {
    const t = track.current
    if (!t) return
    const ro = new ResizeObserver(() => (measured.current = null))
    ro.observe(t)
    return () => ro.disconnect()
  }, [])

  // Vertical scroll drives the horizontal shelf (pinned on md+),
  // so the page never "stops" — it just changes direction.
  useScrollFrame((_, vh) => {
    const s = section.current
    const t = track.current
    if (!s || !t) return
    if (!desktopQuery.matches) {
      if (s.style.height) s.style.height = ''
      if (t.style.transform) t.style.transform = ''
      measured.current = null
      return
    }
    if (!measured.current || measured.current.vh !== vh) {
      const distance = Math.max(0, t.scrollWidth - t.clientWidth)
      measured.current = { vh, distance }
      s.style.height = `${Math.round(vh + distance)}px`
      lastP.current = -1
    }
    const { distance } = measured.current
    const r = s.getBoundingClientRect()
    const p = Math.round(clamp01(-r.top / Math.max(1, r.height - vh)) * 2000) / 2000
    if (p === lastP.current) return
    lastP.current = p
    t.style.transform = `translate3d(${(-p * distance).toFixed(1)}px,0,0)`
    if (bar.current) bar.current.style.transform = `scaleX(${p})`
  })

  return (
    <section id="loja" ref={section} data-bg="#fbf7ef" data-ink="#1a3d1a" className="relative">
      <div className="flex flex-col justify-center py-24 md:sticky md:top-0 md:h-svh md:overflow-hidden md:py-0 md:pt-[var(--header-h)]">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-4 md:flex-row md:items-end md:justify-between md:px-8 lg:px-12">
          <div>
            <div className="rv flex flex-wrap items-center gap-3" data-rv="fade">
              {/* 29 Texto com falha */}
              <span
                className="glitch rounded-full bg-forest px-3 py-1.5 text-[11px] font-bold tracking-[0.16em] text-mint"
                data-text="OFERTA RELÂMPAGO"
              >
                OFERTA RELÂMPAGO
              </span>
              <Countdown />
            </div>
            <h2 className="rv mt-4 font-serif-display text-[clamp(38px,5vw,72px)] leading-[1.02] tracking-tight" style={d(80)}>
              Os mais amados <span className="italic text-orange">da semana</span>
            </h2>
          </div>
          <div className="rv flex flex-col gap-3 md:items-end" style={d(160)}>
            <p className="max-w-xs text-sm text-forest/70 md:text-right">
              Escolhidos pelos tutores, aprovados pelos pets. Role para passear pela prateleira.
            </p>
            <div className="hidden h-[3px] w-48 overflow-hidden rounded-full bg-forest/10 md:block">
              <div ref={bar} className="h-full origin-left scale-x-0 rounded-full bg-orange" />
            </div>
          </div>
        </div>

        <div
          ref={track}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 will-change-transform md:snap-none md:gap-6 md:overflow-visible md:px-8 lg:px-12"
        >
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.name} p={p} i={i} />
          ))}
          <EndCard />
          <div aria-hidden className="w-px shrink-0 md:w-2 lg:w-6" />
        </div>
      </div>
    </section>
  )
}
