import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import SkillTree3D, { ORBIT_CONFIG } from '../three/SkillTree3D'
import { skillTree } from '../data/skillTree'

const SKILL_COLORS = [
  ['#ff2d78', '#ff6b9d', '#ff4757', '#ff8e53'],
  ['#ffd93d', '#f9ca24', '#ffb347', '#f0932b'],
  ['#39e75f', '#26de81', '#4ecdc4', '#45b7d1'],
  ['#4d96ff', '#a29bfe', '#74b9ff', '#6c5ce7', '#00cec9'],
]
const SKILL_COUNTS = [5, 4, 4, 4]

export default function SkillSection() {
  const [activeCategory, setActiveCategory] = useState(skillTree.categories[0])

  const handleSelect = (cat) => {
    setActiveCategory(prev => prev?.name === cat.name ? null : cat)
  }

  return (
    <section id="skills" style={{
      padding: '40px 0 60px',
      background: '#07080f',
      width: '100vw',
      marginLeft: 'calc(-50vw + 50%)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Header */}
      <div style={{ padding: '0 64px', marginBottom: 40 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            fontSize: 10, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#ff2d78',
            marginBottom: 8, opacity: 0.7
          }}>Tech Stack</div>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 40, letterSpacing: '-0.02em',
            color: '#fff', marginBottom: 0
          }}>Skills &amp; tools</h2>
        </motion.div>
      </div>

      {/* Main layout */}
      <div style={{ display: 'flex', alignItems: 'center' }}>

        {/* LEFT PANEL */}
        <div style={{
          width: 280,
          flexShrink: 0,
          padding: '0 0 0 64px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          zIndex: 10,
        }}>
          <div style={{
            fontSize: 10, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: '#3d4a5c',
            marginBottom: 6, fontFamily: 'monospace'
          }}>
            Click to explore
          </div>

          {skillTree.categories.map((cat, i) => {
            const isActive = activeCategory?.name === cat.name
            const color = ORBIT_CONFIG[i].color
            return (
              <motion.div
                key={cat.name}
                onClick={() => handleSelect(cat)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ x: 4 }}
                style={{
                  cursor: 'pointer',
                  background: isActive ? `${color}18` : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${isActive ? color + '66' : 'rgba(255,255,255,0.06)'}`,
                  borderLeft: `3px solid ${isActive ? color : color + '44'}`,
                  borderRadius: '0 10px 10px 0',
                  padding: '14px 16px',
                  transition: 'all 0.3s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {isActive && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `radial-gradient(ellipse at left, ${color}10, transparent 70%)`,
                    pointerEvents: 'none',
                  }} />
                )}

                <div style={{ position: 'relative' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 6,
                  }}>
                    <div style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: isActive ? '#ffffff' : color,
                      fontFamily: 'Syne, sans-serif',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      textShadow: isActive ? `0 0 12px ${color}88` : 'none',
                      transition: 'all 0.3s',
                    }}>
                      {cat.name}
                    </div>
                    <div style={{
                      fontSize: 9,
                      color: isActive ? color : '#3d4a5c',
                      fontFamily: 'monospace',
                      letterSpacing: '0.06em',
                      transition: 'color 0.3s',
                    }}>
                      {SKILL_COUNTS[i]} skills
                    </div>
                  </div>

                  {/* Skill name pills */}
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {cat.skills.slice(0, SKILL_COUNTS[i]).map((skill, si) => (
                      <div key={skill.name} style={{
                        fontSize: 9,
                        padding: '2px 7px',
                        borderRadius: 20,
                        background: isActive
                          ? `${SKILL_COLORS[i][si % SKILL_COLORS[i].length]}22`
                          : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${isActive
                          ? SKILL_COLORS[i][si % SKILL_COLORS[i].length] + '44'
                          : 'rgba(255,255,255,0.06)'}`,
                        color: isActive
                          ? SKILL_COLORS[i][si % SKILL_COLORS[i].length]
                          : '#3d4a5c',
                        fontFamily: 'DM Sans, sans-serif',
                        transition: 'all 0.3s',
                        whiteSpace: 'nowrap',
                      }}>
                        {skill.name}
                      </div>
                    ))}
                  </div>

                  {/* Proficiency bars when active */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ marginTop: 12, overflow: 'hidden' }}
                      >
                        {cat.skills.slice(0, SKILL_COUNTS[i]).map((skill, si) => (
                          <div key={skill.name} style={{ marginBottom: 6 }}>
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              marginBottom: 3,
                            }}>
                              <span style={{
                                fontSize: 9,
                                color: SKILL_COLORS[i][si % SKILL_COLORS[i].length],
                                fontFamily: 'DM Sans, sans-serif',
                              }}>
                                {skill.name}
                              </span>
                              <span style={{
                                fontSize: 9,
                                color: '#3d4a5c',
                                fontFamily: 'monospace',
                              }}>
                                {skill.proficiency}%
                              </span>
                            </div>
                            <div style={{
                              height: 2,
                              background: 'rgba(255,255,255,0.05)',
                              borderRadius: 2,
                              overflow: 'hidden',
                            }}>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.proficiency}%` }}
                                transition={{ duration: 0.8, ease: 'easeOut', delay: si * 0.05 }}
                                style={{
                                  height: '100%',
                                  background: SKILL_COLORS[i][si % SKILL_COLORS[i].length],
                                  borderRadius: 2,
                                  boxShadow: `0 0 4px ${SKILL_COLORS[i][si % SKILL_COLORS[i].length]}`,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* 3D Canvas */}
        <div style={{ flex: 1, height: 680 }}>
          <Canvas
            camera={{ position: [0, 9, 3], fov: 52 }}
            style={{ background: 'transparent' }}
            onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
          >
            <ambientLight intensity={0.15} color="#05051a" />
            <pointLight position={[0, 12, 8]} intensity={3} color="#ffffff" />
            <pointLight position={[-8, 6, 4]} intensity={1.5} color="#ff2d78" />
            <pointLight position={[8, 6, 4]} intensity={1.5} color="#4d96ff" />
            <pointLight position={[0, -4, 6]} intensity={1} color="#39e75f" />
            <pointLight position={[0, 0, 10]} intensity={2} color="#ffffff" />
            <SkillTree3D
              onSkillSelect={handleSelect}
              activeCategory={activeCategory}
            />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
            />
          </Canvas>
        </div>
      </div>
    </section>
  )
}