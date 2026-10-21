import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface BubblesProps {
  count?: number
}

export default function Bubbles({ count = 140 }: BubblesProps) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const depth = Math.random()
      temp.push({
        x: (Math.random() - 0.5) * 9,
        y: (Math.random() - 0.5) * 7 - 1,
        z: (Math.random() - 0.5) * 6 - 1.2,
        speed: 0.15 + Math.random() * 0.45,
        // farther bubbles larger + softer feel via size
        size: 0.03 + Math.random() * 0.14 + depth * 0.06,
        offset: Math.random() * Math.PI * 2,
        depth,
      })
    }
    return temp
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime

    particles.forEach((p, i) => {
      const y = ((p.y + t * p.speed * 0.38) % 7.5) - 3.8
      const x = p.x + Math.sin(t * 0.28 + p.offset) * 0.18
      const z = p.z + Math.cos(t * 0.22 + p.offset) * 0.12

      dummy.position.set(x, y, z)
      dummy.scale.setScalar(p.size * (0.82 + Math.sin(t + p.offset) * 0.18))
      dummy.updateMatrix()
      mesh.current!.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshPhysicalMaterial
        color="#e8fff8"
        transparent
        opacity={0.42}
        roughness={0.08}
        metalness={0.02}
        transmission={0.82}
        thickness={0.5}
        ior={1.35}
        depthWrite={false}
      />
    </instancedMesh>
  )
}
