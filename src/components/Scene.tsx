import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import Bottle from './Bottle'
import Bubbles from './Bubbles'
import Vapor from './Vapor'

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

  // subtle camera parallax + scroll-linked camera
  useFrame(() => {
    if (!group.current) return
    const scrollY = window.scrollY
    const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1)
    const progress = Math.min(scrollY / maxScroll, 1)

    // camera drift with mouse
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.current.x * 0.4, 0.04)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.current.y * 0.2 + progress * -1.2, 0.04)
    camera.lookAt(0.6, 0 - progress * 0.8, 0)

    // whole scene slight scale/move on scroll (parallax depth)
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, progress * -0.8, 0.06)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, progress * 0.35, 0.04)
  })

  return (
    <group ref={group}>
      <Bottle mouse={mouse} />
      <Bubbles />
      <Vapor />
      {/* soft floor gradient disc */}
      <mesh position={[0.8, -1.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4, 64]} />
        <meshBasicMaterial color="#a8e6d0" transparent opacity={0.12} />
      </mesh>
    </group>
  )
}
