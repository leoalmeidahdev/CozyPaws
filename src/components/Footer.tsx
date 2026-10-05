import { useState, type CSSProperties, type FormEvent, type ReactNode } from 'react'
import { ArrowUp, PawPrint } from 'lucide-react'
import { scrollToTarget } from '../lib/scroll'
import { d, ripple, useMagnet, useTypewriter, useVisible } from '../lib/interactions'

const TYPED = ['cupons exclusivos', 'dicas de veterinários', 'mimos antes de todo mundo']

const COLUMNS = [
  { title: 'Loja', links: ['Cães', 'Gatos', 'Pequenos pets', 'Ofertas'] },
  { title: 'Serviços', links: ['Banho & Tosa', 'Veterinário', 'Hotelzinho', 'Adestramento'] },
  { title: 'Ajuda', links: ['Entrega', 'Trocas e devoluções', 'Pagamento', 'Fale conosco'] },
  { title: 'CozyPaws', links: ['Sobre nós', 'Clube', 'Blog', 'Trabalhe conosco'] },
]

const SOCIAL: { label: string; icon: ReactNode }[] = [
  {
    label: 'Instagram',
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
      </>
    ),
  },
  {
    label: 'TikTok',
    icon: (
      <>
        <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
        <path d="M14 3c.6 2.6 2.4 4.4 5 4.6" />
      </>
    ),
  },
  {
    label: 'YouTube',
    icon: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="4" />
        <path d="M10 9.2 15 12l-5 2.8z" fill="currentColor" />
      </>
    ),
  },
]

/**
 * 19 Máquina de escrever — isolated so only this line re-renders while typing.
 * Every phrase is stacked invisibly in the same grid cell, so the line keeps
 * the height of the longest one: the page no longer grows and shrinks (which
 * made the bottom of the page jump on its own). Typing pauses off screen.
 */
function TypedLine() {
  const { ref, visible } = useVisible<HTMLSpanElement>()
  const typed = useTypewriter(TYPED, visible)
  return (
    <span ref={ref} className="grid italic text-orange">
      {TYPED.map((t) => (
        <span key={t} aria-hidden className="invisible col-start-1 row-start-1">
          {t}
          <span className="caret" />
        </span>
      ))}
      <span className="col-start-1 row-start-1">
        {typed}
        <span className="caret" aria-hidden />
      </span>
    </span>
  )
}

/* 30 Ímã no cursor */
function SocialLink({ label, icon }: { label: string; icon: ReactNode }) {
  const ref = useMagnet<HTMLAnchorElement>(0.45)
  return (
    <a
      ref={ref}
      href="#"
      aria-label={label}
      onClick={(e) => e.preventDefault()}
      className="grid h-12 w-12 place-items-center rounded-full border border-mint/20 text-mint transition-colors hover:border-orange hover:bg-orange"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {icon}
      </svg>
    </a>
  )
}

export default function Footer() {
  const [sent, setSent] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <footer data-bg="#0f260f" data-ink="#effdf0" className="overflow-hidden px-4 pt-24 md:px-8 md:pt-32 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <h2 className="font-serif-display text-[clamp(36px,4.8vw,68px)] leading-[1.05] tracking-tight">
            Receba no seu e-mail
            <TypedLine />
          </h2>

          <div className="rv" style={d(120)}>
            {sent ? (
              <p className="flex items-center gap-3 rounded-full bg-mint/10 px-6 py-4 text-mint">
                <PawPrint size={18} className="text-orange" /> Prontinho! Confira sua caixa de entrada.
              </p>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="news-email" className="sr-only">
                  Seu e-mail
                </label>
                <input
                  id="news-email"
                  type="email"
                  required
                  placeholder="seu@email.com"
                  className="min-w-0 flex-1 rounded-full border border-mint/20 bg-transparent px-6 py-4 text-mint placeholder:text-mint/40 focus:border-orange focus:outline-none"
                />
                <button
                  type="submit"
                  onPointerDown={ripple}
                  className="ripple-host rounded-full bg-orange px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
                >
                  Quero receber
                </button>
              </form>
            )}
            <p className="mt-3 text-xs text-mint/40">Sem spam. Só coisa boa, no máximo uma vez por semana.</p>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-10 border-t border-mint/10 pt-14 md:grid-cols-5">
          {COLUMNS.map((col, i) => (
            <div key={col.title} className="rv" style={d(i * 90)}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mint/50">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" onClick={(e) => e.preventDefault()} className="u-line text-sm text-mint/85 hover:text-mint">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="rv col-span-2 md:col-span-1" style={d(360)}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mint/50">Siga a gente</p>
            <div className="mt-5 flex gap-3">
              {SOCIAL.map((s) => (
                <SocialLink key={s.label} {...s} />
              ))}
            </div>
          </div>
        </div>

        {/* 27 Texto em onda */}
        <p
          className="wave mt-20 select-none whitespace-nowrap text-center font-serif-display text-[clamp(72px,19vw,300px)] leading-[0.82] tracking-tight text-mint"
          data-observe
          aria-label="CozyPaws"
        >
          {'CozyPaws'.split('').map((ch, i) => (
            <span key={i} style={{ '--i': i } as CSSProperties} aria-hidden className={i >= 4 ? 'italic text-orange' : ''}>
              {ch}
            </span>
          ))}
        </p>

        {/* relative z-10: the giant wordmark's "y" tail overflows down here and,
            being an animated (transformed) layer, would otherwise eat the clicks */}
        <div className="relative z-10 flex flex-col items-center justify-between gap-4 border-t border-mint/10 py-8 text-xs text-mint/50 md:flex-row">
          <p>© 2026 CozyPaws. Feito com amor (e muitos petiscos).</p>
          {/* The whole credit is the link, with padding, so it is an easy target */}
          <a
            href="https://github.com/leoalmeidahdev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Desenvolvido por Leonardo de Almeida Henrique — GitHub (abre em nova aba)"
            className="group relative z-10 -my-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-xl px-4 py-2 text-center text-mint/60 transition-colors hover:bg-mint/5"
          >
            <PawPrint size={14} className="text-orange" />
            Desenvolvido por{' '}
            <span className="u-line font-signature text-[15px] tracking-[0.04em] text-mint transition-colors group-hover:text-orange">
              Leonardo de Almeida Henrique
            </span>
          </a>
          {/* 16 Quicar */}
          <button
            onClick={() => scrollToTarget(0)}
            className="group inline-flex items-center gap-3 text-mint/80 transition-colors hover:text-mint"
          >
            Voltar ao topo
            <span className="bounce grid h-10 w-10 place-items-center rounded-full bg-mint/10 group-hover:bg-orange">
              <ArrowUp size={16} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
