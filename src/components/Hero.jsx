import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { motion } from 'framer-motion'
import TorusKnotScene from '../three/TorusKnot'

function Hero() {
  return (
    <section id="hero" style={{
      position: 'relative', height: '100vh',
      display: 'flex', alignItems: 'center',
      overflow: 'hidden'
    }}>

      {/* 3D Canvas */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
          <ambientLight intensity={0.5} color="#0a1520" />
          <directionalLight position={[5, 5, 5]} intensity={1.2} color="#6ee7f7" />
          <directionalLight position={[-5, -3, 3]} intensity={0.8} color="#a78bfa" />
          <Stars radius={80} depth={50} count={3000} factor={3} fade speed={1} />
          <TorusKnotScene />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
        </Canvas>
      </div>

      {/* Hero Text */}
      <div style={{ position: 'relative', zIndex: 10, padding: '0 64px', maxWidth: 620 }}>

        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 11, color: '#6ee7f7',
            border: '1px solid rgba(110,231,247,0.2)',
            padding: '6px 14px', borderRadius: 20, marginBottom: 20
          }}
        >
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: '#6ee7f7', display: 'inline-block',
            animation: 'pulse 2s infinite',
          }} />
          Available for work
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 'clamp(48px, 6vw, 80px)',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: '#fff',
            marginBottom: 24,
            paddingBottom: 8,
          }}
        >
          Software<br />
          <span style={{
            background: 'linear-gradient(90deg, #6ee7f7, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
            paddingBottom: 6,
          }}>
            Engineer.
          </span>
        </motion.h1>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          style={{
            fontSize: 15, color: '#4a5568',
            lineHeight: 1.8, marginBottom: 36, maxWidth: 480,
          }}
        >
          I'm Unish, a Computer Science student at Caldwell University
          graduating in May 2026 with a 3.83 GPA and a habit of building
          things that actually work in production. I move fast, care about
          the details, and genuinely enjoy turning messy problems into
          clean, working software.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          style={{ display: 'flex', gap: 14, alignItems: 'center' }}
        >
          <button
            onClick={() => {
              const el = document.getElementById('work')
              if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 80
                window.scrollTo({ top, behavior: 'smooth' })
              }
            }}
            style={{
              fontSize: 13, fontWeight: 700, color: '#07080f',
              background: '#6ee7f7', padding: '12px 28px',
              borderRadius: 8, border: 'none', cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            View my work
          </button>

          <a
            href="/Unish_Aryal_Resume.pdf"
            download="Unish_Aryal_Resume.pdf"
            style={{
              fontSize: 13, fontWeight: 500, color: '#3d4a5c',
              background: 'transparent', padding: '12px 24px',
              borderRadius: 8, border: '1px solid rgba(255,255,255,0.07)',
              cursor: 'pointer', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#ffffff'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#3d4a5c'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
            }}
          >
            Download CV
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 1v7M3 5l3 3 3-3M1 10h10"
                stroke="currentColor" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          style={{ marginTop: 56, display: 'flex', gap: 40 }}
        >
          {[
            ['3', 'Projects'],
            ['1', 'Internship'],
            ['3.83', 'GPA'],
          ].map(([num, label]) => (
            <div key={label} style={{
              borderLeft: '2px solid rgba(110,231,247,0.2)',
              paddingLeft: 16,
            }}>
              <div style={{
                fontFamily: 'Syne, sans-serif', fontSize: 28,
                fontWeight: 700, color: '#6ee7f7', letterSpacing: '-0.02em',
              }}>
                {num}
              </div>
              <div style={{
                fontSize: 11, color: '#3d4a5c',
                textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 2,
              }}>
                {label}
              </div>
            </div>
          ))}
        </motion.div>

      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
      `}</style>

    </section>
  )
}

export default Hero