import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

const CARD_W = 2.0
const CARD_H = 2.8
const CARD_D = 0.06

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
  const cardGeom = useMemo(() => new RoundedBoxGeometry(CARD_W, CARD_H, CARD_D, 4, 0.08), [])
  const frontTexture = useMemo(() => makeFrontTexture(), [])
  const backTexture  = useMemo(() => makeBackTexture(),  [])

  return (
    <group position={[2.5, 0.5, 0]}>
      {/* Card body */}
      <mesh geometry={cardGeom} castShadow>
        <meshStandardMaterial map={frontTexture} roughness={0.15} metalness={0.1} />
      </mesh>

      {/* Back face overlay */}
      <mesh position={[0, 0, -CARD_D / 2 - 0.001]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[CARD_W, CARD_H]} />
        <meshStandardMaterial map={backTexture} roughness={0.3} />
      </mesh>

      {/* Hole ring at top */}
      <mesh position={[0, CARD_H / 2 - 0.2, CARD_D / 2 + 0.001]}>
        <ringGeometry args={[0.055, 0.1, 32]} />
        <meshStandardMaterial color="#888" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}
