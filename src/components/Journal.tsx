import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { photo, pics, type Pic } from '../lib/images'
import { d } from '../lib/interactions'

const POSTS = [
  { cat: 'Filhotes', title: 'Filhote em casa: o guia do primeiro mês', time: '6 min', img: pics.puppySunset },
  { cat: 'Convivência', title: 'Gato e cachorro juntos? Sim, dá certo', time: '4 min', img: pics.catDogCuddle },
  { cat: 'Pequenos pets', title: 'Porquinhos-da-índia também merecem mimos', time: '5 min', img: pics.guineaPigs },
]

const GALLERY_A = [pics.beagle, pics.catGreen, pics.frenchieShirt, pics.aussieBeach, pics.kitten, pics.tollerBeach, pics.samoyed]
const GALLERY_B = [pics.schnauzerYellow, pics.catSunglasses, pics.aussiePuppies, pics.dogSelfie, pics.catSleeping, pics.jackRussell, pics.catDogGrass]

function GalleryRow({ ids, reverse, speed }: { ids: Pic[]; reverse?: boolean; speed: string }) {
  const loop = [...ids, ...ids]
  return (
    <div className="marquee-host overflow-hidden">
      <div className={`marquee ${reverse ? 'marquee-reverse' : ''}`} style={{ '--speed': speed } as CSSProperties}>
        {loop.map((id, i) => (
          <div key={i} className="mr-4 h-[180px] w-[150px] shrink-0 overflow-hidden rounded-[22px] md:h-[260px] md:w-[210px]">
            <img
              src={photo(id, 420, 520)}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Journal() {
  return (
    <section id="blog" data-bg="#fbf7ef" data-ink="#1a3d1a" className="pb-24 pt-24 md:pb-32 md:pt-36">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 lg:px-12">
        <div className="flex items-end justify-between gap-6">
          <h2 className="rv font-serif-display text-[clamp(38px,5vw,72px)] leading-[1.02] tracking-tight">
            Diário <span className="italic text-orange">CozyPaws</span>
          </h2>
          <a href="#blog" className="rv u-line hidden text-sm font-semibold md:inline" data-rv="fade" style={d(150)}>
            Ver todos os artigos
          </a>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          {/* featured — Oura "In the news" style */}
          <div className="rv" data-rv="mask">
            <a href="#blog" className="group relative block h-full min-h-[440px] overflow-hidden rounded-[28px] bg-forest md:min-h-[560px]">
              <img
                src={photo(pics.dogReading, 1400)}
                alt="Cachorro de óculos lendo uma revista"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-[#f7f1e8] md:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Matéria em destaque</p>
                <h3 className="mt-3 max-w-xl text-[clamp(26px,3vw,40px)] leading-[1.15] tracking-tight">
                  Como escolher a ração ideal para cada fase da vida
                </h3>
                <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#f7f1e8] px-5 py-3 text-sm font-semibold text-forest">
                  Ler matéria <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45" />
                </span>
              </div>
            </a>
          </div>

          <div className="flex flex-col divide-y divide-forest/10">
            {POSTS.map((p, i) => (
              <a
                key={p.title}
                href="#blog"
                className="rv group flex items-center gap-5 py-6 first:pt-0 last:pb-0"
                data-rv="right"
                style={d(i * 120)}
              >
                <div className="h-[104px] w-[104px] shrink-0 overflow-hidden rounded-2xl md:h-[128px] md:w-[128px]">
                  <img
                    src={photo(p.img, 300, 300)}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange">
                    {p.cat} · {p.time} de leitura
                  </p>
                  {/* 09 Sublinhado */}
                  <h3 className="mt-2 text-[clamp(18px,1.7vw,24px)] leading-snug">
                    <span className="u-line">{p.title}</span>
                  </h3>
                </div>
                <ArrowUpRight className="ml-auto hidden shrink-0 text-forest/40 transition-all duration-500 group-hover:rotate-45 group-hover:text-orange sm:block" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* #CozyPawsNaVida — 17 Esteira infinita em duas direções */}
      <div className="mt-24 md:mt-32">
        <p className="rv px-4 text-center font-serif-display text-[clamp(28px,3vw,44px)] leading-none">
          Marque <span className="italic text-orange">#CozyPawsNaVida</span> e apareça aqui
        </p>
        <div className="mt-10 space-y-4">
          <GalleryRow ids={GALLERY_A} speed="60s" />
          <GalleryRow ids={GALLERY_B} speed="70s" reverse />
        </div>
      </div>
    </section>
  )
}
