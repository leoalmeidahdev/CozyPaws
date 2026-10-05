import { useRef, useState } from 'react'
import { Menu, Search, ShoppingCart, Star, X } from 'lucide-react'
import { hero } from '../lib/images'
import { useCart } from '../lib/cart'
import { scrollToTarget } from '../lib/scroll'
import { useScrollFrame } from '../lib/interactions'

export const NAV = [
  { label: 'Início', href: '#inicio' },
  { label: 'Loja', href: '#loja' },
  { label: 'Entrega e pagamento', href: '#ajuda' },
  { label: 'Marcas', href: '#marcas' },
  { label: 'Blog', href: '#blog' },
]

function Badge({ value, bumpKey }: { value: number | string; bumpKey?: number }) {
  return (
    <span
      key={bumpKey}
      className={`absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full border-2 border-background bg-orange text-[10px] font-bold leading-none text-white ${bumpKey ? 'badge-bump' : ''}`}
    >
      {value}
    </span>
  )
}

export default function Header() {
  const { count, bump } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#inicio')
  const [open, setOpen] = useState(false)

  const targets = useRef<(Element | null)[]>([])

  useScrollFrame((y, vh) => {
    setScrolled(y > 24)
    // highlight the nav item of the section under the header
    if (!targets.current.length || !targets.current[0]?.isConnected)
      targets.current = NAV.map((item) => document.querySelector(item.href))
    let current = '#inicio'
    let best = -Infinity
    for (let i = 0; i < NAV.length; i++) {
      const item = NAV[i]
      const top = targets.current[i]?.getBoundingClientRect().top ?? Infinity
      if (top < vh * 0.4 && top > best) {
        best = top
        current = item.href
      }
    }
    setActive(current)
  })

  const go = (href: string) => {
    setOpen(false)
    scrollToTarget(href === '#inicio' ? 0 : href)
  }

  return (
    <>
      {/* 11 Barra de progresso — reading progress */}
      <div className="scroll-progress fixed inset-x-0 top-0 z-[60] h-[3px] bg-orange" aria-hidden />

      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`mx-auto flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
            scrolled
              ? 'mt-2 w-[calc(100%-16px)] max-w-[1400px] rounded-full bg-white/80 px-3 py-2 shadow-[0_10px_40px_-18px_rgba(26,61,26,.45)] backdrop-blur-md sm:w-[calc(100%-32px)] lg:mt-3 lg:w-[calc(100%-48px)] lg:px-5'
              : 'mt-0 w-full max-w-[2400px] rounded-none bg-white/0 px-4 py-4 md:px-8 lg:px-12'
          }`}
        >
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault()
              go('#inicio')
            }}
            className="animate-fade-in delay-100 shrink-0"
            aria-label="CozyPaws — início"
          >
            <img
              src={hero.logo}
              alt="CozyPaws"
              className={`block transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
                scrolled ? 'h-[33px] w-[130px] lg:h-[40px] lg:w-[158px]' : 'h-[33px] w-[130px] lg:h-[52px] lg:w-[205px]'
              }`}
            />
          </a>

          <nav className="animate-fade-up delay-200 hidden items-center gap-8 lg:flex" aria-label="Principal">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  go(item.href)
                }}
                aria-current={active === item.href}
                className={`u-line whitespace-nowrap text-sm font-medium transition-colors ${
                  active === item.href ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="animate-fade-in delay-300 flex items-center gap-2 sm:gap-3">
            <button
              aria-label="Buscar"
              className="hidden h-10 w-10 place-items-center rounded-full border border-forest/15 text-forest transition-colors hover:bg-forest hover:text-white sm:grid"
            >
              <Search size={18} />
            </button>
            <button
              aria-label="Favoritos"
              className="relative grid h-10 w-10 place-items-center rounded-full bg-orange text-white transition-colors hover:bg-orange-hover"
            >
              <Star size={18} fill="currentColor" />
              <Badge value={4} />
            </button>
            <button
              aria-label={`Carrinho, ${count} itens`}
              className="relative grid h-10 w-10 place-items-center rounded-full border border-forest/15 text-forest transition-colors hover:bg-forest hover:text-white"
            >
              <ShoppingCart size={18} />
              <Badge value={count} bumpKey={bump} />
            </button>
            <img
              src={hero.avatar}
              alt="Sua conta"
              className="hidden h-10 w-10 rounded-full object-cover sm:block"
            />
            <button
              aria-label="Abrir menu"
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full bg-forest text-white lg:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — 05 Cascata */}
      {open && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-forest px-6 pb-10 pt-5 text-mint lg:hidden" data-lenis-prevent>
          <div className="flex items-center justify-between">
            <span className="font-serif-display text-2xl">CozyPaws</span>
            <button
              aria-label="Fechar menu"
              onClick={() => setOpen(false)}
              className="grid h-10 w-10 place-items-center rounded-full border border-mint/25"
            >
              <X size={18} />
            </button>
          </div>
          <nav className="mt-14 flex flex-col gap-5" aria-label="Menu móvel">
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  go(item.href)
                }}
                className="font-serif-display text-[42px] leading-none tracking-tight"
                style={{ animation: `menu-in .7s cubic-bezier(.16,1,.3,1) ${80 + i * 70}ms both` }}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <p className="mt-auto text-sm text-mint/60">Atendimento todos os dias, das 8h às 22h.</p>
        </div>
      )}
    </>
  )
}
