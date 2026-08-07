import { motion } from 'framer-motion'
import { experience } from '../data/project'
import { useIsMobile } from '../hooks/useIsMobile'

function ExperienceCard({ exp, index }) {
  const isMobile = useIsMobile(700)
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        background: '#0c0e1c',
        border: `1px solid ${exp.color}22`,
        borderRadius: 20, overflow: 'hidden',
        padding: isMobile ? '28px 24px' : '36px 40px',
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? 24 : 40, alignItems: isMobile ? 'stretch' : 'center',
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

export default function Experience() {
  const isMobile = useIsMobile(700)
  return (
    <section id="experience" style={{
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
          textTransform: 'uppercase', color: '#ffd93d',
          marginBottom: 8, opacity: 0.7,
        }}>
          Career
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
            Experience
          </h2>
          <div style={{ fontSize: 12, color: '#3d4a5c', fontFamily: 'monospace' }}>
            {experience.length} roles
          </div>
        </div>
      </motion.div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}>
        {experience.map((exp, index) => (
          <ExperienceCard key={exp.id} exp={exp} index={index} />
        ))}
      </div>
    </section>
  )
}
