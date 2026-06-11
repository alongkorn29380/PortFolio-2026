import { useEffect, useRef, Suspense, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { KeyboardModel } from './Keyboard'
import './Skillssection.css'

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

export function SkillsSection() {
  const trackRef = useRef()
  const progress = useRef(0)
  const [activeSkill, setActiveSkill] = useState(null)

  const handleHoverChange = useCallback((skill) => setActiveSkill(skill), [])

  useEffect(() => {
    const isMobile = window.innerWidth < 768

    if (isMobile) {
      let raf, t0 = null, playing = false
      const io = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) playing = true },
        { threshold: 0.25 }
      )
      if (trackRef.current) io.observe(trackRef.current)
      const tick = (t) => {
        if (playing) { if (t0 === null) t0 = t; progress.current = Math.min(1, (t - t0) / 1500) }
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
      return () => { io.disconnect(); cancelAnimationFrame(raf) }
    }

    const sc = document.getElementById('scroll-container')
    const onScroll = () => {
      const el = trackRef.current
      if (!el || !sc) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      progress.current = total > 0 ? clamp(-rect.top, 0, total) / total : 0
    }
    const target = sc || window
    target.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => target.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="skills-track" id="skills" ref={trackRef}>
      <div className="skills-sticky">
        <div className="skills-head">
          <h2>Skills</h2>
        </div>

        {/* Info panel in the left empty space */}
        <div className="skill-panel">
          {activeSkill ? (
            <div className="skill-panel__body">
              <img
                className="skill-panel__icon"
                src={activeSkill.logo}
                alt={activeSkill.label}
              />
              <h3
                className="skill-panel__name"
                style={{ color: activeSkill.hoverColor }}
              >
                {activeSkill.label}
              </h3>
              <p className="skill-panel__desc">{activeSkill.desc}</p>
            </div>
          ) : (
            <span className="skill-panel__idle">hover a key —</span>
          )}
        </div>

        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 5, 9], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight
            castShadow
            position={[6, 13, 7]}
            intensity={2.2}
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0002}
          />
          <directionalLight position={[-8, 5, -6]} intensity={1.0} color="#9db4ff" />
          <Suspense fallback={null}>
            <KeyboardModel progressRef={progress} onHoverChange={handleHoverChange} />
            <ContactShadows position={[0, -0.5, 0]} opacity={0.5} scale={24} blur={2.6} far={6} />
            <Environment preset="city" environmentIntensity={0.6} />
          </Suspense>
        </Canvas>

      </div>
    </section>
  )
}
