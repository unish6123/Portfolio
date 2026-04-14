import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { skillTree } from '../data/skillTree'

export const ORBIT_CONFIG = [
  { radius: 2.0, color: '#ff2d78', speed: 0.004, tilt: 0 },
  { radius: 3.1, color: '#ffd93d', speed: -0.003, tilt: 0 },
  { radius: 4.0, color: '#39e75f', speed: 0.002, tilt: 0 },
  { radius: 4.9, color: '#4d96ff', speed: -0.0015, tilt: 0 },
]

const SKILL_COLORS = [
  ['#ff2d78', '#ff6b9d', '#ff4757', '#ff8e53'],
  ['#ffd93d', '#f9ca24', '#ffb347', '#f0932b'],
  ['#39e75f', '#26de81', '#4ecdc4', '#45b7d1'],
  ['#4d96ff', '#a29bfe', '#74b9ff', '#6c5ce7', '#00cec9'],
]

const SKILL_COUNTS = [5, 4, 4, 4]

function Stars() {
  const ref = useRef()
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const count = 300
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [])
  useFrame(() => { if (ref.current) ref.current.rotation.y += 0.0001 })
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#ffffff" size={0.025} transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

function OrbitRing({ radius, color, isActive, isAnyActive }) {
  const ref = useRef()
  useFrame(() => {
    if (ref.current) {
      const target = isActive ? 0.5 : isAnyActive ? 0.04 : 0.15
      ref.current.material.opacity += (target - ref.current.material.opacity) * 0.06
    }
  })
  return (
    <mesh ref={ref} rotation={[0, 0, 0]}>
      <torusGeometry args={[radius, 0.008, 8, 128]} />
      <meshBasicMaterial color={color} transparent opacity={0.15} />
    </mesh>
  )
}

function CenterSun() {
  const ring1 = useRef()
  const ring2 = useRef()
  const ring3 = useRef()
  const coreRef = useRef()
  const auroraRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ring1.current) ring1.current.rotation.z += 0.006
    if (ring2.current) ring2.current.rotation.x += 0.004
    if (ring3.current) ring3.current.rotation.y += 0.003
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.005
      coreRef.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.025)
    }
    if (auroraRef.current) {
      auroraRef.current.rotation.z -= 0.002
      auroraRef.current.material.opacity = 0.08 + Math.sin(t * 0.8) * 0.03
    }
  })

  return (
    <group>
      <mesh ref={auroraRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial color="#5050ff" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>

      <mesh ref={ring1}>
        <torusGeometry args={[0.95, 0.014, 8, 100]} />
        <meshBasicMaterial color="#ff2d78" transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[0.95, 0.01, 8, 100]} />
        <meshBasicMaterial color="#4d96ff" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring3} rotation={[0, Math.PI / 3, Math.PI / 4]}>
        <torusGeometry args={[0.95, 0.008, 8, 100]} />
        <meshBasicMaterial color="#39e75f" transparent opacity={0.3} />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.72, 32, 32]} />
        <meshBasicMaterial color="#6060ff" transparent opacity={0.15} side={THREE.BackSide} />
      </mesh>

      <mesh ref={coreRef}>
        <sphereGeometry args={[0.52, 64, 64]} />
        <meshPhysicalMaterial
          color="#03030f"
          emissive="#4040ff"
          emissiveIntensity={0.7}
          roughness={0.0}
          metalness={0.2}
          clearcoat={1.0}
          clearcoatRoughness={0.0}
          transmission={0.05}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshBasicMaterial color="#020208" transparent opacity={0.9} />
      </mesh>

      <mesh position={[-0.12, 0.18, 0.45]} rotation={[-0.3, -0.2, 0.15]}>
        <planeGeometry args={[0.3, 0.15]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.25} />
      </mesh>

      <pointLight color="#5050ff" intensity={5} distance={10} />
      <pointLight color="#ff2d78" intensity={2} distance={6} />
      <pointLight color="#4d96ff" intensity={2} distance={6} />

      <Html center distanceFactor={9} zIndexRange={[100, 0]}>
        <div style={{ textAlign: 'center', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
          <div style={{
            fontSize: 14, fontWeight: 900,
            color: '#ffffff',
            fontFamily: 'Syne, sans-serif',
            letterSpacing: '0.05em',
            textShadow: '0 0 30px rgba(120,120,255,1), 0 0 60px rgba(120,120,255,0.5), 0 2px 8px rgba(0,0,0,1)',
          }}>
            {skillTree.center.name}
          </div>
          <div style={{
            fontSize: 8, color: 'rgba(160,160,255,0.8)',
            fontFamily: 'monospace', letterSpacing: '0.16em',
            textTransform: 'uppercase', marginTop: 3,
            textShadow: '0 0 10px rgba(120,120,255,0.8)',
          }}>
            {skillTree.center.subtitle}
          </div>
        </div>
      </Html>
    </group>
  )
}

function SkillNode({ skill, color, angle, radius, orbitSpeed, isOrbitActive, isAnyActive }) {
  const ref = useRef()
  const angleRef = useRef(angle)
  const scaleRef = useRef(0.9)
  const [hovered, setHovered] = useState(false)
  const threeColor = useMemo(() => new THREE.Color(color), [color])

  useFrame(() => {
    if (!ref.current) return
    angleRef.current += orbitSpeed

    const x = Math.cos(angleRef.current) * radius
    const z = Math.sin(angleRef.current) * radius

    ref.current.position.set(x, 0, z)

    const targetScale = isOrbitActive
      ? (hovered ? 1.9 : 1.45)
      : isAnyActive ? 0.35 : (hovered ? 1.25 : 0.9)

    scaleRef.current += (targetScale - scaleRef.current) * 0.09
    ref.current.scale.setScalar(Math.max(0.001, scaleRef.current))
  })

  return (
    <group ref={ref}>
      <group
        onPointerEnter={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
        onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'default' }}
      >
        {/* Outer glow */}
        <mesh>
          <sphereGeometry args={[0.45, 32, 32]} />
          <meshBasicMaterial
            color={threeColor}
            transparent
            opacity={isOrbitActive ? (hovered ? 0.2 : 0.12) : 0.04}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Rim glow */}
        <mesh>
          <sphereGeometry args={[0.38, 32, 32]} />
          <meshBasicMaterial
            color={threeColor}
            transparent
            opacity={isOrbitActive ? (hovered ? 0.25 : 0.15) : 0.05}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Main glass body */}
        <mesh>
          <sphereGeometry args={[0.30, 48, 48]} />
          <meshPhysicalMaterial
            color="#050510"
            emissive={threeColor}
            emissiveIntensity={isOrbitActive ? (hovered ? 0.9 : 0.55) : 0.2}
            roughness={0.0}
            metalness={0.1}
            clearcoat={1.0}
            clearcoatRoughness={0.0}
            transmission={0.05}
          />
        </mesh>

        {/* Inner dark core */}
        <mesh>
          <sphereGeometry args={[0.18, 24, 24]} />
          <meshBasicMaterial color="#020208" transparent opacity={0.9} />
        </mesh>

        {/* Reflection highlight */}
        <mesh position={[-0.065, 0.095, 0.27]} rotation={[-0.3, -0.2, 0.15]}>
          <planeGeometry args={[0.1, 0.055]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.28} />
        </mesh>
      </group>

      {hovered && isOrbitActive && (
        <pointLight color={color} intensity={4} distance={2.5} />
      )}

      <Html center distanceFactor={9} zIndexRange={[20, 0]}>
        <div style={{
          textAlign: 'center', pointerEvents: 'none',
          whiteSpace: 'nowrap',
          opacity: isOrbitActive ? 1 : 0,
          transition: 'opacity 0.4s',
        }}>
          <div style={{
            fontSize: hovered ? 12 : 10,
            fontWeight: 700,
            color: hovered ? '#ffffff' : color,
            fontFamily: 'DM Sans, sans-serif',
            letterSpacing: '0.03em',
            textShadow: `0 0 10px ${color}cc, 0 1px 4px rgba(0,0,0,1)`,
            background: 'rgba(0,0,0,0.6)',
            padding: '2px 6px',
            borderRadius: 4,
            transition: 'all 0.2s',
          }}>
            {skill.name}
          </div>
          {hovered && (
            <div style={{
              fontSize: 9, color,
              fontFamily: 'monospace', marginTop: 2,
              textShadow: `0 0 6px ${color}`,
            }}>
              {skill.proficiency}%
            </div>
          )}
        </div>
      </Html>
    </group>
  )
}

export default function SkillTree3D({ onSkillSelect, activeCategory }) {
  const groupRef = useRef()

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.003
  })

  const isAnyActive = activeCategory !== null

  return (
    <group ref={groupRef}>
      <Stars />
      <CenterSun />

      {skillTree.categories.map((cat, i) => (
        <OrbitRing
          key={cat.name}
          radius={ORBIT_CONFIG[i].radius}
          color={ORBIT_CONFIG[i].color}
          isActive={activeCategory?.name === cat.name}
          isAnyActive={isAnyActive}
        />
      ))}

      {skillTree.categories.map((cat, catIdx) =>
        cat.skills.slice(0, SKILL_COUNTS[catIdx]).map((skill, skillIdx) => {
          const count = SKILL_COUNTS[catIdx]
          const startAngle = (skillIdx / count) * Math.PI * 2
          return (
            <SkillNode
              key={skill.name}
              skill={skill}
              color={SKILL_COLORS[catIdx][skillIdx % SKILL_COLORS[catIdx].length]}
              angle={startAngle}
              radius={ORBIT_CONFIG[catIdx].radius}
              orbitSpeed={ORBIT_CONFIG[catIdx].speed}
              isOrbitActive={activeCategory?.name === cat.name}
              isAnyActive={isAnyActive}
            />
          )
        })
      )}
    </group>
  )
}