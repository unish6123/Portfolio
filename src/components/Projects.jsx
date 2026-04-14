
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, experience } from '../data/project'

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
  const isHero = true

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
          flexDirection: isHero ? 'row' : 'column',
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
          width: isHero ? '50%' : '100%',
          minHeight: isHero ? 300 : 200,
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
          padding: isHero ? '32px 36px' : '22px 24px',
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
              fontSize: isHero ? 28 : 20,
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
              maxWidth: isHero ? 420 : '100%',
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

function ExperienceCard() {
  const exp = experience[0]
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{
        background: '#0c0e1c',
        border: `1px solid ${exp.color}22`,
        borderRadius: 20, overflow: 'hidden',
        padding: '36px 40px',
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 40, alignItems: 'center',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${exp.color}88, transparent)`,
      }} />

      <div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: 10, color: exp.color,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          fontFamily: 'monospace', marginBottom: 16,
          border: `1px solid ${exp.color}33`,
          padding: '4px 12px', borderRadius: 20,
          background: `${exp.color}11`,
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: exp.color,
            boxShadow: `0 0 6px ${exp.color}`,
          }} />
          Work Experience
        </div>

        <div style={{
          fontSize: 26, fontWeight: 800,
          color: '#ffffff', fontFamily: 'Syne, sans-serif',
          letterSpacing: '-0.01em', marginBottom: 6, lineHeight: 1.2,
        }}>
          {exp.role}
        </div>

        <div style={{
          fontSize: 16, color: exp.color,
          fontFamily: 'Syne, sans-serif',
          fontWeight: 600, marginBottom: 4,
        }}>
          {exp.company}
        </div>

        <div style={{
          fontSize: 11, color: '#3d4a5c',
          fontFamily: 'monospace', marginBottom: 20,
          letterSpacing: '0.06em',
        }}>
          {exp.duration}
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {exp.tech.map(t => (
            <span key={t} style={{
              fontSize: 10, padding: '3px 10px',
              background: `${exp.color}0f`,
              border: `1px solid ${exp.color}2a`,
              borderRadius: 20, color: exp.color,
              fontFamily: 'DM Sans, sans-serif',
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div>
        <div style={{
          fontSize: 13, color: '#4a5568',
          lineHeight: 1.75, marginBottom: 20,
        }}>
          {exp.description}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {exp.bullets.map((bullet, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}
            >
              <div style={{
                width: 5, height: 5, borderRadius: '50%',
                background: exp.color,
                boxShadow: `0 0 6px ${exp.color}`,
                marginTop: 6, flexShrink: 0,
              }} />
              <div style={{ fontSize: 13, color: '#6a7a8a', lineHeight: 1.6 }}>
                {bullet}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" style={{ padding: '100px 64px', background: '#07080f' }}>
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
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        }}>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 40, letterSpacing: '-0.02em',
            color: '#fff', margin: 0,
          }}>
            Projects &amp; experience
          </h2>
          <div style={{ fontSize: 12, color: '#3d4a5c', fontFamily: 'monospace' }}>
            {projects.length} projects · {experience.length} role
          </div>
        </div>
      </motion.div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16, marginBottom: 16,
        }}>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      <ExperienceCard />

    </section>
  )
}