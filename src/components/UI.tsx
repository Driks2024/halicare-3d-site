import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function UI() {
  const cardsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Parallax hero text on scroll
    gsap.to('.hero-content', {
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      },
    })

    // Cards reveal
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.querySelectorAll('.card'),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
        }
      )
    }

    // CTA band
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { y: 50, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
          },
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <div className="ui-layer">
      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">Halicare</div>
        <ul className="nav-links">
          <li><a href="#produto">Produto</a></li>
          <li><a href="#beneficios">Benefícios</a></li>
          <li><a href="#ciencia">Ciência</a></li>
          <li><a href="#comprar">Comprar</a></li>
        </ul>
        <a href="#comprar" className="nav-cta">Experimente</a>
      </nav>

      {/* HERO */}
      <section className="hero" id="produto">
        <div className="hero-content">
          <div className="hero-badge">
            <span>✦</span> À base de oxigênio
          </div>
          <h1>
            Toque de
            <span>Frescor</span>
          </h1>
          <p className="hero-sub">
            O poder do oxigênio contra o mau hálito.  
            Enxaguante antisséptico com forte ação bactericida.
          </p>
          <p className="hero-claims">
            Sem álcool · Sem flúor · Sem açúcar · Ingredientes naturais
          </p>
          <div className="hero-actions">
            <a href="#comprar" className="btn-primary">Experimente o frescor</a>
            <a href="#beneficios" className="btn-ghost">Ver benefícios</a>
          </div>
        </div>
      </section>

      <div className="spacer" />

      {/* BENEFITS */}
      <section className="section" id="beneficios">
        <h2 className="section-title">Frescor que dura</h2>
        <p className="section-sub">
          Tecnologia à base de oxigênio que elimina compostos sulfurados e protege sua boca por horas.
        </p>
        <div className="cards" ref={cardsRef}>
          <div className="card">
            <div className="card-icon">💨</div>
            <h3>Oxigênio ativo</h3>
            <p>
              Fórmula com dióxido de cloro estabilizado — ação bactericida que libera oxigênio e combate o mau hálito na raiz.
            </p>
          </div>
          <div className="card">
            <div className="card-icon">🧊</div>
            <h3>Toque de Frescor</h3>
            <p>
              Sensação imediata de limpeza e frescor mentolado, sem ressecar a mucosa. Ideal para uso diário.
            </p>
          </div>
          <div className="card">
            <div className="card-icon">🛡️</div>
            <h3>Proteção completa</h3>
            <p>
              Combate e previne gengivite, cárie, placa bacteriana e ressecamento bucal. Efeito prolongado até 8h.
            </p>
          </div>
          <div className="card">
            <div className="card-icon">🌿</div>
            <h3>Fórmula limpa</h3>
            <p>
              Isento de álcool, açúcar, flúor e corantes. Não mancha os dentes e não altera o paladar.
            </p>
          </div>
        </div>
      </section>

      {/* SCIENCE CTA */}
      <div className="cta-band" id="ciencia" ref={ctaRef}>
        <h2>Ciência a serviço do seu sorriso</h2>
        <p>
          Halicare Odomed — 300 ml · Nova embalagem · Uso diário seguro
        </p>
        <a href="#comprar" className="btn-primary" id="comprar">
          Comprar agora
        </a>
      </div>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Halicare · Odomed</span>
        <span>Toque de Frescor · À base de oxigênio</span>
      </footer>
    </div>
  )
}
