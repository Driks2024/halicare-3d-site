import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/** Stylized Halicare bottle — white body + mint label + navy branding */
export default function Bottle({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null)
  const labelMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#b8e8d4',
        roughness: 0.45,
        metalness: 0.05,
      }),
    []
  )
  const bodyMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#f8fbf9',
        roughness: 0.25,
        metalness: 0.0,
        clearcoat: 0.6,
        clearcoatRoughness: 0.2,
        transmission: 0.08,
        thickness: 0.4,
      }),
    []
  )
  const capMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#f0f4f2',
        roughness: 0.55,
        metalness: 0.05,
      }),
    []
  )
  const navyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0d2b4a',
        roughness: 0.4,
      }),
    []
  )
  const blueMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1e6bb8',
        roughness: 0.35,
      }),
    []
  )

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    // gentle float
    group.current.position.y = Math.sin(t * 0.7) * 0.08
    // mouse parallax tilt
    const tx = mouse.current.x * 0.35
    const ty = mouse.current.y * 0.2
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, tx + Math.sin(t * 0.3) * 0.08, 0.05)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -ty * 0.4 + 0.05, 0.05)
  })

  return (
    <group ref={group} position={[1.4, -0.15, 0]} scale={1.15}>
      {/* Body */}
      <mesh position={[0, 0, 0]} material={bodyMat} castShadow>
        <cylinderGeometry args={[0.55, 0.58, 2.1, 48]} />
      </mesh>
      {/* Shoulder */}
      <mesh position={[0, 1.15, 0]} material={bodyMat}>
        <cylinderGeometry args={[0.32, 0.55, 0.28, 48]} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 1.45, 0]} material={bodyMat}>
        <cylinderGeometry args={[0.28, 0.3, 0.35, 32]} />
      </mesh>
      {/* Cap */}
      <mesh position={[0, 1.8, 0]} material={capMat} castShadow>
        <cylinderGeometry args={[0.32, 0.32, 0.42, 32]} />
      </mesh>
      {/* Cap ridges */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.31, 1.8, Math.sin(a) * 0.31]}
            rotation={[0, -a, 0]}
            material={capMat}
          >
            <boxGeometry args={[0.04, 0.38, 0.03]} />
          </mesh>
        )
      })}

      {/* Mint label panel */}
      <mesh position={[0, 0.05, 0.52]} material={labelMat} castShadow>
        <planeGeometry args={[1.05, 1.35]} />
      </mesh>
      {/* curved label wrap (thin cylinder) */}
      <mesh position={[0, 0.05, 0]} material={labelMat}>
        <cylinderGeometry args={[0.565, 0.59, 1.35, 48, 1, true, -0.9, 1.8]} />
      </mesh>

      {/* Logo bar (navy text strip) */}
      <mesh position={[0, 0.45, 0.53]}>
        <planeGeometry args={[0.75, 0.18]} />
        <meshBasicMaterial color="#0d2b4a" />
      </mesh>
      {/* "TOQUE DE FRESCOR" strip */}
      <mesh position={[0, -0.25, 0.53]}>
        <planeGeometry args={[0.7, 0.12]} />
        <meshBasicMaterial color="#1e6bb8" />
      </mesh>
      {/* Nova embalagem triangle-ish */}
      <mesh position={[0.38, -0.55, 0.53]} rotation={[0, 0, -0.4]} material={blueMat}>
        <planeGeometry args={[0.22, 0.18]} />
      </mesh>
      {/* Bottom brand circle */}
      <mesh position={[-0.25, -0.55, 0.53]} material={navyMat}>
        <circleGeometry args={[0.08, 24]} />
      </mesh>

      {/* Soft ground shadow disc */}
      <mesh position={[0, -1.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.9, 48]} />
        <meshBasicMaterial color="#7dcfb6" transparent opacity={0.18} />
      </mesh>
    </group>
  )
}
