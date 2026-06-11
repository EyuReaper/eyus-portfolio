<template>
  <canvas
    ref="starsCanvas"
    class="absolute inset-0 z-0 w-full h-full pointer-events-none hidden md:block"
    aria-hidden="true"
  ></canvas>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";

const props = defineProps({
  color: { type: String, default: "#FFF" },
  count: { type: Number, default: 200 },
});

const starsCanvas = ref(null);
let perspective = 0;
let stars = [];
let ctx = null;
let animationFrameId = null;
let rgb = { r: 255, g: 255, b: 255 };

function hexToRgb(hexColor) {
  let hex = hexColor.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex.split("").map((char) => char + char).join("");
  }
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

// Pre-calculate RGB when color changes
watch(() => props.color, (newColor) => {
  rgb = hexToRgb(newColor);
}, { immediate: true });

function resizeCanvas() {
  const canvas = starsCanvas.value;
  if (!canvas) return;

  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  perspective = canvas.width / 2;
}

function drawStar(star, canvasWidth, canvasHeight) {
  const scale = perspective / (perspective + star.z);
  const x2d = canvasWidth / 2 + star.x * scale;
  const y2d = canvasHeight / 2 + star.y * scale;
  const size = Math.max(scale * 3, 0.5);

  const prevScale = perspective / (perspective + star.z + star.speed * 15);
  const xPrev = canvasWidth / 2 + star.x * prevScale;
  const yPrev = canvasHeight / 2 + star.y * prevScale;

  ctx.save();
  ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`;
  ctx.lineWidth = size * 2.5;
  ctx.shadowBlur = 35;
  ctx.shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`;
  ctx.beginPath();
  ctx.moveTo(x2d, y2d);
  ctx.lineTo(xPrev, yPrev);
  ctx.stroke();
  ctx.restore();

  ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6)`;
  ctx.lineWidth = size;
  ctx.beginPath();
  ctx.moveTo(x2d, y2d);
  ctx.lineTo(xPrev, yPrev);
  ctx.stroke();

  ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
  ctx.beginPath();
  ctx.arc(x2d, y2d, size / 4, 0, Math.PI * 2);
  ctx.fill();
}

function animate() {
  const canvas = starsCanvas.value;
  if (!canvas || !ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const w = canvas.width;
  const h = canvas.height;

  stars.forEach((star) => {
    drawStar(star, w, h);
    star.z -= star.speed;
    if (star.z <= 0) {
      star.z = w;
      star.x = (Math.random() - 0.5) * 2 * w;
      star.y = (Math.random() - 0.5) * 2 * h;
    }
  });

  animationFrameId = requestAnimationFrame(animate);
}

onMounted(() => {
  const canvas = starsCanvas.value;
  if (!canvas) return;

  // Disable animation on mobile for performance
  if (window.innerWidth < 768) {
    return;
  }

  ctx = canvas.getContext("2d");
  if (!ctx) return;

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  stars = [];
  for (let i = 0; i < props.count; i++) {
    stars.push({
      x: (Math.random() - 0.5) * 2 * canvas.width,
      y: (Math.random() - 0.5) * 2 * canvas.height,
      z: Math.random() * canvas.width,
      speed: Math.random() * 5 + 2,
    });
  }

  animate();
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeCanvas);
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>
