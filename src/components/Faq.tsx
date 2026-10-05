import { useState } from 'react'
import { MessageCircle, Plus } from 'lucide-react'
import { d, useMagnet } from '../lib/interactions'

const QA = [
  {
    q: 'Qual é o prazo de entrega?',
    a: 'Na capital e região metropolitana entregamos em até 2 horas para pedidos feitos até as 18h. Para as demais regiões, o prazo é de 1 a 5 dias úteis, informado antes de você finalizar a compra.',
  },
  {
    q: 'Quais formas de pagamento vocês aceitam?',
    a: 'Pix (com 5% de desconto), cartão de crédito em até 6x sem juros, cartão de débito e boleto bancário.',
  },
  {
    q: 'Como funciona o Clube CozyPaws?',
    a: 'É uma assinatura de R$ 19,90 por mês com 15% de desconto em toda a loja, frete grátis ilimitado, leva-e-traz no banho e teleconsulta 24h. O primeiro mês é grátis e você pode cancelar quando quiser.',
  },
  {
    q: 'Posso trocar ou devolver um produto?',
    a: 'Sim. Você tem até 30 dias para trocar ou devolver qualquer produto lacrado. Para rações abertas que o pet não aceitou, temos a garantia de paladar: trocamos por outro sabor.',
  },
  {
    q: 'Vocês buscam meu pet para o banho?',
    a: 'Buscamos! O leva-e-traz é gratuito para membros do Clube e custa R$ 15 para os demais clientes, dentro da área de cobertura.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState(0)
  const magnet = useMagnet<HTMLAnchorElement>(0.25)

  return (
    <section id="ajuda" data-bg="#fbf7ef" data-ink="#1a3d1a" className="px-4 pb-28 md:px-8 md:pb-40 lg:px-12">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="rv text-xs font-semibold uppercase tracking-[0.18em] text-orange" data-rv="fade">
            Entrega, pagamento e dúvidas
          </p>
          <h2 className="rv mt-4 font-serif-display text-[clamp(38px,4.6vw,64px)] leading-[1.02] tracking-tight" style={d(80)}>
            Perguntas frequentes
          </h2>
          <div className="rv mt-10 rounded-[24px] bg-forest p-7 text-mint" style={d(160)}>
            <p className="font-serif-display text-2xl leading-tight">Ainda com dúvidas?</p>
            <p className="mt-2 text-sm text-mint/70">Nosso time responde em minutos, todos os dias das 8h às 22h.</p>
            <a
              ref={magnet}
              href="#ajuda"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white"
            >
              <MessageCircle size={16} /> Falar no WhatsApp
            </a>
          </div>
        </div>

        {/* 12 Sanfona */}
        <div className="divide-y divide-forest/10 border-y border-forest/10">
          {QA.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} className="acc rv" data-open={isOpen} style={d(i * 80)}>
                <h3>
                  <button
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium md:text-xl"
                  >
                    {item.q}
                    <span className="acc-icon grid h-9 w-9 shrink-0 place-items-center rounded-full border border-forest/15">
                      <Plus size={16} />
                    </span>
                  </button>
                </h3>
                <div id={`faq-${i}`} role="region" className="acc-panel">
                  <div>
                    <p className="max-w-2xl pb-6 text-forest/70">{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
