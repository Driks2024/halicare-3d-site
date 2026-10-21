import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function UI() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.to('.hero-content', {
      y: -70,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.4,
      },
    })

    gsap.utils.toArray<HTMLElement>('.section-card').forEach((card) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0, filter: 'blur(12px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
          },
        }
      )
    })
  }, [])

  return (
    <>
      <nav className="nav">
        <div className="logo">Halicare</div>
        <ul className="nav-links">
          <li><a href="#produto">Produto</a></li>
          <li><a href="#beneficios">Benefícios</a></li>
          <li><a href="#ciencia">Ciência</a></li>
          <li><a href="#comprar">Comprar</a></li>
        </ul>
      </nav>

      <section className="hero" ref={heroRef}>
        <div className="hero-content">
          <span className="badge">À base de oxigênio</span>
          <h1>Toque de Frescor</h1>
          <p className="subtitle">O poder do oxigênio contra o mau hálito</p>
          <p className="claims">Sem álcool · Sem flúor · Ingredientes naturais · 300 ml</p>
          <div>
            <button className="cta">Experimente o frescor</button>
            <button className="cta secondary">Saiba mais</button>
          </div>
        </div>
      </section>

      <section className="section" id="produto">
        <div className="section-card">
          <span className="badge">Produto</span>
          <h2>Halicare</h2>
          <p>
            Enxaguante antisséptico bucal com forte ação bactericida à base de oxigênio.
            Combate e previne gengivite, mau hálito, cárie, placa bacteriana e ressecamento bucal.
            Toque de frescor que dura.
          </p>
        </div>
      </section>

      <section className="section" id="beneficios">
        <div className="section-card">
          <span className="badge">Benefícios</span>
          <h2>Frescor que se respira</h2>
          <p>
            Fórmula isenta de álcool, açúcar, flúor e corantes. Proteção prolongada e
            sensação de limpeza sem ressecar a mucosa. Ideal para uso diário e
            confiança em cada sorriso.
          </p>
        </div>
      </section>

      <section className="section" id="ciencia">
        <div className="section-card">
          <span className="badge">Ciência</span>
          <h2>Oxigênio ativo</h2>
          <p>
            Tecnologia à base de dióxido de cloro estabilizado (oxigênio ativo) que
            elimina compostos sulfurados voláteis responsáveis pelo mau hálito,
            com ação bactericida seletiva e segura.
          </p>
        </div>
      </section>

      <section className="section" id="comprar" style={{ minHeight: '60vh' }}>
        <div className="section-card" style={{ textAlign: 'center' }}>
          <h2>Respire confiança</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Pronto para o toque de frescor?
          </p>
          <button className="cta">Comprar agora</button>
        </div>
      </section>

      <footer>
        © 2026 Halicare · Odomed · Campanha “Toque de Frescor”
      </footer>
    </>
  )
}
