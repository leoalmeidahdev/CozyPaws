import { Star } from 'lucide-react'
import { photo, pics } from '../lib/images'
import { d } from '../lib/interactions'

const STORIES = [
  {
    tag: 'Saúde',
    quote:
      'A teleconsulta às 2h da manhã salvou a nossa noite. O veterinário foi atencioso e o remédio chegou em menos de duas horas.',
    name: 'Camila R.',
    pet: 'tutora da Luna',
    img: pics.orangeCat,
  },
  {
    tag: 'Banho & Tosa',
    quote:
      'O Thor odiava banho. Hoje ele abana o rabo quando vê o carro do leva-e-traz da CozyPaws chegando na porta de casa.',
    name: 'Rafael M.',
    pet: 'tutor do Thor',
    img: pics.cockerGrass,
  },
  {
    tag: 'Clube',
    quote:
      'Com o clube, a ração chega sozinha todo mês e ainda vem um mimo surpresa. A Mel já reconhece a caixa e fica esperando!',
    name: 'Juliana S.',
    pet: 'tutora da Mel',
    img: pics.shihTzu,
  },
]

export default function Testimonials() {
  return (
    <section id="historias" data-bg="#ffe9d6" data-ink="#1a3d1a" className="overflow-hidden px-4 py-24 md:px-8 md:py-36 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <h2 className="rv max-w-3xl font-serif-display text-[clamp(38px,5vw,72px)] leading-[1.02] tracking-tight">
            Histórias reais de <span className="italic text-orange">rabos abanando</span>
          </h2>
          <div className="rv flex items-center gap-4" data-rv="pop" style={d(150)}>
            <span className="font-serif-display text-6xl leading-none">4,6</span>
            <div>
              <div className="flex gap-0.5 text-orange">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} fill={i < 4 ? 'currentColor' : 'none'} />
                ))}
              </div>
              <p className="mt-1 text-sm text-forest/60">12 mil avaliações verificadas</p>
            </div>
          </div>
        </div>

        {/* 06 Deslizar da lateral */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {STORIES.map((s, i) => (
            <figure
              key={s.name}
              className="rv flex flex-col rounded-[28px] bg-white p-7 shadow-[0_30px_60px_-40px_rgba(232,106,16,.6)] md:p-8"
              data-rv={i === 0 ? 'left' : i === 2 ? 'right' : 'up'}
              style={d(i * 140)}
            >
              <span className="w-max rounded-full bg-peach px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-orange">
                {s.tag}
              </span>
              <blockquote className="mt-6 font-serif-display text-[22px] leading-[1.3] text-forest md:text-[24px]">
                “{s.quote}”
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-8">
                <img src={photo(s.img, 120, 120)} alt="" loading="lazy" className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-forest">{s.name}</p>
                  <p className="text-sm text-forest/60">{s.pet}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
