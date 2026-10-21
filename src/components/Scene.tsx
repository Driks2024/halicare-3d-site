import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import Bubbles from './Bubbles'
import Bottle from './Bottle'

export default function Scene() {
  const mouse = useRef({ x: 0, y: 0 })
  const group = useRef<THREE.Group>(null)
  const { camera } = useThree()

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(() => {
    if (!group.current) return
    const scrollY = window.scrollY
    const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1)
    const progress = Math.min(scrollY / maxScroll, 1)

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.current.x * 0.35, 0.04)
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      mouse.current.y * 0.15 + progress * -1.0,
      0.04
    )
    camera.lookAt(0.5, 0 - progress * 0.6, 0)

    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, progress * -0.6, 0.05)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, progress * 0.25, 0.04)
  })

  return (
    <group ref={group}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]}>
        <circleGeometry args={[4.5, 64]} />
        <meshBasicMaterial color="#b8e8d8" transparent opacity={0.28} />
      </mesh>

      <mesh position={[2.2, 0.4, -2.5]}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial color="#c8f0e4" transparent opacity={0.22} depthWrite={false} />
      </mesh>
      <mesh position={[-2.5, -0.5, -3]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial color="#d0f5ea" transparent opacity={0.18} depthWrite={false} />
      </mesh>

      <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.35}>
        <Bottle mouse={mouse} />
      </Float>

      <Bubbles count={140} />
    </group>
  )
}
