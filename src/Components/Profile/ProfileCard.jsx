import { useRef, useMemo, useCallback, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { RigidBody, useSpringJoint } from '@react-three/rapier'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

const CARD_W = 2.0
const CARD_H = 2.8
const CARD_D = 0.18
const ANCHOR_POS = new THREE.Vector3(2.5, 4, 0)
const DRAG_PLANE = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)

function makeFrontTexture() {
  const W = 512, H = 720
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')
  const texture = new THREE.CanvasTexture(canvas)

  function draw(img) {
    const grad = ctx.createLinearGradient(0, 0, 0, H)
    grad.addColorStop(0, '#0d1b2a')
    grad.addColorStop(1, '#1b263b')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, W, H)

    // Scattered rotated square outlines in corners
    ;[
      { x: 430, y: 80,  size: 50, angle: Math.PI / 8,  alpha: 0.35, fill: false },
      { x: 80,  y: 620, size: 55, angle: -Math.PI / 6, alpha: 0.28, fill: false },
      { x: 450, y: 650, size: 60, angle: Math.PI / 5,  alpha: 0.12, fill: true  },
      { x: 65,  y: 105, size: 35, angle: Math.PI / 12, alpha: 0.22, fill: false },
    ].forEach(({ x, y, size, angle, alpha, fill }) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle)
      ctx.strokeStyle = `rgba(34,211,238,${alpha})`
      ctx.lineWidth = 2
      if (fill) {
        ctx.fillStyle = `rgba(34,211,238,${alpha})`
        ctx.fillRect(-size / 2, -size / 2, size, size)
      }
      ctx.strokeRect(-size / 2, -size / 2, size, size)
      ctx.restore()
    })

    // Large square photo area (80% of card width)
    const PS = 410
    const px = (W - PS) / 2
    const py = 55

    if (img) {
      ctx.save()
      ctx.beginPath()
      ctx.rect(px, py, PS, PS)
      ctx.clip()
      ctx.drawImage(img, px, py, PS, PS)
      ctx.restore()
    } else {
      ctx.fillStyle = '#2a3f5f'
      ctx.fillRect(px, py, PS, PS)
    }

    // Photo border
    ctx.strokeStyle = 'rgba(34,211,238,0.7)'
    ctx.lineWidth = 3
    ctx.strokeRect(px, py, PS, PS)

    // Name only
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 48px Arial, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('Alongkorn', W / 2, py + PS + 70)

    texture.needsUpdate = true
  }

  // Draw placeholder immediately (photo loads async)
  draw(null)
  const img = new Image()
  img.onload = () => draw(img)
  img.src = '/Images/Me.jpg'

  return texture
}

function makeBackTexture() {
  const W = 512, H = 720
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')

  const grad = ctx.createLinearGradient(0, 0, 0, H)
  grad.addColorStop(0, '#0d1b2a')
  grad.addColorStop(1, '#1b263b')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, W, H)

  // Nested concentric squares, each rotated 12° more
  const cx = W / 2, cy = H / 2
  ;[
    { size: 380, opacity: 0.6,  angle: 0 },
    { size: 300, opacity: 0.45, angle: 12 * Math.PI / 180 },
    { size: 220, opacity: 0.3,  angle: 24 * Math.PI / 180 },
    { size: 140, opacity: 0.15, angle: 36 * Math.PI / 180 },
  ].forEach(({ size, opacity, angle }) => {
    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate(angle)
    ctx.strokeStyle = `rgba(34,211,238,${opacity})`
    ctx.lineWidth = 1.5
    ctx.strokeRect(-size / 2, -size / 2, size, size)
    ctx.restore()
  })

  return new THREE.CanvasTexture(canvas)
}

export default function ProfileCard() {
  const anchorRef = useRef()
  const cardRef   = useRef()
  const bandRef   = useRef()
  const isDragging  = useRef(false)
  const dragOffset  = useRef(new THREE.Vector3())
  const { gl } = useThree()

  const cardGeom     = useMemo(() => new RoundedBoxGeometry(CARD_W, CARD_H, CARD_D, 4, 0.08), [])
  const frontTexture = useMemo(() => makeFrontTexture(), [])
  const backTexture  = useMemo(() => makeBackTexture(), [])

  useEffect(() => () => { frontTexture.dispose(); backTexture.dispose() }, [frontTexture, backTexture])

  // Spring joint: anchor → card top
  useSpringJoint(anchorRef, cardRef, [
    [0, 0, 0],          // anchor local point
    [0, CARD_H / 2, 0], // card local point (top)
    2.5,                // restLength
    40,                 // stiffness
    4,                  // damping
  ])

  const handlePointerDown = useCallback((e) => {
    e.stopPropagation()
    isDragging.current = true
    cardRef.current.setBodyType(2) // KinematicPositionBased
    const hit = new THREE.Vector3()
    e.ray.intersectPlane(DRAG_PLANE, hit)
    const t = cardRef.current.translation()
    dragOffset.current.set(t.x - hit.x, t.y - hit.y, 0)
    gl.domElement.style.cursor = 'grabbing'
  }, [gl])

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) return
    isDragging.current = false
    cardRef.current.setBodyType(0) // Dynamic
    gl.domElement.style.cursor = 'grab'
  }, [gl])

  useEffect(() => {
    if (!bandRef.current) return
    const curve = new THREE.QuadraticBezierCurve3(
      ANCHOR_POS,
      new THREE.Vector3(ANCHOR_POS.x, 2.5, 0),
      new THREE.Vector3(ANCHOR_POS.x, 0.5 + CARD_H / 2, 0)
    )
    bandRef.current.geometry = new THREE.TubeGeometry(curve, 24, 0.02, 8, false)
  }, [])

  useFrame(({ pointer, camera, raycaster }) => {
    if (isDragging.current && cardRef.current) {
      raycaster.setFromCamera(pointer, camera)
      const hit = new THREE.Vector3()
      raycaster.ray.intersectPlane(DRAG_PLANE, hit)
      cardRef.current.setNextKinematicTranslation({
        x: hit.x + dragOffset.current.x,
        y: hit.y + dragOffset.current.y,
        z: 0,
      })
    }

    if (cardRef.current && bandRef.current) {
      const t = cardRef.current.translation()
      const cardTop = new THREE.Vector3(t.x, t.y + CARD_H / 2, t.z)
      const stretch = ANCHOR_POS.distanceTo(cardTop)
      const sag     = Math.max(0.05, 0.4 - stretch * 0.06)
      const ctrl    = new THREE.Vector3(
        (ANCHOR_POS.x + cardTop.x) / 2,
        (ANCHOR_POS.y + cardTop.y) / 2 - sag,
        0
      )
      const curve  = new THREE.QuadraticBezierCurve3(ANCHOR_POS, ctrl, cardTop)
      const radius = Math.max(0.012, 0.025 - stretch * 0.002)
      const geom   = new THREE.TubeGeometry(curve, 24, radius, 8, false)
      bandRef.current.geometry.dispose()
      bandRef.current.geometry = geom
    }
  })

  return (
    <>
      {/* Ceiling hook */}
      <mesh position={ANCHOR_POS.toArray()}>
        <cylinderGeometry args={[0.05, 0.05, 0.08, 16]} />
        <meshStandardMaterial color="#aaa" metalness={0.95} roughness={0.05} />
      </mesh>

      {/* Fixed anchor RigidBody */}
      <RigidBody ref={anchorRef} type="fixed" position={ANCHOR_POS.toArray()}>
        <mesh visible={false}>
          <sphereGeometry args={[0.01]} />
          <meshBasicMaterial />
        </mesh>
      </RigidBody>

      {/* Band mesh */}
      <mesh ref={bandRef}>
        <meshStandardMaterial color="#222" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* Card RigidBody */}
      <RigidBody
        ref={cardRef}
        type="dynamic"
        position={[ANCHOR_POS.x, 0.5, 0]}
        enabledRotations={[false, false, true]}
        mass={0.5}
        linearDamping={0.5}
        angularDamping={0.8}
      >
        {/* Card body — material array */}
        <mesh
          geometry={cardGeom}
          castShadow
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerEnter={() => { gl.domElement.style.cursor = 'grab' }}
        >
          {[0,1,2,3,4,5].map(i => (
            <meshStandardMaterial
              key={i}
              attach={`material-${i}`}
              map={i === 4 ? frontTexture : null}
              color={i === 4 ? undefined : '#0d1b2a'}
              roughness={0.15}
              metalness={0.1}
            />
          ))}
        </mesh>

        {/* Back face overlay — inset */}
        <mesh position={[0, 0, -CARD_D / 2 - 0.001]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[CARD_W - 0.06, CARD_H - 0.06]} />
          <meshStandardMaterial map={backTexture} roughness={0.3} />
        </mesh>

        {/* Hole ring */}
        <mesh position={[0, CARD_H / 2 - 0.2, CARD_D / 2 + 0.001]}>
          <ringGeometry args={[0.055, 0.1, 32]} />
          <meshStandardMaterial color="#888" metalness={0.9} roughness={0.1} />
        </mesh>
      </RigidBody>
    </>
  )
}
