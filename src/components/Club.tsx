import { ArrowRight, Check, PawPrint } from 'lucide-react'
import { photo, pics } from '../lib/images'
import { d, ripple, useMagnet, useTilt } from '../lib/interactions'

const PERKS = [
  '15% de desconto em toda a loja, sempre',
  'Frete grátis ilimitado, sem valor mínimo',
  'Banho com leva-e-traz incluso',
  'Teleconsulta veterinária 24h',
  'Um mimo surpresa na porta todo mês',
]

/* 08 Girar — circular text badge */
function SpinBadge() {
  return (
    <div className="relative h-[140px] w-[140px] md:h-[170px] md:w-[170px]">
      <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text fontSize="15" fontWeight="600" letterSpacing="2" fill="#1a3d1a" textLength="486" lengthAdjust="spacing">
          <textPath href="#badge-circle">CLUBE COZYPAWS ✦ 1º MÊS GRÁTIS ✦ 15% OFF ✦</textPath>
        </text>
      </svg>
      <span className="absolute inset-[30%] grid place-items-center rounded-full bg-orange text-white">
        <PawPrint className="h-1/2 w-1/2" />
      </span>
    </div>
  )
}

export default function Club() {
  const tilt = useTilt(12)
  const magnet = useMagnet<HTMLSpanElement>(0.3)

  return (
    <section id="clube" data-bg="#fbf7ef" data-ink="#1a3d1a" className="overflow-hidden px-4 py-24 md:px-8 md:py-36 lg:px-12">
      <div className="mx-auto grid max-w-[1400px] items-center gap-16 lg:grid-cols-2">
        <div>
          <p className="rv text-xs font-semibold uppercase tracking-[0.18em] text-orange" data-rv="fade">
            Assinatura
          </p>
          <h2 className="mt-4 font-serif-display text-[clamp(40px,5.2vw,76px)] leading-[1.04] tracking-tight">
            <span className="rv block" style={d(60)}>
              Mimos o ano inteiro
            </span>
            {/* 21 Cortina */}
            <span className="block">
              com o{' '}
              <span className="curtain" data-observe style={d(250)}>
                <span className="curtain-txt italic text-orange">Clube CozyPaws</span>
              </span>
            </span>
          </h2>
          <p className="rv mt-6 max-w-lg text-base text-forest/70 md:text-lg" style={d(150)}>
            Uma assinatura simples que cuida da rotina por você: economia em tudo e benefícios que o seu pet sente.
          </p>

          <ul className="mt-8 space-y-3">
            {PERKS.map((p, i) => (
              <li key={p} className="rv flex items-center gap-3 text-forest" data-rv="left" style={d(200 + i * 90)}>
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sage/60 text-forest">
                  <Check size={15} />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <div className="rv mt-10 flex flex-wrap items-center gap-6" style={d(300)}>
            <div>
              <p className="text-sm text-forest/60">por apenas</p>
              <p className="font-serif-display text-[44px] leading-none">
                R$ 19,90<span className="font-sans text-base text-forest/60">/mês</span>
              </p>
            </div>
            {/* 30 Ímã no cursor + 07 Pulsar + 10 Brilho */}
            <span ref={magnet} className="inline-block">
              <button
                onPointerDown={ripple}
                className="pulse shine shine-loop ripple-host inline-flex items-center gap-2 rounded-full bg-orange px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
              >
                Quero fazer parte <ArrowRight size={16} />
              </button>
            </span>
          </div>
          <p className="rv mt-4 text-xs text-forest/50" data-rv="fade" style={d(400)}>
            1º mês grátis. Cancele quando quiser, sem multa.
          </p>
        </div>

        <div className="relative h-[460px] md:h-[560px]">
          {/* 28 Forma que muda */}
          <div className="blob absolute left-[8%] top-[6%] h-[78%] w-[80%] bg-sage/70" />
          <div className="blob absolute bottom-[4%] right-[2%] h-[40%] w-[40%] bg-orange/80" style={{ animationDelay: '-5s' }} />

          <div className="rv absolute -left-2 bottom-0 w-[42%] max-w-[230px] md:left-0" data-rv="pop" style={d(500)}>
            <div className="blob-shape aspect-square border-4 border-cream">
              <img src={photo(pics.corgiHearts, 500, 500)} alt="Corgi com corações" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="absolute right-0 top-0 md:right-4">
            <SpinBadge />
          </div>

          {/* 24 Inclinar em 3D + 20 Gradiente vivo */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="rv w-[min(86%,440px)]" data-rv="blur" style={d(200)}>
              <div
                ref={tilt}
                className="tilt grad-live relative aspect-[1.586] overflow-hidden rounded-[22px] p-6 text-white shadow-[0_40px_80px_-30px_rgba(26,61,26,.7)] md:p-8"
              >
                <PawPrint className="absolute -right-6 -top-6 h-40 w-40 rotate-12 text-white/10" />
                <div className="relative flex h-full flex-col justify-between" style={{ transform: 'translateZ(40px)' }}>
                  <div className="flex items-start justify-between">
                    <span className="font-serif-display text-2xl md:text-3xl">CozyPaws</span>
                    <span className="rounded-full border border-white/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]">
                      Clube
                    </span>
                  </div>
                  <div className="h-8 w-11 rounded-md bg-gradient-to-br from-yellow-200 to-amber-400 opacity-90" />
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.16em] text-white/60">Membros</p>
                      <p className="mt-1 text-lg font-semibold md:text-xl">Paçoca &amp; Ana</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-white/60">Desde</p>
                      <p className="mt-1 font-mono text-sm">03/2026</p>
                    </div>
                  </div>
                </div>
                <div className="tilt-glare pointer-events-none absolute inset-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
