import { useRef, type CSSProperties } from 'react'
import { ArrowRight, ArrowUpRight, Play, Plus, Star } from 'lucide-react'
import { hero } from '../lib/images'
import { clamp01, scrollToTarget } from '../lib/scroll'
import { useScrollFrame } from '../lib/interactions'

const LINE_1 = ['Tudo', 'que']
const LINE_2 = ['seu', 'pet', 'ama']
// Keeps the golden retriever's head just below the heading on any aspect ratio
// (spec cap min(85vh, 70vw) + "never cover the title").
const CENTER_MAX_H =
  'min(85vh, 70vw, calc(100svh - var(--header-h) - clamp(2rem, 6vh, 5.4rem) - 1.9 * clamp(60px, min(7.5vw, 11vh), 110px) + 12px))'
const WORD_DELAYS = ['delay-200', 'delay-300', 'delay-400', 'delay-500', 'delay-600']

function Heading({ className }: { className: string }) {
  let i = 0
  const word = (w: string, italic = false) => (
    <span key={w} className={`animate-word-pop inline-block ${WORD_DELAYS[i++]} ${italic ? 'italic' : ''}`}>
      {w}
    </span>
  )
  return (
    <h1 className={`font-serif-display tracking-tight text-[#1a3d1a] ${className}`}>
      <span className="block">
        {LINE_1.map((w, k) => (
          <span key={w}>
            {word(w)}
            {k < LINE_1.length - 1 && ' '}
          </span>
        ))}
      </span>
      <span className="block">
        {LINE_2.map((w, k) => (
          <span key={w}>
            {word(w, w === 'ama')}
            {k < LINE_2.length - 1 && ' '}
          </span>
        ))}
      </span>
    </h1>
  )
}

function ProductCard({ imageClass = 'aspect-[260/257]' }: { imageClass?: string }) {
  return (
    <a href="#loja" onClick={(e) => (e.preventDefault(), scrollToTarget('#loja'))} className="group block">
      <div className={`relative overflow-hidden rounded-2xl bg-white ${imageClass}`}>
        <img
          src={hero.productCard}
          alt="Casinha arranhador laranja para gatos"
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
        />
        <span className="absolute bottom-2 right-2 grid h-9 w-9 place-items-center rounded-full bg-forest text-white transition-colors group-hover:bg-forest-hover lg:h-10 lg:w-10">
          <ArrowUpRight size={18} className="transition-transform duration-500 group-hover:rotate-45" />
        </span>
      </div>
      <p className="mt-2 text-[clamp(12px,0.95vw,16px)] text-gray-700">Casinha Arranhador</p>
      <p className="text-[clamp(14px,1.2vw,20px)] font-bold text-forest">R$ 249,90</p>
    </a>
  )
}

function VideoCard() {
  return (
    <div className="relative aspect-[177/287] overflow-hidden rounded-2xl">
      <img src={hero.videoCard} alt="Shiba recebendo uma caixa de brinquedos" className="h-full w-full object-cover" />
      <div className="absolute inset-x-0 bottom-0 top-[58%] flex flex-col items-center justify-center gap-2 px-3 text-center">
        <button
          aria-label="Assistir avaliações"
          className="pulse grid h-9 w-9 place-items-center rounded-full bg-forest text-white transition-colors hover:bg-forest-hover lg:h-10 lg:w-10"
          style={{ '--pulse': 'rgb(26 61 26 / .45)' } as CSSProperties}
        >
          <Play size={15} fill="currentColor" className="ml-0.5" />
        </button>
        <p className="text-[clamp(9px,0.72vw,12px)] font-medium leading-snug text-gray-700">
          Veja avaliações no TikTok e YouTube
        </p>
      </div>
    </div>
  )
}

function AvatarStack({ size = 40 }: { size?: number }) {
  return (
    <div className="flex items-center">
      <img
        src={hero.avatar}
        alt=""
        style={{ width: size, height: size }}
        className="rounded-full border-2 border-white object-cover"
      />
      <span
        style={{ width: size, height: size }}
        className="-ml-3 grid place-items-center rounded-full border-2 border-white bg-forest text-white"
      >
        <Plus size={size * 0.45} />
      </span>
    </div>
  )
}

function BottomPhotos({ maxH, overlays }: { maxH?: [string, string, string]; overlays: boolean }) {
  const bottom = { bottom: 'clamp(20px, 4vh, 50px)' }
  return (
    <div className="flex items-end">
      {/* left */}
      <div className="animate-photo-reveal delay-700 relative min-w-0 flex-1">
        <img
          src={hero.bottomLeft}
          alt="Dachshund espiando por cima do balcão"
          style={{ maxHeight: maxH?.[0] }}
          className="block h-auto w-full object-cover object-top"
        />
        {overlays && (
          <div className="animate-scale-in delay-1000 absolute inset-x-0 flex flex-col items-center gap-1" style={bottom}>
            <AvatarStack />
            <span className="text-[clamp(26px,3vw,48px)] font-semibold leading-none tracking-tight text-forest">98K+</span>
            <span className="text-[clamp(11px,0.9vw,14px)] font-medium text-forest/70">tutores felizes</span>
          </div>
        )}
      </div>

      {/* center — tallest */}
      <div className="animate-photo-reveal delay-600 relative min-w-0 flex-[1.265]">
        <div className="hero-photo-center relative">
          <img
            src={hero.bottomCenter}
            alt="Golden retriever com as patas no balcão"
            style={{ maxHeight: maxH?.[1] }}
            className="block h-auto w-full object-cover object-top"
          />
          {overlays && (
            <div className="animate-fade-up delay-1100 absolute inset-x-0 flex flex-col items-center gap-[clamp(10px,1.4vh,18px)] px-4 text-center" style={bottom}>
              <h2 className="font-serif-display text-[clamp(20px,2.2vw,38px)] leading-[1.05] text-white">
                Os melhores produtos
                <br />
                para o seu pet
              </h2>
              <button
                onClick={() => scrollToTarget('#loja')}
                className="shine inline-flex items-center gap-2 rounded-full bg-orange px-[clamp(16px,1.6vw,26px)] py-[clamp(9px,1.1vh,14px)] text-[clamp(12px,0.95vw,15px)] font-semibold text-white transition-colors hover:bg-orange-hover"
              >
                Ver produtos <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* right */}
      <div className="animate-photo-reveal delay-800 relative min-w-0 flex-1">
        <img
          src={hero.bottomRight}
          alt="Gato laranja espiando por cima do balcão"
          style={{ maxHeight: maxH?.[2] }}
          className="block h-auto w-full object-cover object-top"
        />
        {overlays && (
          <div className="animate-scale-in delay-1200 absolute inset-x-0 flex flex-col items-center gap-1" style={bottom}>
            <span className="flex items-center gap-2 text-[clamp(26px,3vw,48px)] font-semibold leading-none tracking-tight text-forest">
              4,6 <Star className="h-[0.75em] w-[0.75em] text-orange" fill="currentColor" />
            </span>
            <span className="text-[clamp(11px,0.9vw,14px)] font-medium text-forest/70">12 mil avaliações</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Hero() {
  const root = useRef<HTMLDivElement>(null)

  // Scroll-linked depth: text rises, photos sink, so the hero dissolves
  // into the next section instead of being "cut".
  useScrollFrame((y, vh) => {
    if (y > vh * 1.3) return
    root.current?.style.setProperty('--hp', clamp01(y / vh).toFixed(4))
  })

  return (
    <div
      id="inicio"
      ref={root}
      data-bg="#effdf0"
      data-ink="#1a3d1a"
      className="relative flex min-h-svh flex-col overflow-hidden md:h-svh"
    >
      <div className="shrink-0" style={{ height: 'var(--header-h)' }} />

      <section className="relative flex flex-1 flex-col overflow-hidden" aria-label="Destaque">
        {/* ---------- Desktop (lg+) ---------- */}
        <div className="absolute inset-0 hidden lg:block">
          <div className="hero-text-layer relative z-[5] px-12 pt-[clamp(2rem,6vh,5.4rem)] text-center">
            <Heading className="text-[clamp(60px,min(7.5vw,11vh),110px)] leading-[0.95]" />
          </div>

          <div className="hero-side-left absolute left-12 top-[50px] z-[6]">
            <div className="animate-slide-in-left delay-600" style={{ width: 'clamp(160px,14vw,260px)' }}>
              <ProductCard />
            </div>
          </div>

          <div className="hero-side-right absolute right-12 top-[50px] z-[6]">
            <div className="animate-slide-in-right delay-700" style={{ width: 'clamp(120px,10vw,177px)' }}>
              <VideoCard />
            </div>
          </div>

          <div className="hero-photos absolute inset-x-0 bottom-0 z-10">
            <BottomPhotos overlays maxH={['min(70vh, 55vw)', CENTER_MAX_H, 'min(70vh, 55vw)']} />
          </div>
        </div>

        {/* ---------- Tablet (md → lg) ---------- */}
        <div className="absolute inset-0 hidden md:block lg:hidden">
          <div className="hero-text-layer relative z-[5] px-8 pt-12 text-center">
            <Heading className="text-7xl leading-[0.95]" />
            <p className="animate-fade-up delay-700 mx-auto mt-6 max-w-sm text-base text-gray-600">
              Produtos, mimos e cuidados com entrega rápida para quem é da família.
            </p>
          </div>

          <div className="hero-side-left absolute left-4 top-[80px] z-[6]">
            <div className="animate-slide-in-left delay-600 w-[160px]">
              <ProductCard />
            </div>
          </div>
          <div className="hero-side-right absolute right-4 top-[80px] z-[6]">
            <div className="animate-slide-in-right delay-700 w-[120px]">
              <VideoCard />
            </div>
          </div>

          <div className="hero-photos absolute inset-x-0 bottom-0 z-10">
            <BottomPhotos overlays maxH={['60vh', '75vh', '60vh']} />
          </div>
        </div>

        {/* ---------- Mobile (< md) ---------- */}
        <div className="flex flex-col md:hidden">
          <div className="px-4 pt-6 text-center">
            <Heading className="text-[36px] leading-[1]" />
            <p className="animate-fade-up delay-500 mx-auto mt-3 max-w-[300px] text-sm text-gray-600">
              Produtos, mimos e cuidados com entrega rápida para quem é da família.
            </p>
            <button
              onClick={() => scrollToTarget('#loja')}
              className="animate-fade-up delay-600 shine mt-5 inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white"
            >
              Ver produtos <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-6 flex items-start gap-3 px-4">
            <div className="animate-slide-in-left delay-600 min-w-0 flex-[1.4]">
              <ProductCard imageClass="aspect-square" />
            </div>
            <div className="animate-slide-in-right delay-700 min-w-0 flex-1">
              <VideoCard />
            </div>
          </div>

          <div className="animate-fade-up delay-800 mx-4 mt-5 flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3">
            <div className="flex items-center gap-3">
              <AvatarStack size={34} />
              <div>
                <p className="text-xl font-semibold leading-none text-forest">98K+</p>
                <p className="text-[11px] text-forest/70">tutores felizes</p>
              </div>
            </div>
            <span className="h-10 w-px bg-forest/15" />
            <div className="text-right">
              <p className="flex items-center justify-end gap-1.5 text-xl font-semibold leading-none text-forest">
                4,6 <Star size={16} className="text-orange" fill="currentColor" />
              </p>
              <p className="text-[11px] text-forest/70">12 mil avaliações</p>
            </div>
          </div>

          <div className="mt-6">
            <BottomPhotos overlays={false} />
          </div>
        </div>
      </section>
    </div>
  )
}
