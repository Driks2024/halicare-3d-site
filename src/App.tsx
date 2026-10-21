import { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, PerspectiveCamera } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Scene from './components/Scene'
import UI from './components/UI'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    gsap.fromTo(
      '.hero-content > *',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: 'power3.out', delay: 0.35 }
    )
    gsap.fromTo(
      '.nav',
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.1 }
    )
  }, [])

  return (
    <div className="app">
      <div className="canvas-wrapper">
        <Canvas
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
        >
          <PerspectiveCamera makeDefault position={[0, 0.2, 6.2]} fov={40} />
          <color attach="background" args={['#d8f0e8']} />
          <fog attach="fog" args={['#d8f0e8', 9, 20]} />
          <ambientLight intensity={0.75} />
          <directionalLight position={[5, 6, 4]} intensity={1.35} color="#ffffff" castShadow />
          <directionalLight position={[-4, 3, -2]} intensity={0.45} color="#a8e6d0" />
          <pointLight position={[2, 1, 3]} intensity={0.4} color="#e8fff6" />
          <Suspense fallback={null}>
            <Scene />
            <Environment preset="city" environmentIntensity={0.35} />
          </Suspense>
        </Canvas>
      </div>
      <UI />
    </div>
  )
}
