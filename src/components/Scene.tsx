import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import Bubbles from './Bubbles'
import Product from './Product'

export default function Scene() {
  const { mouse } = useThree()
  const group = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!group.current) return
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      mouse.x * 0.18,
      0.035
    )
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -mouse.y * 0.1,
      0.035
    )
  })

  return (
    <group ref={group}>
      {/* Soft ground glow (blurry feel) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]}>
        <circleGeometry args={[4.5, 64]} />
        <meshBasicMaterial color="#b8e8d8" transparent opacity={0.28} />
      </mesh>

      {/* Soft far glow sphere for depth blur mood */}
      <mesh position={[2.2, 0.4, -2.5]}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial color="#c8f0e4" transparent opacity={0.22} depthWrite={false} />
      </mesh>
      <mesh position={[-2.5, -0.5, -3]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial color="#d0f5ea" transparent opacity={0.18} depthWrite={false} />
      </mesh>

      <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.35}>
        <Product position={[1.35, 0.05, 0]} scale={1.12} />
      </Float>

      <Bubbles count={140} />
    </group>
  )
}
