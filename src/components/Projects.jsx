
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/project'
import { useIsMobile } from '../hooks/useIsMobile'

function VideoModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: 32,
      }}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={(e) => { e.stopPropagation() }}
        style={{
          width: '100%', maxWidth: 900,
          background: '#0c0e1c',
          border: `1px solid ${project.color}44`,
          borderRadius: 20, overflow: 'hidden',
        }}
      >
        <div style={{ position: 'relative', paddingTop: '56.25%', background: '#000' }}>
          <iframe
            src={`${project.videoEmbed}?autoplay=1`}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%', border: 'none',
            }}
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
        <div style={{
          padding: '20px 24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{
              fontSize: 18, fontWeight: 800,
              color: '#fff', fontFamily: 'Syne, sans-serif',
            }}>
              {project.name}
            </div>
            <div style={{ fontSize: 12, color: project.color, marginTop: 2 }}>
              {project.category}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8, padding: '8px 18px',
              color: '#fff', fontSize: 12,
              cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
            }}
          >
            Close ✕
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProjectCard({ project, index }) {
  const [showVideo, setShowVideo] = useState(false)
  const isMobile = useIsMobile(700)
  const isHero = true
  const stackRow = isHero && !isMobile

  const handleMouseEnterCard = (e) => { e.currentTarget.style.borderColor = project.color + '55' }
  const handleMouseLeaveCard = (e) => { e.currentTarget.style.borderColor = project.color + '22' }
  const handleMouseEnterGithub = (e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }
  const handleMouseLeaveGithub = (e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }
  const handleMouseEnterDemo = (e) => { e.currentTarget.style.background = project.color + '25' }
  const handleMouseLeaveDemo = (e) => { e.currentTarget.style.background = project.color + '15' }

  return (
    <>
      <AnimatePresence>
        {showVideo && project.hasVideo && (
          <VideoModal project={project} onClose={() => { setShowVideo(false) }} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        style={{
          background: '#0c0e1c',
          border: `1px solid ${project.color}22`,
          borderRadius: 20, overflow: 'hidden',
          gridColumn: isHero ? 'span 2' : 'span 1',
          display: 'flex',
          flexDirection: stackRow ? 'row' : 'column',
          position: 'relative',
        }}
        onMouseEnter={handleMouseEnterCard}
        onMouseLeave={handleMouseLeaveCard}
      >
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg, transparent, ${project.color}88, transparent)`,
        }} />

        <div style={{
          background: '#070810',
          width: stackRow ? '50%' : '100%',
          minHeight: isHero ? (isMobile ? 220 : 300) : 200,
          display: 'flex', alignItems: 'center',
          justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
          flexShrink: 0,
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              linear-gradient(${project.color}08 1px, transparent 1px),
              linear-gradient(90deg, ${project.color}08 1px, transparent 1px)
            `,
            backgroundSize: '28px 28px',
          }} />

          <div style={{
            position: 'absolute',
            width: 160, height: 160, borderRadius: '50%',
            background: project.color, opacity: 0.06,
            filter: 'blur(40px)',
          }} />

          {project.hasVideo ? (
            <motion.button
              onClick={() => { setShowVideo(true) }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              style={{
                position: 'relative',
                width: 70, height: 70, borderRadius: '50%',
                background: `${project.color}22`,
                border: `2px solid ${project.color}88`,
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer',
                zIndex: 1,
              }}
            >
              <div style={{
                width: 0, height: 0,
                borderTop: '12px solid transparent',
                borderBottom: '12px solid transparent',
                borderLeft: `20px solid ${project.color}`,
                marginLeft: 5,
              }} />
            </motion.button>
          ) : (
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <div style={{
                fontSize: 42, marginBottom: 10,
                filter: `drop-shadow(0 0 12px ${project.color})`,
              }}>
                {project.id === 1 ? '📊' : '📖'}
              </div>
              {project.comingSoon && (
                <div style={{
                  fontSize: 10, color: project.color,
                  fontFamily: 'monospace', letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: `1px solid ${project.color}44`,
                  padding: '3px 10px', borderRadius: 20,
                  background: `${project.color}11`,
                }}>
                  Video coming soon
                </div>
              )}
            </div>
          )}

          {project.hasVideo && (
            <div style={{
              position: 'absolute', bottom: 12, right: 12,
              fontSize: 10, color: project.color,
              fontFamily: 'monospace', letterSpacing: '0.08em',
              background: `${project.color}11`,
              border: `1px solid ${project.color}33`,
              padding: '3px 9px', borderRadius: 4,
            }}>
              Watch demo
            </div>
          )}
        </div>

        <div style={{
          padding: isHero ? (isMobile ? '24px 24px' : '32px 36px') : '22px 24px',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between', flex: 1,
        }}>
          <div>
            <div style={{
              fontSize: 10, color: project.color,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              fontFamily: 'monospace', marginBottom: 10, opacity: 0.8,
            }}>
              {project.category}
            </div>

            <div style={{
              fontSize: isHero ? (isMobile ? 22 : 28) : 20,
              fontWeight: 800, color: '#ffffff',
              fontFamily: 'Syne, sans-serif',
              letterSpacing: '-0.01em',
              marginBottom: 12, lineHeight: 1.2,
            }}>
              {project.name}
            </div>

            <div style={{
              fontSize: 13, color: '#4a5568',
              lineHeight: 1.75, marginBottom: 20,
              maxWidth: stackRow ? 420 : '100%',
            }}>
              {project.description}
            </div>

            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
              {project.tech.map(t => (
                <span key={t} style={{
                  fontSize: 10, padding: '3px 10px',
                  background: `${project.color}0f`,
                  border: `1px solid ${project.color}2a`,
                  borderRadius: 20, color: project.color,
                  fontFamily: 'DM Sans, sans-serif',
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 12, fontWeight: 600, color: '#ffffff',
                  textDecoration: 'none',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '8px 16px', borderRadius: 8,
                  fontFamily: 'DM Sans, sans-serif',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={handleMouseEnterGithub}
                onMouseLeave={handleMouseLeaveGithub}
              >
                GitHub →
              </a>
            )}
            {project.hasVideo && (
              <button
                onClick={() => { setShowVideo(true) }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 12, fontWeight: 600, color: project.color,
                  background: `${project.color}15`,
                  border: `1px solid ${project.color}44`,
                  padding: '8px 16px', borderRadius: 8,
                  fontFamily: 'DM Sans, sans-serif',
                  cursor: 'pointer', transition: 'background 0.2s',
                }}
                onMouseEnter={handleMouseEnterDemo}
                onMouseLeave={handleMouseLeaveDemo}
              >
                Watch demo →
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default function Projects() {
  const isMobile = useIsMobile(700)
  return (
    <section id="work" style={{
      padding: 'clamp(60px, 10vw, 100px) clamp(20px, 6vw, 64px)',
      background: '#07080f',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 48 }}
      >
        <div style={{
          fontSize: 10, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: '#4d96ff',
          marginBottom: 8, opacity: 0.7,
        }}>
          Selected work
        </div>
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'flex-end',
          gap: 8,
        }}>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 'clamp(28px, 6vw, 40px)', letterSpacing: '-0.02em',
            color: '#fff', margin: 0,
          }}>
            Projects
          </h2>
          <div style={{ fontSize: 12, color: '#3d4a5c', fontFamily: 'monospace' }}>
            {projects.length} projects
          </div>
        </div>
      </motion.div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        }}>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}