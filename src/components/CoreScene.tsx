import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * "CRM core": a glowing wireframe core with modules orbiting it, each wired back to the
 * center, plus a slow particle field. Follows the pointer, reacts to the theme, pauses
 * when off screen, and renders a still frame for reduced-motion users.
 */

const MODULES = 9

function readColors() {
  const s = getComputedStyle(document.documentElement)
  return {
    accent: new THREE.Color(s.getPropertyValue('--accent').trim() || '#b6ff3b'),
    accent2: new THREE.Color(s.getPropertyValue('--accent-2').trim() || '#3be3ff'),
    accent3: new THREE.Color(s.getPropertyValue('--accent-3').trim() || '#ff5ca8'),
    muted: new THREE.Color(s.getPropertyValue('--muted').trim() || '#8a94ab'),
    light: document.documentElement.dataset.theme === 'light',
  }
}

export default function CoreScene({ theme }: { theme: string }) {
  const mountRef = useRef<HTMLDivElement>(null)
  const applyThemeRef = useRef<() => void>(() => {})

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
    } catch {
      return // No WebGL: the hero still works without the scene.
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0, 9)

    const root = new THREE.Group()
    scene.add(root)

    // Core: wireframe icosahedron with an inner solid and a soft shell.
    const coreGeo = new THREE.IcosahedronGeometry(1.35, 1)
    const coreWire = new THREE.LineSegments(
      new THREE.WireframeGeometry(coreGeo),
      new THREE.LineBasicMaterial({ transparent: true, opacity: 0.9 }),
    )
    const coreInner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.75, 0),
      new THREE.MeshBasicMaterial({ wireframe: false, transparent: true, opacity: 0.18 }),
    )
    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.9, 2),
      new THREE.MeshBasicMaterial({ wireframe: true, transparent: true, opacity: 0.06 }),
    )
    root.add(coreWire, coreInner, shell)

    // Orbit rings.
    const rings: THREE.Line[] = []
    const ringGroup = new THREE.Group()
    root.add(ringGroup)
    ;[2.8, 3.6].forEach((r, i) => {
      const pts = new THREE.EllipseCurve(0, 0, r, r).getPoints(128).map((p) => new THREE.Vector3(p.x, p.y, 0))
      const ring = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineDashedMaterial({ dashSize: 0.12, gapSize: 0.1, transparent: true, opacity: 0.35 }),
      )
      ring.computeLineDistances()
      ring.rotation.x = Math.PI / 2.4 + i * 0.35
      ring.rotation.y = i * 0.6
      rings.push(ring)
      ringGroup.add(ring)
    })

    // Modules orbiting the core, each linked to the center.
    type Mod = { mesh: THREE.Mesh; radius: number; speed: number; phase: number; tilt: number; ring: number }
    const mods: Mod[] = []
    const linkPositions = new Float32Array(MODULES * 2 * 3)
    const linkGeo = new THREE.BufferGeometry()
    linkGeo.setAttribute('position', new THREE.BufferAttribute(linkPositions, 3))
    const links = new THREE.LineSegments(linkGeo, new THREE.LineBasicMaterial({ transparent: true, opacity: 0.22 }))
    root.add(links)
    const modGeo = new THREE.OctahedronGeometry(0.13, 0)
    for (let i = 0; i < MODULES; i++) {
      const ringIdx = i % 2
      const mesh = new THREE.Mesh(modGeo, new THREE.MeshBasicMaterial({ transparent: true }))
      mods.push({
        mesh,
        radius: ringIdx ? 3.6 : 2.8,
        speed: (0.12 + Math.random() * 0.1) * (ringIdx ? -1 : 1),
        phase: (i / MODULES) * Math.PI * 2,
        tilt: 0,
        ring: ringIdx,
      })
      root.add(mesh)
    }

    // Particle field.
    const P = 700
    const pPos = new Float32Array(P * 3)
    for (let i = 0; i < P; i++) {
      const r = 5 + Math.random() * 9
      const t = Math.random() * Math.PI * 2
      const p = Math.acos(2 * Math.random() - 1)
      pPos[i * 3] = r * Math.sin(p) * Math.cos(t)
      pPos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t)
      pPos[i * 3 + 2] = r * Math.cos(p) - 4
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.035, transparent: true, opacity: 0.6 }))
    scene.add(particles)

    const applyTheme = () => {
      const c = readColors()
      ;(coreWire.material as THREE.LineBasicMaterial).color = c.accent
      ;(coreInner.material as THREE.MeshBasicMaterial).color = c.accent
      ;(shell.material as THREE.MeshBasicMaterial).color = c.accent2
      rings.forEach((r) => ((r.material as THREE.LineDashedMaterial).color = c.muted))
      ;(links.material as THREE.LineBasicMaterial).color = c.accent2
      mods.forEach((m, i) => {
        ;(m.mesh.material as THREE.MeshBasicMaterial).color = [c.accent2, c.accent, c.accent3][i % 3]
      })
      ;(particles.material as THREE.PointsMaterial).color = c.muted
      ;(particles.material as THREE.PointsMaterial).opacity = c.light ? 0.45 : 0.6
      ;(shell.material as THREE.MeshBasicMaterial).opacity = c.light ? 0.1 : 0.06
      renderer.render(scene, camera)
    }
    applyThemeRef.current = applyTheme
    applyTheme()

    // Sizing.
    const resize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      renderer.domElement.style.width = '100%'
      renderer.domElement.style.height = '100%'
      camera.aspect = w / h
      camera.position.z = w < 640 ? 11 : 9
      camera.updateProjectionMatrix()
      renderer.render(scene, camera)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(mount)
    resize()

    // Pointer parallax.
    const target = { x: 0, y: 0 }
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    // Pause when not visible.
    let visible = true
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    io.observe(mount)

    const ringQuat = rings.map((r) => r.quaternion.clone())
    const v = new THREE.Vector3()
    const clock = new THREE.Clock()
    let raf = 0

    const frame = () => {
      const t = reduced ? 4 : clock.getElapsedTime()
      coreWire.rotation.set(t * 0.15, t * 0.22, 0)
      coreInner.rotation.set(-t * 0.3, t * 0.1, 0)
      shell.rotation.y = -t * 0.05
      const pulse = 1 + Math.sin(t * 1.6) * 0.03
      coreWire.scale.setScalar(pulse)

      mods.forEach((m, i) => {
        const a = m.phase + t * m.speed
        v.set(Math.cos(a) * m.radius, Math.sin(a) * m.radius, 0).applyQuaternion(ringQuat[m.ring])
        m.mesh.position.copy(v)
        m.mesh.rotation.set(t, t * 0.7, 0)
        linkPositions.set([0, 0, 0, v.x, v.y, v.z], i * 6)
      })
      linkGeo.attributes.position.needsUpdate = true
      particles.rotation.y = t * 0.012

      root.rotation.y += (target.x * 0.35 - root.rotation.y) * 0.04
      root.rotation.x += (target.y * 0.2 - root.rotation.x) * 0.04
      renderer.render(scene, camera)
    }

    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (visible && !document.hidden) frame()
    }
    if (reduced) frame()
    else loop()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      scene.traverse((o) => {
        const obj = o as THREE.Mesh
        obj.geometry?.dispose()
        const mat = obj.material as THREE.Material | THREE.Material[] | undefined
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
        else mat?.dispose()
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  useEffect(() => {
    // Re-read CSS colors after the theme attribute changes.
    const id = requestAnimationFrame(() => applyThemeRef.current())
    return () => cancelAnimationFrame(id)
  }, [theme])

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />
}
