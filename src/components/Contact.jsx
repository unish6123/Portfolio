import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'

function ParticleCanvas() {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 200,
      r: Math.random() * 2.5 + 0.5,
      speed: Math.random() * 0.6 + 0.2,
      opacity: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? '110,231,247' : '167,139,250',
      drift: (Math.random() - 0.5) * 0.4,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.005,
    }))

    let animId
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.y -= p.speed
        p.wobble += p.wobbleSpeed
        p.x += p.drift + Math.sin(p.wobble) * 0.3

        if (p.y < -10) {
          p.y = canvas.height + 10
          p.x = Math.random() * canvas.width
        }

        const fadeHeight = canvas.height * 0.4
        const alpha = p.y < fadeHeight
          ? p.opacity * (p.y / fadeHeight)
          : p.opacity

        ctx.beginPath()
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3)
        grad.addColorStop(0, `rgba(${p.color},${alpha})`)
        grad.addColorStop(1, `rgba(${p.color},0)`)
        ctx.fillStyle = grad
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color},${alpha * 1.5})`
        ctx.fill()
      })
      animId = requestAnimationFrame(animate)
    }

    animate()

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
      }}
    />
  )
}

const inputStyle = (focused) => ({
  width: '100%',
  background: focused ? 'rgba(110,231,247,0.04)' : 'rgba(255,255,255,0.03)',
  border: `1px solid ${focused ? 'rgba(110,231,247,0.35)' : 'rgba(255,255,255,0.07)'}`,
  borderRadius: 10,
  padding: '14px 16px',
  fontSize: 13,
  color: '#ffffff',
  fontFamily: 'DM Sans, sans-serif',
  outline: 'none',
  transition: 'all 0.2s',
  boxSizing: 'border-box',
  width: '100%',
})

const labelStyle = {
  fontSize: 10,
  color: 'rgba(255,255,255,0.35)',
  fontFamily: 'DM Sans, sans-serif',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  marginBottom: 6,
  display: 'block',
}

export default function Contact() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', reason: '', message: ''
  })
  const [status, setStatus] = useState('idle')
  const [focused, setFocused] = useState(null)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        'service_vwwmn6e',
        'template_8ubn7kc',
        {
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          reason: form.reason,
          message: form.message,
          time: new Date().toLocaleString(),
        },
        '-YN2OEFjzZsKwhc6e'
      )
      setStatus('success')
      setForm({ firstName: '', lastName: '', email: '', reason: '', message: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" style={{
      position: 'relative',
      padding: '120px 0 100px',
      background: '#07080f',
      width: '100vw',
      marginLeft: 'calc(-50vw + 50%)',
      overflow: 'hidden',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>

      {/* Particle animation background */}
      <ParticleCanvas />

      {/* Background glow blobs */}
      <div style={{
        position: 'absolute', bottom: -100, left: -100,
        width: 400, height: 400, borderRadius: '50%',
        background: '#6ee7f7', opacity: 0.03,
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: -80, right: -80,
        width: 350, height: 350, borderRadius: '50%',
        background: '#a78bfa', opacity: 0.03,
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: 52, position: 'relative', zIndex: 1 }}
      >
        <div style={{
          fontSize: 10, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: '#6ee7f7',
          marginBottom: 10, opacity: 0.7,
          fontFamily: 'monospace',
        }}>
          Get in touch
        </div>
        <h2 style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 800,
          fontSize: 44, letterSpacing: '-0.02em',
          color: '#fff', margin: '0 0 12px',
          lineHeight: 1.1,
        }}>
          Let's work{' '}
          <span style={{
            background: 'linear-gradient(90deg, #6ee7f7, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            together.
          </span>
        </h2>
        <p style={{
          fontSize: 14, color: '#3d4a5c',
          lineHeight: 1.7, maxWidth: 440, margin: '0 auto',
        }}>
          Have a project in mind or just want to say hello?
          Fill out the form and I'll get back to you soon!
        </p>
      </motion.div>

      {/* Form container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{
          position: 'relative', zIndex: 1,
          width: '100%', maxWidth: 620,
          padding: '0 24px',
        }}
      >
        {/* Card */}
        <div style={{
          background: 'rgba(12,14,28,0.8)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 20,
          padding: '40px 44px',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Top accent line */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(110,231,247,0.6), rgba(167,139,250,0.6), transparent)',
          }} />

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                style={{ textAlign: 'center', padding: '32px 0' }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  style={{ fontSize: 56, marginBottom: 20 }}
                >
                  🎉
                </motion.div>
                <div style={{
                  fontSize: 24, fontWeight: 800,
                  color: '#fff', fontFamily: 'Syne, sans-serif',
                  marginBottom: 10,
                }}>
                  Message sent!
                </div>
                <div style={{
                  fontSize: 14, color: '#3d4a5c', lineHeight: 1.7,
                  marginBottom: 28,
                }}>
                  Thanks for reaching out, I'll get back to you as soon as possible.
                </div>
                <button
                  onClick={() => setStatus('idle')}
                  style={{
                    fontSize: 12, color: '#6ee7f7',
                    background: 'transparent',
                    border: '1px solid rgba(110,231,247,0.3)',
                    padding: '9px 22px', borderRadius: 8,
                    cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
              >
                {/* Name row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={labelStyle}>First name</label>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      onFocus={() => setFocused('firstName')}
                      onBlur={() => setFocused(null)}
                      placeholder="Unish"
                      required
                      style={inputStyle(focused === 'firstName')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Last name</label>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      onFocus={() => setFocused('lastName')}
                      onBlur={() => setFocused(null)}
                      placeholder="Aryal"
                      required
                      style={inputStyle(focused === 'lastName')}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label style={labelStyle}>Email address</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    placeholder="you@example.com"
                    required
                    style={inputStyle(focused === 'email')}
                  />
                </div>

                {/* Reason */}
                <div>
                  <label style={labelStyle}>Reason for contact</label>
                  <select
                    name="reason"
                    value={form.reason}
                    onChange={handleChange}
                    onFocus={() => setFocused('reason')}
                    onBlur={() => setFocused(null)}
                    required
                    style={{
                      ...inputStyle(focused === 'reason'),
                      cursor: 'pointer',
                    }}
                  >
                    <option value="" style={{ background: '#0c0e1c' }}>
                      Select a reason...
                    </option>
                    <option value="Job Opportunity" style={{ background: '#0c0e1c' }}>
                      Job Opportunity
                    </option>
                    <option value="Freelance Project" style={{ background: '#0c0e1c' }}>
                      Freelance Project
                    </option>
                    <option value="Collaboration" style={{ background: '#0c0e1c' }}>
                      Collaboration
                    </option>
                    <option value="Just saying hi" style={{ background: '#0c0e1c' }}>
                      Just saying hi 👋
                    </option>
                    <option value="Other" style={{ background: '#0c0e1c' }}>
                      Other
                    </option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label style={labelStyle}>Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    placeholder="Tell me about your project or idea..."
                    required
                    rows={5}
                    style={{
                      ...inputStyle(focused === 'message'),
                      resize: 'vertical',
                      minHeight: 120,
                    }}
                  />
                </div>

                {/* Error */}
                {status === 'error' && (
                  <div style={{
                    fontSize: 12, color: '#ff6b6b',
                    background: 'rgba(255,107,107,0.08)',
                    border: '1px solid rgba(255,107,107,0.2)',
                    borderRadius: 8, padding: '10px 14px',
                  }}>
                    Something went wrong. Please email me directly at{' '}
                    <a href="mailto:aryalunish09@gmail.com" style={{ color: '#ff6b6b' }}>
                      aryalunish09@gmail.com
                    </a>
                  </div>
                )}

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                  whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                  style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: 10,
                    fontSize: 14, fontWeight: 700,
                    color: '#07080f',
                    background: status === 'sending'
                      ? 'rgba(110,231,247,0.5)'
                      : 'linear-gradient(135deg, #6ee7f7, #a78bfa)',
                    border: 'none', borderRadius: 10,
                    padding: '15px 28px',
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    fontFamily: 'Syne, sans-serif',
                    letterSpacing: '0.02em',
                    marginTop: 4,
                    width: '100%',
                  }}
                >
                  {status === 'sending' ? (
                    <>
                      <div style={{
                        width: 14, height: 14, borderRadius: '50%',
                        border: '2px solid #07080f',
                        borderTopColor: 'transparent',
                        animation: 'spin 0.8s linear infinite',
                      }} />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send message
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M2 12L12 2M12 2H5M12 2V9"
                          stroke="#07080f" strokeWidth="2"
                          strokeLinecap="round" strokeLinejoin="round"
                        />
                      </svg>
                    </>
                  )}
                </motion.button>

                {/* Bottom info */}
                <div style={{
                  display: 'flex', justifyContent: 'center',
                  gap: 24, marginTop: 4,
                }}>
                  {[
                    { label: '📧', value: 'aryalunish09@gmail.com' },
                    { label: '🟢', value: 'Available for work' },
                  ].map(item => (
                    <div key={item.label} style={{
                      fontSize: 11, color: '#3d4a5c',
                      fontFamily: 'DM Sans, sans-serif',
                      display: 'flex', alignItems: 'center', gap: 5,
                    }}>
                      <span>{item.label}</span>
                      <span>{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        input::placeholder, textarea::placeholder {
          color: rgba(255,255,255,0.2);
        }
        select option {
          background: #0c0e1c;
          color: #ffffff;
        }
      `}</style>
    </section>
  )
}