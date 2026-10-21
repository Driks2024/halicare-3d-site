import { Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, PerspectiveCamera } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Scene from './components/Scene'
import UI from './components/UI'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(
      '.hero-content > *',
      { y: 36, opacity: 0, filter: 'blur(8px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.35,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.35,
      }
    )

    gsap.fromTo(
      '.nav',
      { y: -24, opacity: 0, filter: 'blur(12px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.1,
        ease: 'power3.out',
        delay: 0.1,
      }
    )

    gsap.fromTo(
      '.glass-orb',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.6, stagger: 0.15, ease: 'power2.out', delay: 0.5 }
    )
  }, [])

  return (
    <div className="app" ref={containerRef}>
      <div className="canvas-wrapper">
        <Canvas dpr={[1, 1.75]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
          <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={42} />
          <color attach="background" args={['#d4ebe3']} />
          {/* Soft depth fog = blur atmosphere */}
          <fog attach="fog" args={['#d4ebe3', 5.5, 14]} />
          <ambientLight intensity={0.75} />
          <directionalLight position={[5, 5, 5]} intensity={1.15} color="#ffffff" />
          <directionalLight position={[-3, 2, -2]} intensity={0.45} color="#a8e6d0" />
          <Suspense fallback={null}>
            <Scene />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

      {/* Soft blur veil over WebGL for premium soft-focus */}
      <div className="canvas-veil" aria-hidden />

      {/* Decorative frosted orbs */}
      <div className="glass-orb a" aria-hidden />
      <div className="glass-orb b" aria-hidden />
      <div className="glass-orb c" aria-hidden />

      <UI />
    </div>
  )
}
