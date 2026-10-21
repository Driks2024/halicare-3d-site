import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 80

export default function Bubbles() {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const data = useMemo(() => {
    return Array.from({ length: COUNT }, () => ({
      x: (Math.random() - 0.5) * 8,
      y: Math.random() * 6 - 2,
      z: (Math.random() - 0.5) * 4 - 1,
      s: 0.03 + Math.random() * 0.12,
      speed: 0.15 + Math.random() * 0.35,
      phase: Math.random() * Math.PI * 2,
      wobble: 0.1 + Math.random() * 0.3,
    }))
  }, [])

  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime
    data.forEach((d, i) => {
      const y = ((d.y + t * d.speed) % 7) - 2.5
      const x = d.x + Math.sin(t * d.wobble + d.phase) * 0.25
      const z = d.z + Math.cos(t * d.wobble * 0.7 + d.phase) * 0.15
      dummy.position.set(x, y, z)
      dummy.scale.setScalar(d.s * (0.85 + Math.sin(t * 2 + d.phase) * 0.15))
      dummy.updateMatrix()
      mesh.current!.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshPhysicalMaterial
        color="#e8faf4"
        transparent
        opacity={0.45}
        roughness={0.1}
        metalness={0.0}
        transmission={0.7}
        thickness={0.5}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </instancedMesh>
  )
}
