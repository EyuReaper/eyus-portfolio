export function useCustomCursor() {
  if (typeof window === 'undefined') {
    return { cleanup: () => {} }
  }

  if (window.matchMedia('(pointer: coarse)').matches) {
    return { cleanup: () => {} }
  }

  const styleEl = document.createElement('style')
  styleEl.id = 'custom-cursor-style'
  styleEl.textContent = `
    *, *::after, *::before { cursor: none !important; }
  `
  document.head.appendChild(styleEl)

  const missile = document.createElement('div')
  missile.dataset.cursorMissile = ''
  missile.style.cssText = `
    position: fixed; top: 0; left: 0; pointer-events: none;
    width: 20px; height: 20px;
    z-index: 999999;
    transform-origin: center center;
  `
  missile.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 1 L13 14 L10 12 L7 14 Z" fill="#10b981"/>
      <path d="M7 14 L4 18 L8 15 Z" fill="#10b981" opacity="0.7"/>
      <path d="M13 14 L16 18 L12 15 Z" fill="#10b981" opacity="0.7"/>
      <circle cx="10" cy="13" r="2" fill="rgba(255,255,255,0.9)"/>
    </svg>
  `
  document.body.appendChild(missile)

  const smokeContainer = document.createElement('div')
  smokeContainer.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 999998;
  `
  document.body.appendChild(smokeContainer)

  const PARTICLE_COUNT = 10
  const smokeElements: HTMLDivElement[] = []
  const smokePositions = Array.from({ length: PARTICLE_COUNT }, () => ({ x: -100, y: -100 }))

  const smokeSizes: number[] = []
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const el = document.createElement('div')
    const size = 6 + i * 1.6
    smokeSizes.push(size)
    const blur = 2 + i * 0.9
    const opacity = Math.max(0.5 - i * 0.05, 0.02)
    el.style.cssText = `
      position: fixed;
      width: ${size}px; height: ${size}px; border-radius: 50%;
      background: rgba(16,185,129,${opacity});
      filter: blur(${blur}px);
      pointer-events: none;
      z-index: ${PARTICLE_COUNT - i};
    `
    smokeContainer.appendChild(el)
    smokeElements.push(el)
  }

  let mouseX = -100
  let mouseY = -100
  let prevX = -100
  let prevY = -100
  let angle = 0
  let isHover = false
  let rafId: number | null = null

  const onMouseMove = (e: MouseEvent) => {
    mouseX = e.clientX
    mouseY = e.clientY
  }
  window.addEventListener('mousemove', onMouseMove)

  const onHoverIn = (e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest('a, button, [role="button"]')
    if (target) isHover = true
  }
  const onHoverOut = (e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest('a, button, [role="button"]')
    if (target) isHover = false
  }
  document.addEventListener('mouseover', onHoverIn)
  document.addEventListener('mouseout', onHoverOut)

  function animate() {
    smokePositions[0].x += (mouseX - smokePositions[0].x) * 0.35
    smokePositions[0].y += (mouseY - smokePositions[0].y) * 0.35

    for (let i = 1; i < PARTICLE_COUNT; i++) {
      smokePositions[i].x += (smokePositions[i - 1].x - smokePositions[i].x) * 0.1
      smokePositions[i].y += (smokePositions[i - 1].y - smokePositions[i].y) * 0.1
    }

    const dx = mouseX - prevX
    const dy = mouseY - prevY
    if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
      angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90
    }
    prevX = mouseX
    prevY = mouseY

    const scale = isHover ? 1.4 : 1.0
    missile.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px) rotate(${angle}deg) scale(${scale})`
    missile.style.filter = isHover
      ? 'drop-shadow(0 0 6px #10b981) drop-shadow(0 0 14px rgba(16,185,129,0.6))'
      : 'drop-shadow(0 0 4px #10b981) drop-shadow(0 0 10px rgba(16,185,129,0.3))'

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const half = smokeSizes[i] / 2
      smokeElements[i].style.transform = `translate(${smokePositions[i].x - half}px,${smokePositions[i].y - half}px)`
    }

    rafId = requestAnimationFrame(animate)
  }
  animate()

  function cleanup() {
    if (rafId !== null) cancelAnimationFrame(rafId)
    window.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseover', onHoverIn)
    document.removeEventListener('mouseout', onHoverOut)
    missile.remove()
    smokeContainer.remove()
    const s = document.getElementById('custom-cursor-style')
    if (s) s.remove()
  }

  return { cleanup }
}
