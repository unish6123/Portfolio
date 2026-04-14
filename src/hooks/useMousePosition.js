import { useState, useEffect } from 'react'

export function useMousePosition() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handle = (e) => setMouse({
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: -(e.clientY / window.innerHeight - 0.5) * 2
    })
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  return mouse
}