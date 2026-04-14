import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Work', href: '#work' },
    { label: 'Skills', href: '#skills' },
    { label: 'About', href: '#top' },
    { label: 'Contact', href: '#contact' },
  ]

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setActiveLink(href)
    if (href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const id = href.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        const offset = 80
        const top = el.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 48px',
        height: 64,
        background: scrolled ? 'rgba(7,8,15,0.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.06)'
          : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}
    >
      {/* Logo */}
      <motion.div
        whileHover={{ opacity: 0.8 }}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          cursor: 'pointer',
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <div style={{
          width: 28, height: 28,
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 7,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <div style={{
            width: 12, height: 12,
            background: '#6ee7f7',
            borderRadius: 3,
            transform: 'rotate(45deg)',
          }} />
        </div>
        <div style={{
          fontSize: 15, fontWeight: 700,
          color: '#ffffff', fontFamily: 'Syne, sans-serif',
          letterSpacing: '0.01em',
        }}>
          Unish<span style={{ color: 'rgba(255,255,255,0.3)' }}>.</span>Aryal
        </div>
      </motion.div>

      {/* Center nav links */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 2,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 40,
        padding: '4px 6px',
      }}>
        {links.map(link => (
          <a
            key={link.label}
            href={link.href === '#top' ? '#' : link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            style={{
              position: 'relative',
              fontSize: 13, fontWeight: 500,
              color: activeLink === link.href
                ? '#ffffff'
                : 'rgba(255,255,255,0.45)',
              textDecoration: 'none',
              padding: '6px 16px',
              borderRadius: 30,
              background: activeLink === link.href
                ? 'rgba(255,255,255,0.08)'
                : 'transparent',
              border: activeLink === link.href
                ? '1px solid rgba(255,255,255,0.1)'
                : '1px solid transparent',
              fontFamily: 'DM Sans, sans-serif',
              letterSpacing: '0.02em',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              if (activeLink !== link.href) {
                e.currentTarget.style.color = 'rgba(255,255,255,0.85)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
              }
            }}
            onMouseLeave={e => {
              if (activeLink !== link.href) {
                e.currentTarget.style.color = 'rgba(255,255,255,0.45)'
                e.currentTarget.style.background = 'transparent'
              }
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Hire me CTA */}
      <motion.a
        href="#contact"
        onClick={(e) => handleNavClick(e, '#contact')}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          fontSize: 13, fontWeight: 600,
          color: '#ffffff', textDecoration: 'none',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.12)',
          padding: '8px 8px 8px 18px',
          borderRadius: 40,
          fontFamily: 'DM Sans, sans-serif',
          letterSpacing: '0.02em',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
        }}
      >
        Hire me
        <div style={{
          width: 28, height: 28,
          background: '#ffffff',
          borderRadius: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path
              d="M2.5 10.5L10.5 2.5M10.5 2.5H4.5M10.5 2.5V8.5"
              stroke="#07080f"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.a>
    </motion.nav>
  )
}