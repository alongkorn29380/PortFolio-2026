import { useMemo, useEffect, useState, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { KEY_PAIRS } from './Keyboardmap'

const lerp = THREE.MathUtils.lerp
const clamp = THREE.MathUtils.clamp

const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3)

const MESH_TO_IDX = {}
KEY_PAIRS.forEach((p, i) => {
  MESH_TO_IDX[p.sw] = i
  MESH_TO_IDX[p.cap] = i
})

const DEFAULT_HOVER_COLOR = new THREE.Color('#22d3ee')

export function KeyboardModel({ progressRef, onHoverChange }) {
  const { scene } = useGLTF('/Models/keyboard.glb')
  const { raycaster, camera, gl } = useThree()

  const [hover, setHoverState] = useState(null)
  const hoverRef   = useRef(null)
  const mouse      = useRef(new THREE.Vector2(-10, -10))
  const missFrames = useRef(0)

  useEffect(() => {
    const canvas = gl.domElement

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      if (
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top  && e.clientY <= rect.bottom
      ) {
        mouse.current.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1
        mouse.current.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1
      } else {
        mouse.current.set(-10, -10)
      }
    }

    window.addEventListener('pointermove',  onMove)
    window.addEventListener('pointerleave', () => mouse.current.set(-10, -10))
    return () => {
      window.removeEventListener('pointermove',  onMove)
      window.removeEventListener('pointerleave', () => mouse.current.set(-10, -10))
    }
  }, [gl])

  useEffect(() => {
    onHoverChange?.(hover !== null ? KEY_PAIRS[hover] : null)
  }, [hover, onHoverChange])

  const logoMap = useMemo(
    () => KEY_PAIRS.reduce((a, p) => { a[p.sw] = p.logo; return a }, {}),
    []
  )
  const logos = useTexture(logoMap)

  const { board, pairs } = useMemo(() => {
    const board = new THREE.Group()
    board.name = 'board'
    const swMeshes  = {}
    const capMeshes = {}
    const toBoard   = []

    scene.children.slice().forEach((child) => {
      const idx = MESH_TO_IDX[child.name]
      if (idx === undefined) { toBoard.push(child); return }
      if (child.geometry) child.geometry.computeBoundingBox()

      const isSwitch = child.name === KEY_PAIRS[idx].sw
      if (isSwitch) {
        if (child.material) child.material = child.material.clone()
        swMeshes[idx] = child
      } else {
        if (child.material) child.material = child.material.clone()
        capMeshes[idx] = child
      }
    })

    const pairs = KEY_PAIRS.map((p, i) => {
      const sw  = swMeshes[i]
      const cap = capMeshes[i]

      if (!sw || !cap) {
        if (sw)  toBoard.push(sw)
        if (cap) toBoard.push(cap)
        return null
      }

      const capBB = cap.geometry?.boundingBox
      const top = capBB ? capBB.max.y : 0.5
      const cx  = capBB ? (capBB.max.x + capBB.min.x) / 2 : 0
      const cz  = capBB ? (capBB.max.z + capBB.min.z) / 2 : 0
      const w   = capBB ? Math.min(capBB.max.x - capBB.min.x, capBB.max.z - capBB.min.z) : 1

      sw.scale.setScalar(0.0001)
      cap.scale.setScalar(0.0001)

      const hoverColor = p.hoverColor ? new THREE.Color(p.hoverColor) : DEFAULT_HOVER_COLOR
      const mat = cap.material

      return {
        pairIdx: i,
        label: p.label,
        logo: p.logo,
        sw, cap,
        swRest:       sw.position.clone(),
        capRest:      cap.position.clone(),
        capBaseColor: (mat && !Array.isArray(mat)) ? mat.color.clone() : new THREE.Color(1, 1, 1),
        hoverColor,
        top, cx, cz,
        size: w * 0.52,
      }
    }).filter(Boolean)

    pairs.sort((a, b) => {
      const rowA = Math.round(a.capRest.z * 100)
      const rowB = Math.round(b.capRest.z * 100)
      if (rowA !== rowB) return rowA - rowB
      return a.capRest.x - b.capRest.x
    })

    toBoard.forEach((o) => board.add(o))
    scene.add(board)
    return { board, pairs }
  }, [scene])

  useEffect(() => {
    const added = []
    pairs.forEach((p) => {
      if (p.logo.startsWith('data:')) return
      const tex = logos[KEY_PAIRS[p.pairIdx].sw]
      if (!tex) return
      tex.colorSpace = THREE.SRGBColorSpace
      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(p.size, p.size),
        new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false })
      )
      plane.rotation.x = -Math.PI / 2
      plane.position.set(p.cx, p.top + 0.015, p.cz)
      plane.renderOrder = 2
      p.cap.add(plane)
      added.push([p.cap, plane])
    })
    return () => added.forEach(([obj, pl]) => obj.remove(pl))
  }, [pairs, logos])

  useFrame(() => {
    const prog = progressRef.current ?? 0

    board.position.x = lerp(-13, 0, easeOutCubic(clamp(prog / 0.18, 0, 1)))

    // Raycast hover detection 
    if (pairs.length > 0) {
      raycaster.setFromCamera(mouse.current, camera)
      const capMeshList = pairs.map(p => p.cap)
      const hits   = raycaster.intersectObjects(capMeshList, false)
      const hitIdx = hits.length > 0 ? (MESH_TO_IDX[hits[0].object.name] ?? null) : null

      if (hitIdx !== null) {
        missFrames.current = 0
        if (hitIdx !== hoverRef.current) {
          hoverRef.current = hitIdx
          setHoverState(hitIdx)
        }
      } else {
        // Debounce: wait 4 frames of no hits before clearing hover.
        // Prevents strobe when ray briefly misses between keycap edges.
        missFrames.current++
        if (missFrames.current > 4 && hoverRef.current !== null) {
          hoverRef.current = null
          setHoverState(null)
        }
      }
    }

    // Per-key animation 
    pairs.forEach((p, sortedIdx) => {
      const t        = sortedIdx / pairs.length
      const swStart  = 0.16 + t * 0.52
      const capStart = swStart + 0.055

      const swE  = easeOutCubic(clamp((prog - swStart)  / 0.1, 0, 1))
      const capE = easeOutCubic(clamp((prog - capStart) / 0.1, 0, 1))

      const isHov = hoverRef.current === p.pairIdx
      // Press down on hover (only when fully assembled)
      const press = (capE >= 1 && isHov) ? -0.03 : 0

      const currentSwY  = lerp(p.swRest.y + 4, p.swRest.y, swE)
      const currentCapY = lerp(p.capRest.y + 4, p.capRest.y, capE)

      p.sw.position.set(p.swRest.x, currentSwY,            p.swRest.z)
      p.sw.scale.setScalar(Math.max(0.0001, swE))

      p.cap.position.set(p.capRest.x, currentCapY + press, p.capRest.z)
      p.cap.scale.setScalar(Math.max(0.0001, capE))

      // Solid single color on hover — no emissive, just base color swap
      const mat = p.cap.material
      if (mat && !Array.isArray(mat)) {
        if (isHov) {
          mat.color.set(p.hoverColor)
        } else {
          mat.color.copy(p.capBaseColor)
        }
      }
    })
  })

  return (
    <group position={[3, 1, 1]} scale={2.5} rotation={[0.3, 1, 0]}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/Models/keyboard.glb')
