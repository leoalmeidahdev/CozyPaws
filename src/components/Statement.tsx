import { useRef, type CSSProperties } from 'react'
import { ArrowRight, PawPrint } from 'lucide-react'
import { photo, pics } from '../lib/images'
import { clamp01, prefersReducedMotion, scrollToTarget } from '../lib/scroll'
import { d, useScrollFrame } from '../lib/interactions'

const RIBBON_A = ['Frete grátis acima de R$ 199', 'Entrega em até 2h', 'Parcele em 6x sem juros', 'Troca fácil em 30 dias', 'Vet online 24h']
const RIBBON_B = ['Ração', 'Petiscos', 'Brinquedos', 'Camas', 'Banho & Tosa', 'Veterinário', 'Hotelzinho', 'Adestramento']
const BRANDS = ['Pelúcia & Co.', 'BomPet', 'Natura Paws', 'Miau Club', 'Farejo', 'Rabo Feliz', 'Petit Gourmet', 'Oásis Pet']

const STATEMENT =
  'Cuidar de um pet é cuidar da *família.* Por isso escolhemos cada produto como se fosse para o *nosso.*'

/* 17 Esteira infinita — two crossing ribbons */
function Ribbon({ items, className, speed, reverse }: { items: string[]; className: string; speed: string; reverse?: boolean }) {
  const loop = [...items, ...items, ...items, ...items]
  return (
    <div className={`marquee-host absolute left-[-5vw] w-[110vw] py-3 md:py-4 ${className}`}>
      <div className={`marquee ${reverse ? 'marquee-reverse' : ''}`} style={{ '--speed': speed } as CSSProperties}>
        {loop.map((t, i) => (
          <span key={i} className="flex shrink-0 items-center gap-6 pr-6 font-serif-display text-[26px] leading-none md:text-[38px]">
            {t}
            <PawPrint className="h-5 w-5 shrink-0 md:h-7 md:w-7" />
          </span>
        ))}
      </div>
    </div>
  )
}

const FLOATERS = [
  { id: pics.kittenPaw, cls: 'left-[4%] top-[14%] w-[110px] md:w-[170px]', speed: -120, ft: '7s', fd: '0s', r: '-4deg' },
  { id: pics.corgiOrange, cls: 'right-[5%] top-[8%] w-[96px] md:w-[150px]', speed: -60, ft: '6s', fd: '-2s', r: '5deg' },
  { id: pics.pugYellow, cls: 'left-[9%] bottom-[10%] hidden md:block md:w-[140px]', speed: 90, ft: '8s', fd: '-1s', r: '3deg' },
  { id: pics.whiteCat, cls: 'right-[8%] bottom-[14%] hidden md:block md:w-[180px]', speed: 150, ft: '7.5s', fd: '-3s', r: '-3deg' },
]

export default function Statement() {
  const textRef = useRef<HTMLParagraphElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const words = STATEMENT.split(' ')

  // 26 Desfoque que resolve — linked to scroll: each word sharpens as you read
  const els = useRef<{ spans: HTMLSpanElement[]; floaters: HTMLElement[] } | null>(null)
  const lastP = useRef(-1)

  useScrollFrame((_, vh) => {
    const text = textRef.current
    const section = sectionRef.current
    if (!text || !section) return
    // reads
    const r = text.getBoundingClientRect()
    const sr = section.getBoundingClientRect()
    if (sr.bottom < -vh * 0.5 || sr.top > vh * 1.5) return
    els.current ??= {
      spans: Array.from(text.querySelectorAll<HTMLSpanElement>('[data-w]')),
      floaters: Array.from(section.querySelectorAll<HTMLElement>('[data-speed]')),
    }
    const { spans, floaters } = els.current

    // writes — parallax for the floating pets
    const sp = clamp01((vh - sr.top) / (sr.height + vh)) - 0.5
    floaters.forEach((el) => {
      el.style.transform = `translate3d(0, ${(sp * Number(el.dataset.speed)).toFixed(1)}px, 0)`
    })

    // words only change while the paragraph is being read
    const p = prefersReducedMotion() ? 1 : Math.round(clamp01((vh * 0.88 - r.top) / (r.height + vh * 0.45)) * 1000) / 1000
    if (p === lastP.current) return
    lastP.current = p
    const n = spans.length
    spans.forEach((s, i) => {
      const wp = clamp01(p * (n + 4) - i)
      s.style.opacity = String(0.12 + 0.88 * wp)
      s.style.filter = wp >= 1 ? 'none' : `blur(${((1 - wp) * 8).toFixed(2)}px)`
      s.style.transform = wp >= 1 ? 'none' : `translateY(${((1 - wp) * 10).toFixed(1)}px)`
    })
  })

  return (
    <section id="sobre" data-bg="#effdf0" data-ink="#1a3d1a" className="relative">
      <div className="relative h-[150px] overflow-hidden md:h-[210px]" aria-hidden>
        <Ribbon items={RIBBON_A} speed="46s" className="top-[30%] -rotate-3 bg-orange text-white shadow-[0_20px_40px_-20px_rgba(232,106,16,.6)]" />
        <Ribbon items={RIBBON_B} speed="52s" reverse className="top-[34%] rotate-2 bg-forest text-mint" />
      </div>

      <div ref={sectionRef} className="relative overflow-hidden px-4 py-28 md:px-8 md:py-44">
        {FLOATERS.map((f) => (
          <div key={f.id} data-speed={f.speed} className={`pointer-events-none absolute ${f.cls}`}>
            <div
              className="float"
              style={{ '--ft': f.ft, '--fd': f.fd, '--r': f.r } as CSSProperties}
            >
              {/* 28 Forma que muda — the photo itself morphs */}
              <div className="blob-shape aspect-square w-full shadow-[0_24px_50px_-24px_rgba(26,61,26,.5)]">
                <img src={photo(f.id, 360, 360)} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        ))}

        <div className="relative mx-auto max-w-5xl text-center">
          <span className="rv inline-flex items-center gap-2 rounded-full border border-forest/15 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-forest" data-rv="pop">
            <PawPrint size={14} className="text-orange" /> Feito por quem é tutor
          </span>

          <p
            ref={textRef}
            className="mt-8 font-serif-display text-[clamp(34px,5.4vw,80px)] leading-[1.04] tracking-tight"
          >
            {words.map((w, i) => {
              const accent = w.startsWith('*')
              return (
                <span key={i}>
                  <span data-w className={`inline-block ${accent ? 'italic text-orange' : ''}`}>
                    {w.replaceAll('*', '')}
                  </span>{' '}
                </span>
              )
            })}
          </p>

          <p className="rv mx-auto mt-10 max-w-xl text-base text-ink/70 md:text-lg" style={d(100)}>
            Curadoria feita com veterinários, entrega no mesmo dia e um time que entende de rabo abanando.
          </p>
          <div className="rv mt-8 flex flex-wrap items-center justify-center gap-3" style={d(200)}>
            <button
              onClick={() => scrollToTarget('#categorias')}
              className="shine inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-forest-hover"
            >
              Explorar categorias <ArrowRight size={16} />
            </button>
            <button
              onClick={() => scrollToTarget('#servicos')}
              className="rounded-full border border-forest/20 px-6 py-3.5 text-sm font-semibold transition-colors hover:border-forest hover:bg-white/60"
            >
              Nossos serviços
            </button>
          </div>
        </div>
      </div>

      {/* Marcas — 17 Esteira infinita */}
      <div id="marcas" className="pb-24 md:pb-32">
        <p className="rv text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink/50" data-rv="fade">
          Marcas que a gente ama
        </p>
        <div
          className="marquee-host mt-8 overflow-hidden"
          style={{ maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)' }}
        >
          <div className="marquee" style={{ '--speed': '38s' } as CSSProperties}>
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <span
                key={i}
                className={`shrink-0 px-8 text-[28px] leading-none text-ink/45 transition-colors hover:text-ink md:px-12 md:text-[36px] ${
                  i % 3 === 0 ? 'font-serif-display italic' : i % 3 === 1 ? 'font-semibold tracking-tight' : 'font-serif-display'
                }`}
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
