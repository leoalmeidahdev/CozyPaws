import { useState, type ComponentType } from 'react'
import { Check, Clock, GraduationCap, House, RotateCw, Scissors, Sparkles, Stethoscope, Truck, type LucideProps } from 'lucide-react'
import { photo, pics, type Pic } from '../lib/images'
import { d, ripple } from '../lib/interactions'

type Service = {
  name: string
  line: string
  icon: ComponentType<LucideProps>
  img: Pic
  perks: string[]
  price: string
}

const SERVICES: Service[] = [
  {
    name: 'Banho & Tosa',
    line: 'Banho, tosa higiênica, hidratação e perfume suave.',
    icon: Scissors,
    img: pics.goldenBath,
    perks: ['Hidratação com óleos naturais', 'Unhas e ouvidos limpinhos', 'Leva-e-traz grátis no Clube'],
    price: 'a partir de R$ 69',
  },
  {
    name: 'Veterinário',
    line: 'Consultas, vacinas e exames em um só lugar.',
    icon: Stethoscope,
    img: pics.catPetted,
    perks: ['Clínica geral e especialistas', 'Vacinas com carteirinha digital', 'Teleconsulta 24h'],
    price: 'a partir de R$ 140',
  },
  {
    name: 'Hotelzinho',
    line: 'Hospedagem aconchegante com câmera ao vivo.',
    icon: House,
    img: pics.catBlanket,
    perks: ['Suítes individuais climatizadas', 'Câmera 24h no seu celular', 'Recreação 3x ao dia'],
    price: 'R$ 95 / diária',
  },
  {
    name: 'Adestramento',
    line: 'Reforço positivo com especialistas.',
    icon: GraduationCap,
    img: pics.goldenFlower,
    perks: ['Aulas em casa ou na loja', 'Plano para filhotes e adultos', 'Relatório após cada aula'],
    price: 'R$ 120 / aula',
  },
]

const STEPS = [
  { icon: Clock, title: 'Escolha o horário', text: 'Agende pelo site ou WhatsApp em menos de um minuto.' },
  { icon: Truck, title: 'A gente busca seu pet', text: 'Nosso carro leva-e-traz chega no horário combinado.' },
  { icon: Sparkles, title: 'Ele volta feliz', text: 'Cheiroso, cuidado e com fotos do dia no seu celular.' },
]

/* 23 Card que vira */
function FlipCard({ s, i }: { s: Service; i: number }) {
  const [flipped, setFlipped] = useState(false)
  const Icon = s.icon
  const touch = () => window.matchMedia('(hover: none)').matches

  return (
    <div className="rv" style={d(i * 110)}>
      <div
        className="flip aspect-[3/4] w-full cursor-pointer"
        data-flipped={flipped}
        onClick={() => touch() && setFlipped((v) => !v)}
      >
        <div className="flip-inner">
          {/* front */}
          <div className="flip-face overflow-hidden rounded-[24px] bg-forest">
            <img src={photo(s.img, 700, 930)} alt={s.name} loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <span className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/95 text-forest">
              <Icon size={20} />
            </span>
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <h3 className="font-serif-display text-[30px] leading-none">{s.name}</h3>
              <p className="mt-2 text-sm text-white/80">{s.line}</p>
              <button
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-sage"
                onClick={(e) => {
                  e.stopPropagation()
                  setFlipped(true)
                }}
              >
                <RotateCw size={13} /> Ver detalhes
              </button>
            </div>
          </div>

          {/* back */}
          <div className="flip-face flip-back flex flex-col rounded-[24px] bg-forest p-6 text-mint">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-orange text-white">
              <Icon size={20} />
            </span>
            <h3 className="mt-5 font-serif-display text-[30px] leading-none">{s.name}</h3>
            <ul className="mt-5 space-y-3 text-sm text-mint/85">
              {s.perks.map((p) => (
                <li key={p} className="flex gap-2.5">
                  <Check size={16} className="mt-0.5 shrink-0 text-sage" /> {p}
                </li>
              ))}
            </ul>
            <div className="mt-auto">
              <p className="text-xs uppercase tracking-[0.14em] text-mint/50">Investimento</p>
              <p className="mt-1 text-xl font-semibold">{s.price}</p>
              <button
                onPointerDown={ripple}
                onClick={(e) => e.stopPropagation()}
                className="ripple-host mt-4 w-full rounded-full bg-orange py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
              >
                Agendar agora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <section id="servicos" data-bg="#effdf0" data-ink="#1a3d1a" className="px-4 py-24 md:px-8 md:py-36 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-end gap-6 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="rv text-xs font-semibold uppercase tracking-[0.18em] text-orange" data-rv="fade">
              Serviços
            </p>
            <h2 className="rv mt-4 font-serif-display text-[clamp(38px,5vw,72px)] leading-[1.02] tracking-tight" style={d(80)}>
              Cuidados com <span className="italic">carinho de casa</span>
            </h2>
          </div>
          <p className="rv max-w-md text-base text-ink/70 md:justify-self-end md:text-lg" style={d(160)}>
            Passe o mouse (ou toque) nos cards para ver o que está incluso em cada serviço.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <FlipCard key={s.name} s={s} i={i} />
          ))}
        </div>

        {/* Como funciona — 22 Traço que se desenha */}
        <div className="mt-24 md:mt-32">
          <h3 className="rv text-center font-serif-display text-[clamp(30px,3.4vw,48px)] leading-none tracking-tight">
            Como funciona o leva-e-traz
          </h3>

          <div className="draw relative mt-14" data-observe>
            <svg
              className="pointer-events-none absolute inset-x-[8%] top-0 hidden h-[90px] w-[84%] md:block"
              viewBox="0 0 1000 90"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden
            >
              <defs>
                <mask id="trail-mask">
                  <path
                    className="draw-path"
                    pathLength={1}
                    d="M10 45 C 180 -15, 320 105, 500 45 S 820 -15, 990 45"
                    stroke="white"
                    strokeWidth="8"
                  />
                </mask>
              </defs>
              <path
                d="M10 45 C 180 -15, 320 105, 500 45 S 820 -15, 990 45"
                stroke="#e86a10"
                strokeWidth="2.5"
                strokeDasharray="2 12"
                strokeLinecap="round"
                mask="url(#trail-mask)"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
              {STEPS.map((s, i) => {
                const Icon = s.icon
                return (
                  <li key={s.title} className="flex flex-col items-center text-center">
                    <span
                      className="rv relative grid h-[90px] w-[90px] place-items-center rounded-full border border-forest/10 bg-white text-forest shadow-[0_20px_40px_-24px_rgba(26,61,26,.5)]"
                      data-rv="pop"
                      style={d(300 + i * 450)}
                    >
                      <Icon size={30} />
                      <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-orange text-xs font-bold text-white">
                        {i + 1}
                      </span>
                    </span>
                    <h4 className="rv mt-6 text-xl font-semibold" style={d(400 + i * 450)}>
                      {s.title}
                    </h4>
                    <p className="rv mt-2 max-w-[260px] text-sm text-ink/65" style={d(480 + i * 450)}>
                      {s.text}
                    </p>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
