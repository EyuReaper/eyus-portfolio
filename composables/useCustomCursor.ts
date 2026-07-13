export function useCustomCursor() {
  if (typeof window === 'undefined') {
    return { cleanup: () => {} }
  }

  if (window.matchMedia('(pointer: coarse)').matches) {
    return { cleanup: () => {} }
  }

  // Avoid stacking multiple instances (HMR / remount)
  document.getElementById('custom-cursor-style')?.remove()
  document.querySelectorAll('[data-cursor-missile], [data-cursor-smoke]').forEach((el) => el.remove())

  const styleEl = document.createElement('style')
  styleEl.id = 'custom-cursor-style'
  styleEl.textContent = `
    *, *::after, *::before { cursor: none !important; }
    [data-cursor-missile] {
      will-change: transform, filter;
      transition: filter 0.15s ease;
    }
    [data-cursor-missile] svg {
      display: block;
      overflow: visible;
    }
  `
  document.head.appendChild(styleEl)

  // Missile geometry (viewBox 28×40, nose tip at ~14, 2.2)
  const MSL_W = 28
  const MSL_H = 40
  const TIP_X = 14
  const TIP_Y = 2.2
  // Distance from tip to nozzle along body axis (for exhaust origin)
  const TIP_TO_TAIL = 28

  // ── Missile element ──────────────────────────────────────────────
  const missile = document.createElement('div')
  missile.dataset.cursorMissile = ''
  // transform-origin MUST be 0 0 — we pivot with explicit translates.
  // A non-zero origin was shifting the tip away from the real pointer.
  missile.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: ${MSL_W}px;
    height: ${MSL_H}px;
    pointer-events: none;
    z-index: 999999;
    transform-origin: 0 0;
    opacity: 0;
  `
  missile.innerHTML = `
    <svg width="${MSL_W}" height="${MSL_H}" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="msl-body" x1="14" y1="2" x2="14" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#6ee7b7"/>
          <stop offset="35%" stop-color="#10b981"/>
          <stop offset="100%" stop-color="#047857"/>
        </linearGradient>
        <linearGradient id="msl-nose" x1="14" y1="0" x2="14" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#ecfdf5"/>
          <stop offset="100%" stop-color="#34d399"/>
        </linearGradient>
        <linearGradient id="msl-fin" x1="4" y1="22" x2="14" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#34d399"/>
          <stop offset="100%" stop-color="#065f46"/>
        </linearGradient>
        <radialGradient id="msl-thrust" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#fff7ed"/>
          <stop offset="30%" stop-color="#fbbf24"/>
          <stop offset="65%" stop-color="#f97316"/>
          <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
        </radialGradient>
        <filter id="msl-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" result="b"/>
          <feMerge>
            <feMergeNode in="b"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <ellipse class="msl-plume" cx="14" cy="34.5" rx="3.2" ry="5.5" fill="url(#msl-thrust)" opacity="0.95"/>
      <ellipse class="msl-plume-core" cx="14" cy="32.5" rx="1.4" ry="3.2" fill="#fffbeb" opacity="0.9"/>

      <path d="M8.5 24 L3 33.5 L9.5 29.5 Z" fill="url(#msl-fin)" opacity="0.95"/>
      <path d="M19.5 24 L25 33.5 L18.5 29.5 Z" fill="url(#msl-fin)" opacity="0.95"/>
      <path d="M10 20 L7.5 26 L11 24 Z" fill="#10b981" opacity="0.55"/>
      <path d="M18 20 L20.5 26 L17 24 Z" fill="#10b981" opacity="0.55"/>

      <path d="M10 9
               C10 9 10.2 6 14 2.2
               C17.8 6 18 9 18 9
               L18.6 26
               C18.6 28.2 16.6 29.5 14 29.5
               C11.4 29.5 9.4 28.2 9.4 26
               Z" fill="url(#msl-body)" filter="url(#msl-glow)"/>

      <path d="M12.2 10 C12.2 10 12.4 7.5 14 5.2 C14.2 7.2 14.2 26 14.2 26 C13 26 12.2 25 12.2 24 Z"
            fill="#ecfdf5" opacity="0.28"/>

      <path d="M14 2.2 C11.8 4.6 11 7 11 8.2 L17 8.2 C17 7 16.2 4.6 14 2.2 Z"
            fill="url(#msl-nose)"/>

      <rect x="10.2" y="12.5" width="7.6" height="1.6" rx="0.4" fill="#022c22" opacity="0.55"/>
      <rect x="10.8" y="12.7" width="2.2" height="1.1" rx="0.3" fill="#6ee7b7" opacity="0.9"/>
      <rect x="13.6" y="12.7" width="1.4" height="1.1" rx="0.2" fill="#fbbf24" opacity="0.85"/>

      <path d="M10.5 9.8 H17.5" stroke="#064e3b" stroke-width="0.6" opacity="0.5"/>

      <ellipse cx="14" cy="29.3" rx="3.4" ry="1.3" fill="#064e3b" opacity="0.8"/>
      <ellipse cx="14" cy="29.1" rx="2.2" ry="0.8" fill="#34d399" opacity="0.7"/>
    </svg>
  `
  document.body.appendChild(missile)

  const plume = missile.querySelector('.msl-plume') as SVGElement | null
  const plumeCore = missile.querySelector('.msl-plume-core') as SVGElement | null

  // ── Smoke / particle layer ───────────────────────────────────────
  const smokeContainer = document.createElement('div')
  smokeContainer.dataset.cursorSmoke = ''
  smokeContainer.style.cssText = `
    position: fixed; inset: 0; pointer-events: none; z-index: 999998;
    overflow: hidden;
  `
  document.body.appendChild(smokeContainer)

  type Particle = {
    el: HTMLDivElement
    x: number
    y: number
    vx: number
    vy: number
    life: number
    maxLife: number
    size: number
    kind: 'smoke' | 'ember' | 'spark'
  }

  const MAX_PARTICLES = 48
  const pool: Particle[] = []
  const active: Particle[] = []

  function makeParticleEl(): HTMLDivElement {
    const el = document.createElement('div')
    el.style.cssText = `
      position: absolute; left: 0; top: 0;
      border-radius: 50%;
      pointer-events: none;
      will-change: transform, opacity;
      transform: translate3d(-100px, -100px, 0);
    `
    smokeContainer.appendChild(el)
    return el
  }

  for (let i = 0; i < MAX_PARTICLES; i++) {
    pool.push({
      el: makeParticleEl(),
      x: 0, y: 0, vx: 0, vy: 0,
      life: 0, maxLife: 1, size: 4,
      kind: 'smoke',
    })
  }

  function spawn(
    x: number,
    y: number,
    noseAngleRad: number,
    speed: number,
    kind: Particle['kind'],
  ) {
    const p = pool.pop()
    if (!p) return

    // Exhaust shoots opposite the nose
    const back = noseAngleRad + Math.PI
    const spread = (Math.random() - 0.5) * (kind === 'smoke' ? 0.9 : 0.45)
    const dir = back + spread
    const baseSpeed = kind === 'smoke'
      ? 0.4 + Math.random() * 0.8 + speed * 0.08
      : kind === 'ember'
        ? 0.8 + Math.random() * 1.4 + speed * 0.12
        : 1.2 + Math.random() * 2.2 + speed * 0.15

    p.x = x + Math.cos(back) * (kind === 'smoke' ? 4 : 2) + (Math.random() - 0.5) * 3
    p.y = y + Math.sin(back) * (kind === 'smoke' ? 4 : 2) + (Math.random() - 0.5) * 3
    p.vx = Math.cos(dir) * baseSpeed + (Math.random() - 0.5) * 0.3
    p.vy = Math.sin(dir) * baseSpeed + (Math.random() - 0.5) * 0.3
    p.life = 0
    p.maxLife = kind === 'smoke'
      ? 28 + Math.random() * 36
      : kind === 'ember'
        ? 12 + Math.random() * 16
        : 6 + Math.random() * 10
    p.size = kind === 'smoke'
      ? 5 + Math.random() * 10 + Math.min(speed * 0.4, 8)
      : kind === 'ember'
        ? 2.5 + Math.random() * 3.5
        : 1.2 + Math.random() * 2
    p.kind = kind

    const el = p.el
    if (kind === 'smoke') {
      const g = 120 + Math.floor(Math.random() * 40)
      el.style.background = `radial-gradient(circle, rgba(${g},${g + 20},${g + 10},0.55) 0%, rgba(16,185,129,0.12) 55%, transparent 70%)`
      el.style.filter = `blur(${2.5 + Math.random() * 3}px)`
      el.style.boxShadow = 'none'
    } else if (kind === 'ember') {
      el.style.background = 'radial-gradient(circle, #fff7ed 0%, #fbbf24 40%, #f97316 70%, transparent 100%)'
      el.style.filter = 'blur(0.6px)'
      el.style.boxShadow = '0 0 6px rgba(251,191,36,0.7)'
    } else {
      el.style.background = 'radial-gradient(circle, #ecfdf5 0%, #34d399 50%, transparent 100%)'
      el.style.filter = 'blur(0.4px)'
      el.style.boxShadow = '0 0 4px rgba(52,211,153,0.8)'
    }
    el.style.width = `${p.size}px`
    el.style.height = `${p.size}px`
    el.style.opacity = '1'

    active.push(p)
  }

  // Soft lag trail segments (ribbon behind missile)
  const TRAIL_LEN = 12
  const trailEls: HTMLDivElement[] = []
  const trailPos = Array.from({ length: TRAIL_LEN }, () => ({ x: -200, y: -200 }))

  for (let i = 0; i < TRAIL_LEN; i++) {
    const el = document.createElement('div')
    const t = i / TRAIL_LEN
    const size = 3 + t * 10
    el.style.cssText = `
      position: absolute; left: 0; top: 0;
      width: ${size}px; height: ${size}px;
      border-radius: 50%;
      background: radial-gradient(circle,
        rgba(16,185,129,${0.45 - t * 0.35}) 0%,
        rgba(6,78,59,${0.2 - t * 0.15}) 50%,
        transparent 70%);
      filter: blur(${1 + t * 3}px);
      pointer-events: none;
      will-change: transform, opacity;
      opacity: ${0.7 - t * 0.55};
    `
    smokeContainer.appendChild(el)
    trailEls.push(el)
  }

  // ── Motion state ─────────────────────────────────────────────────
  let mouseX = 0
  let mouseY = 0
  let prevX = 0
  let prevY = 0
  let angle = 0 // CSS deg; 0 = nose up
  let isHover = false
  let hasMoved = false
  let rafId: number | null = null
  let spawnAcc = 0
  let lastTs = performance.now()

  const interactiveSel = 'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor-hover]'

  const onMouseMove = (e: MouseEvent) => {
    mouseX = e.clientX
    mouseY = e.clientY
    if (!hasMoved) {
      hasMoved = true
      prevX = mouseX
      prevY = mouseY
      // Seed trail at current point so it doesn't fly in from off-screen
      for (let i = 0; i < TRAIL_LEN; i++) {
        trailPos[i].x = mouseX
        trailPos[i].y = mouseY
      }
      missile.style.opacity = '1'
    }
  }
  window.addEventListener('mousemove', onMouseMove, { passive: true })

  // Reliable hover: test under the actual pointer, not bubble targets
  const onPointerCheck = () => {
    if (!hasMoved) return
    const el = document.elementFromPoint(mouseX, mouseY) as HTMLElement | null
    // Skip our own overlay nodes
    if (!el || el.closest?.('[data-cursor-missile], [data-cursor-smoke]')) {
      isHover = false
      return
    }
    isHover = Boolean(el.closest?.(interactiveSel))
  }
  // Sample hover on move + occasional raf (cheap closest check)
  window.addEventListener('mousemove', onPointerCheck, { passive: true })

  function animate(ts: number) {
    const dt = Math.min((ts - lastTs) / 16.67, 2.5)
    lastTs = ts

    if (!hasMoved) {
      rafId = requestAnimationFrame(animate)
      return
    }

    // Velocity from true pointer deltas (not lagged render pos)
    const dx = mouseX - prevX
    const dy = mouseY - prevY
    const speed = Math.hypot(dx, dy)

    if (speed > 0.35) {
      // atan2(dy,dx) is heading from +X; +90 so 0° = up (SVG nose)
      const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90
      let diff = targetAngle - angle
      while (diff > 180) diff -= 360
      while (diff < -180) diff += 360
      angle += diff * Math.min(0.4 * dt, 1)
    }
    prevX = mouseX
    prevY = mouseY

    // Tip locks to real pointer so clicks land where the nose is
    const tipX = mouseX
    const tipY = mouseY

    // Nose direction in screen space (angle 0 → up)
    const θ = (angle * Math.PI) / 180
    const noseX = Math.sin(θ)
    const noseY = -Math.cos(θ)
    const noseAngleRad = Math.atan2(noseY, noseX)

    // Nozzle / exhaust origin (behind tip along body)
    const tailX = tipX - noseX * TIP_TO_TAIL
    const tailY = tipY - noseY * TIP_TO_TAIL

    // Ribbon trail (lagged — visual only)
    const follow = 0.35 + Math.min(speed * 0.02, 0.25)
    trailPos[0].x += (tailX - trailPos[0].x) * follow * dt
    trailPos[0].y += (tailY - trailPos[0].y) * follow * dt
    for (let i = 1; i < TRAIL_LEN; i++) {
      const f = 0.12 + (1 - i / TRAIL_LEN) * 0.08
      trailPos[i].x += (trailPos[i - 1].x - trailPos[i].x) * f * dt
      trailPos[i].y += (trailPos[i - 1].y - trailPos[i].y) * f * dt
    }

    for (let i = 0; i < TRAIL_LEN; i++) {
      const half = (3 + (i / TRAIL_LEN) * 10) / 2
      trailEls[i].style.transform = `translate3d(${trailPos[i].x - half}px, ${trailPos[i].y - half}px, 0)`
      trailEls[i].style.opacity = String(
        Math.min(0.75, 0.12 + speed * 0.04) * (1 - i / TRAIL_LEN),
      )
    }

    // Exhaust particles
    spawnAcc += speed * dt
    const spawnBudget = isHover ? 2.2 : 1.4
    while (spawnAcc > spawnBudget) {
      spawnAcc -= spawnBudget
      spawn(tailX, tailY, noseAngleRad, speed, 'smoke')
      if (speed > 2 || isHover) spawn(tailX, tailY, noseAngleRad, speed, 'ember')
      if (speed > 6) spawn(tailX, tailY, noseAngleRad, speed, 'spark')
    }
    if (speed < 0.5 && Math.random() < 0.12 * dt) {
      spawn(tailX, tailY, noseAngleRad, 0.5, 'ember')
      if (Math.random() < 0.4) spawn(tailX, tailY, noseAngleRad, 0.3, 'smoke')
    }

    for (let i = active.length - 1; i >= 0; i--) {
      const p = active[i]
      p.life += dt
      p.x += p.vx * dt
      p.y += p.vy * dt
      p.vx *= 0.96
      p.vy *= 0.96
      if (p.kind === 'smoke') {
        p.vy -= 0.02 * dt
        p.size += 0.18 * dt
      }

      const t = p.life / p.maxLife
      if (t >= 1) {
        p.el.style.opacity = '0'
        p.el.style.transform = 'translate3d(-100px,-100px,0)'
        active.splice(i, 1)
        pool.push(p)
        continue
      }

      const fade = p.kind === 'smoke'
        ? (t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85)
        : 1 - t
      const pScale = p.kind === 'smoke' ? 1 + t * 1.6 : 1 - t * 0.4
      const half = (p.size * pScale) / 2
      p.el.style.width = `${p.size * pScale}px`
      p.el.style.height = `${p.size * pScale}px`
      p.el.style.opacity = String(Math.max(0, fade) * (p.kind === 'smoke' ? 0.75 : 0.95))
      p.el.style.transform = `translate3d(${p.x - half}px, ${p.y - half}px, 0)`
    }

    // Place nose tip exactly on the pointer.
    // CSS multiplies right→left with origin 0,0:
    //   1) move tip to local (0,0)
    //   2) scale around tip
    //   3) rotate around tip
    //   4) move tip to mouse
    const scale = isHover ? 1.35 : 1
    missile.style.transform = `translate3d(${tipX}px, ${tipY}px, 0) rotate(${angle}deg) scale(${scale}) translate3d(${-TIP_X}px, ${-TIP_Y}px, 0)`
    missile.style.filter = isHover
      ? 'drop-shadow(0 0 6px #34d399) drop-shadow(0 0 16px rgba(16,185,129,0.75)) drop-shadow(0 8px 10px rgba(249,115,22,0.45))'
      : 'drop-shadow(0 0 4px #10b981) drop-shadow(0 0 12px rgba(16,185,129,0.4)) drop-shadow(0 6px 8px rgba(249,115,22,0.25))'

    if (plume && plumeCore) {
      const boost = 0.75 + Math.min(speed * 0.06, 0.6) + (isHover ? 0.25 : 0)
      plume.setAttribute('opacity', String(Math.min(1, boost)))
      plume.setAttribute('ry', String(4.5 + Math.min(speed * 0.35, 5) + (isHover ? 2 : 0)))
      plumeCore.setAttribute('opacity', String(0.7 + Math.min(speed * 0.03, 0.3)))
    }

    rafId = requestAnimationFrame(animate)
  }
  rafId = requestAnimationFrame(animate)

  function cleanup() {
    if (rafId !== null) cancelAnimationFrame(rafId)
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mousemove', onPointerCheck)
    missile.remove()
    smokeContainer.remove()
    document.getElementById('custom-cursor-style')?.remove()
  }

  return { cleanup }
}
