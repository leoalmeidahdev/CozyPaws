import type { CSSProperties } from 'react'
import { Check, Truck, X } from 'lucide-react'
import { FREE_SHIPPING, brl, useCart } from '../lib/cart'

export default function CartToast() {
  const { last, total, bump, dismiss } = useCart()
  if (!last) return null
  const left = Math.max(0, FREE_SHIPPING - total)
  const ratio = Math.min(1, total / FREE_SHIPPING)

  return (
    <div
      key={bump}
      role="status"
      className="toast-in fixed bottom-4 left-4 right-4 z-[80] rounded-[22px] bg-white p-4 text-forest shadow-[0_30px_70px_-20px_rgba(15,38,15,.5)] sm:left-auto sm:right-6 sm:w-[360px]"
    >
      <div className="flex items-center gap-3">
        <img src={last.image} alt="" className="h-14 w-14 shrink-0 rounded-xl bg-mint object-cover" />
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-forest-hover">
            <Check size={14} /> Adicionado ao carrinho
          </p>
          <p className="truncate text-sm font-medium">{last.name}</p>
        </div>
        <button aria-label="Fechar" onClick={dismiss} className="grid h-8 w-8 shrink-0 place-items-center rounded-full hover:bg-mint">
          <X size={16} />
        </button>
      </div>

      {/* 11 Barra de progresso — frete grátis */}
      <div className="mt-4 rounded-2xl bg-mint p-3" data-in>
        <p className="flex items-center gap-2 text-xs">
          <Truck size={14} className="text-orange" />
          {left > 0 ? (
            <>
              Faltam <strong>{brl(left)}</strong> para o frete grátis
            </>
          ) : (
            <strong>Você ganhou frete grátis!</strong>
          )}
        </p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-forest/10">
          <div className="bar-fill h-full rounded-full bg-orange" style={{ '--to': ratio, '--d': '150ms' } as CSSProperties} />
        </div>
      </div>
    </div>
  )
}
