import { useEffect } from 'react'
import { CartProvider } from './lib/cart'
import { startOffscreenPause, startReveal, startScroll, startThemeMorph } from './lib/scroll'
import Header from './components/Header'
import Hero from './components/Hero'
import Statement from './components/Statement'
import Categories from './components/Categories'
import Products from './components/Products'
import Services from './components/Services'
import Stats from './components/Stats'
import Club from './components/Club'
import Testimonials from './components/Testimonials'
import Journal from './components/Journal'
import Faq from './components/Faq'
import Footer from './components/Footer'
import CartToast from './components/CartToast'

export default function App() {
  useEffect(() => {
    startScroll()
    const stopMorph = startThemeMorph()
    const stopPause = startOffscreenPause()
    const { io, scan } = startReveal()
    // content rendered later (toast, menus) gets picked up too
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      stopMorph()
      stopPause()
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return (
    <CartProvider>
      <Header />
      <div className="page">
        <main>
          <Hero />
          <Statement />
          <Categories />
          <Products />
          <Services />
          <Stats />
          <Club />
          <Testimonials />
          <Journal />
          <Faq />
        </main>
        <Footer />
      </div>
      <CartToast />
    </CartProvider>
  )
}
