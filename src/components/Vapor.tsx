import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 40

/** Soft mist / vapor particles around the bottle */
export default function Vapor() {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const data = useMemo(
    () =>
      Array.from({ length: COUNT }, () => ({
        x: (Math.random() - 0.3) * 3 + 0.8,
        y: Math.random() * 3 - 0.5,
        z: (Math.random() - 0.5) * 2,
        s: 0.25 + Math.random() * 0.5,
        speed: 0.08 + Math.random() * 0.15,
        phase: Math.random() * Math.PI * 2,
      })),
    []
  )

  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime
    data.forEach((d, i) => {
      const y = ((d.y + t * d.speed) % 4) - 1
      const x = d.x + Math.sin(t * 0.4 + d.phase) * 0.2
      dummy.position.set(x, y, d.z)
      dummy.scale.setScalar(d.s * (0.7 + Math.sin(t + d.phase) * 0.3))
      dummy.updateMatrix()
      mesh.current!.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshBasicMaterial color="#c8f0e0" transparent opacity={0.12} depthWrite={false} />
    </instancedMesh>
  )
}
