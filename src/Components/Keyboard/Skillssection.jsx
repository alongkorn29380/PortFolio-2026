import { useEffect, useRef, Suspense, useState, useCallback } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { KeyboardModel } from './Keyboard'
import './Skillssection.css'

function CameraLookAt({ target }) {
  const { camera } = useThree()
  useEffect(() => { camera.lookAt(...target) }, [camera, target])
  return null
}

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

export function SkillsSection() {
  const trackRef = useRef()
  const progress = useRef(0)
  const [activeSkill, setActiveSkill] = useState(null)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)

  const handleHoverChange = useCallback((skill) => setActiveSkill(skill), [])

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const el = trackRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      progress.current = total > 0 ? clamp(-rect.top, 0, total) / total : 0
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const accentColor = activeSkill?.hoverColor ?? '#22d3ee'

  return (
    <section className="skills-track" id="skills" ref={trackRef}>
      <div className="skills-sticky">
        <div className="skills-head">
          <h2>Skills</h2>
        </div>

        <div
          className={`skill-panel${activeSkill ? ' skill-panel--active' : ''}`}
          style={{ '--accent': accentColor }}
        >
          {activeSkill ? (
            /* key forces remount on every skill change → animations replay */
            <div className="skill-panel__body" key={activeSkill.label}>
              <div className="skill-panel__icon-wrap">
                <img
                  className="skill-panel__icon"
                  src={activeSkill.logo}
                  alt={activeSkill.label}
                />
              </div>
              <h3 className="skill-panel__name" style={{ color: activeSkill.hoverColor }}>
                {activeSkill.label}
              </h3>
              <p className="skill-panel__desc">{activeSkill.desc}</p>
            </div>
          ) : (
            <div className="skill-panel__idle">
              <span className="skill-panel__idle-hint">
                {isMobile ? '↑  tap a key' : '→  hover a key'}
              </span>
            </div>
          )}
        </div>

        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: isMobile ? [0, 5, 8] : [0, 5, 9], fov: isMobile ? 52 : 42 }}
          gl={{ antialias: true, alpha: true }}
        >
          <CameraLookAt target={isMobile ? [0, -2, 0] : [3, 1, 0]} />
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
            <KeyboardModel progressRef={progress} onHoverChange={handleHoverChange} isMobile={isMobile} />
            <ContactShadows position={[0, -0.5, 0]} opacity={0.5} scale={24} blur={2.6} far={6} />
            <Environment preset="city" environmentIntensity={0.6} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}
