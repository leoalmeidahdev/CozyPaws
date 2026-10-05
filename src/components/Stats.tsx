import type { CSSProperties } from 'react'
import { Moon, Smile, Zap } from 'lucide-react'
import { d, useCounter } from '../lib/interactions'

function Counter({ to, decimals = 0, suffix = '' }: { to: number; decimals?: number; suffix?: string }) {
  const { ref, text } = useCounter(to, decimals)
  return (
    <span ref={ref} className="tabular-nums">
      {text}
      {suffix}
    </span>
  )
}

const BARS = [
  { label: 'Satisfação com a entrega', value: 98 },
  { label: 'Voltam a comprar em 30 dias', value: 87 },
  { label: 'Avaliações 5 estrelas', value: 91 },
]

const FIGURES = [
  { to: 98, suffix: ' mil+', label: 'tutores atendidos' },
  { to: 4.6, decimals: 1, suffix: '★', label: 'nota média' },
  { to: 2, suffix: 'h', label: 'tempo médio de entrega' },
  { to: 12, suffix: ' mil', label: 'avaliações verificadas' },
]

const CHIPS = [
  { icon: Zap, label: 'Energia', value: 92, cls: 'left-[-4%] top-[12%]', fd: '0s' },
  { icon: Moon, label: 'Sono', value: 88, cls: 'right-[-6%] top-[38%]', fd: '-2s' },
  { icon: Smile, label: 'Alegria', value: 99, cls: 'left-[2%] bottom-[6%]', fd: '-4s' },
]

export default function Stats() {
  return (
    <section id="numeros" data-bg="#1a3d1a" data-ink="#effdf0" className="overflow-hidden px-4 py-24 md:px-8 md:py-36 lg:px-12">
      <div className="mx-auto grid max-w-[1400px] items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="rv text-xs font-semibold uppercase tracking-[0.18em] text-sage" data-rv="fade">
            Em números
          </p>
          <h2 className="rv mt-4 font-serif-display text-[clamp(40px,5.4vw,80px)] leading-[1.02] tracking-tight" style={d(80)}>
            <span className="text-orange">
              <Counter to={96} suffix="%" />
            </span>{' '}
            dos tutores dizem que o pet ficou mais feliz<sup className="text-[0.35em] text-ink/50">1</sup>
          </h2>
          <p className="rv mt-6 max-w-lg text-base text-ink/70 md:text-lg" style={d(160)}>
            Acompanhamos cada pedido, banho e consulta para saber se fizemos diferença na rotina de vocês. Spoiler: fizemos.
          </p>

          {/* 11 Barra de progresso */}
          <div className="mt-10 space-y-6" data-observe>
            {BARS.map((b, i) => (
              <div key={b.label}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-ink/80">{b.label}</span>
                  <span className="font-semibold">
                    <Counter to={b.value} suffix="%" />
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-mint/10">
                  <div
                    className="bar-fill h-full rounded-full bg-gradient-to-r from-sage to-orange"
                    style={{ '--to': b.value / 100, '--d': `${200 + i * 180}ms` } as CSSProperties}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* "Índice Pet Feliz" — 22 Traço que se desenha + 14 Respirar + 13 Flutuar */}
        <div className="relative mx-auto w-full max-w-[460px]">
          <div className="draw rv relative aspect-square" data-rv="pop" data-observe>
            <div className="breathe absolute inset-[7%] rounded-full bg-deep" />
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
              <defs>
                <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#a2e6ac" />
                  <stop offset="100%" stopColor="#e86a10" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="88" fill="none" stroke="rgb(239 253 240 / .08)" strokeWidth="9" />
              <circle
                className="ring-arc"
                cx="100"
                cy="100"
                r="88"
                fill="none"
                stroke="url(#ring-grad)"
                strokeWidth="9"
                strokeLinecap="round"
                pathLength={1}
                style={{ '--gap': 0.04 } as CSSProperties}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-sage">Índice Pet Feliz</span>
              <span className="mt-2 font-serif-display text-[clamp(84px,12vw,150px)] leading-none">
                <Counter to={96} />
              </span>
              <span className="mt-2 rounded-full bg-mint/10 px-3 py-1 text-xs text-ink/80">+12 pontos este ano</span>
            </div>
          </div>

          {CHIPS.map((c, i) => {
            const Icon = c.icon
            return (
              <div key={c.label} className={`absolute ${c.cls}`}>
                <div className="float" style={{ '--fd': c.fd, '--ft': '7s' } as CSSProperties}>
                  <div
                    className="rv flex items-center gap-3 rounded-2xl bg-mint px-4 py-3 text-forest shadow-[0_20px_40px_-20px_rgba(0,0,0,.5)]"
                    data-rv="pop"
                    style={d(900 + i * 150)}
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-forest text-mint">
                      <Icon size={15} />
                    </span>
                    <div className="leading-tight">
                      <p className="text-[11px] text-forest/60">{c.label}</p>
                      <p className="text-lg font-semibold">{c.value}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 18 Contador */}
      <div className="mx-auto mt-20 grid max-w-[1400px] grid-cols-2 gap-x-6 gap-y-10 border-t border-mint/15 pt-12 md:mt-28 lg:grid-cols-4">
        {FIGURES.map((f, i) => (
          <div key={f.label} className="rv" style={d(i * 100)}>
            <p className="font-serif-display text-[clamp(44px,5vw,72px)] leading-none tracking-tight">
              <Counter to={f.to} decimals={f.decimals} suffix={f.suffix} />
            </p>
            <p className="mt-3 text-sm text-ink/60">{f.label}</p>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-14 max-w-[1400px] text-xs text-ink/40">
        1. Pesquisa com 3.200 clientes CozyPaws realizada em 2026, 30 dias após a primeira compra.
      </p>
    </section>
  )
}
