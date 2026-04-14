import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useMousePosition } from '../hooks/useMousePosition'

function TorusKnot() {
  const meshRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    meshRef.current.rotation.x = t * 0.18
    meshRef.current.rotation.y = t * 0.28
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.15
  })

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.5, 0.42, 160, 20, 2, 3]} />
      <meshPhongMaterial
        color="#0c0f1e"
        emissive="#0a1a2a"
        shininess={80}
        wireframe={false}
      />
    </mesh>
  )
}

function TorusKnotWire() {
  const meshRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    meshRef.current.rotation.x = t * 0.18
    meshRef.current.rotation.y = t * 0.28
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.15
  })

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.5, 0.42, 160, 20, 2, 3]} />
      <meshBasicMaterial
        color="#6ee7f7"
        wireframe={true}
        transparent={true}
        opacity={0.18}
      />
    </mesh>
  )
}

export default function TorusKnotScene() {
  return (
    <group position={[0, 0, 0]}>
      <TorusKnot />
      <TorusKnotWire />
    </group>
  )
}