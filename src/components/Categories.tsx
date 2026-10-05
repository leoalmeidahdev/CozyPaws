import { Fragment, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { photo, pics } from '../lib/images'
import { clamp01, scrollToTarget } from '../lib/scroll'
import { d, useScrollFrame } from '../lib/interactions'

const CATS = [
  {
    name: 'Alimentação',
    title: 'Nutrição que dá energia para brincar o dia todo',
    desc: 'Rações premium, naturais e terapêuticas, com recomendação por idade, porte e raça.',
    count: 320,
    img: pics.puppyBowl,
  },
  {
    name: 'Petiscos',
    title: 'Mimos que viram recompensa (e muito amor)',
    desc: 'Biscoitos, bifinhos e snacks naturais sem corantes, perfeitos para o adestramento.',
    count: 140,
    img: pics.biscuits,
  },
  {
    name: 'Conforto',
    title: 'Camas tão boas que você vai querer uma',
    desc: 'Caminhas, casinhas, arranhadores e mantas para cada cantinho da casa.',
    count: 96,
    img: pics.dogBed,
  },
  {
    name: 'Banho & Tosa',
    title: 'Cheiroso, macio e sem estresse',
    desc: 'Profissionais certificados, produtos hipoalergênicos e leva-e-traz grátis para o Clube.',
    count: 12,
    img: pics.goldenBath,
  },
  {
    name: 'Moda & Passeio',
    title: 'Estilo para cada passeio',
    desc: 'Coleiras, guias, peitorais e roupinhas confortáveis para todas as estações.',
    count: 210,
    img: pics.frenchieHoodie,
  },
  {
    name: 'Saúde',
    title: 'Saúde em dia, rabo abanando',
    desc: 'Vacinas, antipulgas, suplementos e teleconsulta com veterinários 24h.',
    count: 180,
    img: pics.highFive,
  },
]

export default function Categories() {
  const stack = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  // Stacked sticky cards: the card being covered shrinks and dims,
  // the incoming one settles its photo — one continuous movement.
  // Element refs and sizes are cached (re-measured only when the viewport
  // height changes), so each frame does one batch of reads, then writes.
  const cache = useRef<{
    vh: number
    cards: { card: HTMLElement; inner: HTMLElement; shade: HTMLElement; img: HTMLElement; h: number; stick: number }[]
  } | null>(null)

  useScrollFrame((_, vh) => {
    const root = stack.current
    if (!root) return
    const rr = root.getBoundingClientRect()
    if (rr.bottom < 0 || rr.top > vh) return

    if (!cache.current || cache.current.vh !== vh) {
      cache.current = {
        vh,
        cards: Array.from(root.querySelectorAll<HTMLElement>('[data-card]')).map((card) => {
          const inner = card.firstElementChild as HTMLElement
          return {
            card,
            inner,
            shade: inner.querySelector<HTMLElement>('[data-shade]')!,
            img: inner.querySelector<HTMLElement>('[data-img]')!,
            h: inner.offsetHeight,
            stick: parseFloat(getComputedStyle(card).top) || 0,
          }
        }),
      }
    }

    const { cards } = cache.current
    const tops = cards.map((c) => c.card.getBoundingClientRect().top)
    let current = 0
    cards.forEach((c, i) => {
      const next = tops[i + 1]
      const cover = next === undefined ? 0 : clamp01(1 - (next - tops[i] - 24) / c.h)
      const enter = clamp01((vh - tops[i]) / Math.max(1, vh - c.stick))
      c.inner.style.transform = `scale(${(1 - cover * 0.07).toFixed(4)})`
      c.shade.style.opacity = (cover * 0.6).toFixed(3)
      c.img.style.transform = `scale(${(1.18 - enter * 0.18).toFixed(4)})`
      if (tops[i] <= vh * 0.5) current = i
    })
    setActive(current)
  })

  const goTo = (i: number) => {
    const anchor = stack.current?.querySelectorAll<HTMLElement>('[data-anchor]')[i]
    if (!anchor) return
    const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 80
    scrollToTarget(anchor.getBoundingClientRect().top + window.scrollY - headerH - 80)
  }

  return (
    <section id="categorias" data-bg="#1a3d1a" data-ink="#effdf0" className="relative pb-24 md:pb-36">
      <div className="mx-auto max-w-[1400px] px-4 pt-24 md:px-8 md:pt-36 lg:px-12">
        <div className="grid items-end gap-6 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="rv text-xs font-semibold uppercase tracking-[0.18em] text-sage" data-rv="fade">
              Categorias
            </p>
            <h2 className="rv mt-4 font-serif-display text-[clamp(38px,5.2vw,76px)] leading-[1.02] tracking-tight" style={d(80)}>
              Tudo o que ele precisa, <span className="italic text-sage">em um só lugar</span>
            </h2>
          </div>
          <p className="rv max-w-md text-base text-ink/70 md:justify-self-end md:text-lg" style={d(160)}>
            Mais de 950 produtos escolhidos a dedo, separados do jeito que você procura: pelo que o seu pet precisa hoje.
          </p>
        </div>

        {/* tabs follow the card in view */}
        <div
          className="sticky z-30 -mx-4 mt-10 overflow-x-auto px-4 py-3 no-scrollbar md:mx-0 md:px-0"
          style={{ top: 'calc(var(--header-h) + 4px)' }}
        >
          <div className="flex w-max gap-2 rounded-full bg-forest/80 p-1.5 backdrop-blur-md">
            {CATS.map((c, i) => (
              <button
                key={c.name}
                onClick={() => goTo(i)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-500 ${
                  active === i ? 'bg-mint text-forest' : 'text-mint/70 hover:text-mint'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div ref={stack} className="mt-4">
          {CATS.map((c, i) => (
            <Fragment key={c.name}>
              <div data-anchor />
              <div
                data-card
                className="sticky"
                style={{ top: `calc(var(--header-h) + 76px + ${i * 10}px)`, marginBottom: i < CATS.length - 1 ? '26vh' : 0 }}
              >
                <article className="relative h-[min(66vh,620px)] origin-top overflow-hidden rounded-[28px] bg-deep will-change-transform md:h-[min(72vh,680px)]">
                  <img
                    data-img
                    src={photo(c.img, 1600)}
                    alt={c.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/25 to-black/0" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/45 to-transparent" />

                  <span className="absolute bottom-6 right-6 font-serif-display text-[clamp(56px,9vw,140px)] italic leading-none text-white/25 md:bottom-8 md:right-10">
                    0{i + 1}
                  </span>

                  <div className="absolute inset-x-0 top-0 p-6 text-[#f7f1e8] md:p-12">
                    <p className="rv text-xs font-semibold uppercase tracking-[0.18em] text-white/70" data-rv="fade">
                      {c.name} · {c.count}+ produtos
                    </p>
                    <h3 className="rv mt-3 max-w-2xl text-[clamp(28px,3.4vw,48px)] font-light leading-[1.05] tracking-tight" style={d(80)}>
                      {c.title}
                    </h3>
                    <p className="rv mt-4 max-w-md text-sm text-white/75 md:text-base" style={d(160)}>
                      {c.desc}
                    </p>
                    <button
                      onClick={() => scrollToTarget('#loja')}
                      className="rv group mt-6 inline-flex items-center gap-2 rounded-full bg-[#f7f1e8] px-5 py-3 text-sm font-semibold text-forest transition-colors hover:bg-white"
                      style={d(240)}
                    >
                      Explorar {c.name.toLowerCase()}
                      <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
                    </button>
                  </div>
                  <div data-shade className="pointer-events-none absolute inset-0 bg-black opacity-0" />
                </article>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
