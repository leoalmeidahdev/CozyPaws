import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'

export type CartItem = { name: string; price: number; image: string }

type CartState = {
  count: number
  total: number
  bump: number
  last: CartItem | null
  add: (item: CartItem) => void
  dismiss: () => void
}

const CartContext = createContext<CartState | null>(null)

export const FREE_SHIPPING = 199

export const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export function CartProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(1)
  const [total, setTotal] = useState(49.9)
  const [bump, setBump] = useState(0)
  const [last, setLast] = useState<CartItem | null>(null)
  const timer = useRef(0)

  const add = useCallback((item: CartItem) => {
    setCount((c) => c + 1)
    setTotal((t) => t + item.price)
    setBump((b) => b + 1)
    setLast(item)
    clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setLast(null), 4200)
  }, [])

  const dismiss = useCallback(() => setLast(null), [])

  const value = useMemo(() => ({ count, total, bump, last, add, dismiss }), [count, total, bump, last, add, dismiss])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
