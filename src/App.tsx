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
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: 'power3.out', delay: 0.3 }
    )

    gsap.fromTo(
      '.nav',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.1 }
    )
  }, [])

  return (
    <div className="app" ref={containerRef}>
      <div className="canvas-wrapper">
        <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
          <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={42} />
          <color attach="background" args={['#d8f0e8']} />
          <fog attach="fog" args={['#d8f0e8', 8, 18]} />
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
          <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#a8e6d0" />
          <Suspense fallback={null}>
            <Scene />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>
      <UI />
    </div>
  )
}
