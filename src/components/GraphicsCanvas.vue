<template>
  <div class="graphics-container">
    <canvas
      ref="canvasRef"
      :width="width"
      :height="height"
      class="graphics-canvas"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { GraphicsCommand } from '../interpreter/runtime';

const props = defineProps<{
  commands: GraphicsCommand[];
  width?: number;
  height?: number;
}>();

const canvasRef = ref<HTMLCanvasElement>();
const width = props.width || 640;
const height = props.height || 480;

// TempleOS color palette (16 colors)
const TEMPLEOS_COLORS = [
  '#000000', // BLACK
  '#0000AA', // BLUE
  '#00AA00', // GREEN
  '#00AAAA', // CYAN
  '#AA0000', // RED
  '#AA00AA', // MAGENTA
  '#AA5500', // BROWN
  '#AAAAAA', // LTGRAY
  '#555555', // DKGRAY
  '#5555FF', // LTBLUE
  '#55FF55', // LTGREEN
  '#55FFFF', // LTCYAN
  '#FF5555', // LTRED
  '#FF55FF', // LTMAGENTA
  '#FFFF55', // YELLOW
  '#FFFFFF', // WHITE
];

const getColor = (colorIndex: number): string => {
  const color = TEMPLEOS_COLORS[colorIndex % TEMPLEOS_COLORS.length];
  return color ?? '#000000';
};

const renderCommands = () => {
  if (!canvasRef.value) return;

  const ctx = canvasRef.value.getContext('2d');
  if (!ctx) return;

  // Process each graphics command
  props.commands.forEach(cmd => {
    switch (cmd.type) {
      case 'clear':
        ctx.fillStyle = getColor(cmd.params.color || 0);
        ctx.fillRect(0, 0, width, height);
        break;

      case 'pixel':
        ctx.fillStyle = getColor(cmd.params.color);
        ctx.fillRect(cmd.params.x, cmd.params.y, 1, 1);
        break;

      case 'line':
        ctx.strokeStyle = getColor(cmd.params.color);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cmd.params.x1, cmd.params.y1);
        ctx.lineTo(cmd.params.x2, cmd.params.y2);
        ctx.stroke();
        break;

      case 'rect':
        ctx.fillStyle = getColor(cmd.params.color);
        ctx.fillRect(cmd.params.x, cmd.params.y, cmd.params.w, cmd.params.h);
        break;

      case 'circle':
        ctx.fillStyle = getColor(cmd.params.color);
        ctx.beginPath();
        ctx.arc(cmd.params.x, cmd.params.y, cmd.params.r, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'text':
        ctx.fillStyle = getColor(cmd.params.color);
        ctx.font = '16px "Courier New", monospace';
        ctx.fillText(cmd.params.text, cmd.params.x, cmd.params.y);
        break;

      case 'sprite':
        // TODO: Implement sprite rendering
        break;
    }
  });
};

watch(() => props.commands, () => {
  renderCommands();
}, { deep: true });

onMounted(() => {
  // Initialize with black background
  if (canvasRef.value) {
    const ctx = canvasRef.value.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);
    }
  }
});
</script>

<style scoped>
.graphics-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  border: 1px solid #333;
  border-radius: 4px;
}

.graphics-canvas {
  display: block;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}
</style>
