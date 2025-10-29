<template>
  <div class="app">
    <header class="app-header">
      <h1>HolyC Graphics Compiler</h1>
      <p class="subtitle">In Memory of Terry A. Davis - TempleOS Creator</p>
      <div class="header-controls">
        <select v-model="selectedExample" @change="loadExample" class="example-select">
          <option value="">Select an example...</option>
          <option v-for="(example, key) in examples" :key="key" :value="key">
            {{ example.name }}
          </option>
        </select>
        <button @click="runCode" class="run-btn" :disabled="isRunning">
          {{ isRunning ? 'Running...' : 'Run (Ctrl+Enter)' }}
        </button>
        <button @click="shareCode" class="share-btn">Share</button>
        <a href="https://github.com/PedYekt/holyc-graphics-compiler" target="_blank" class="docs-btn" title="View Documentation">
          📖 Docs
        </a>
      </div>
    </header>

    <div class="main-content">
      <div class="left-panel">
        <div class="editor-section">
          <CodeEditor v-model="code" />
        </div>
        <div class="output-section">
          <OutputConsole
            :stdout="output.stdout"
            :stderr="output.stderr"
            @clear="clearOutput"
          />
        </div>
      </div>

      <div class="right-panel">
        <div class="graphics-section">
          <div class="section-header">Graphics Output</div>
          <GraphicsCanvas :commands="output.graphics" :width="640" :height="480" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CodeEditor from './components/CodeEditorSimple.vue';
import OutputConsole from './components/OutputConsole.vue';
import GraphicsCanvas from './components/GraphicsCanvas.vue';
import { HolyCRuntime, type RuntimeOutput } from './interpreter/runtime';
import * as LZString from 'lz-string';

const code = ref('');
const output = ref<RuntimeOutput>({
  stdout: '',
  stderr: '',
  graphics: []
});
const isRunning = ref(false);
const selectedExample = ref('');
const runtime = new HolyCRuntime();

const examples = {
  hello: {
    name: 'Hello World',
    code: `Print("Hello from HolyC!");
Print("Welcome to TempleOS programming!");`
  },
  graphics: {
    name: 'Graphics Demo',
    code: `// Clear screen to blue
GrClear(1);

// Draw some shapes
GrRect(100, 100, 200, 150, 14); // Yellow rectangle
GrCircle(320, 240, 80, 4); // Red circle
GrLine(0, 0, 640, 480, 15); // White line
GrLine(640, 0, 0, 480, 15); // White line

// Draw text
GrText(220, 30, "HolyC Graphics!", 15);

Print("Graphics rendered!");`
  },
  animation: {
    name: 'Animated Circles',
    code: `// Animated pattern
GrClear(0);

for (let i = 0; i < 50; i++) {
  const x = 320 + Math.cos(i * 0.5) * (100 + i * 2);
  const y = 240 + Math.sin(i * 0.5) * (100 + i * 2);
  const color = i % 15 + 1;
  const radius = 5 + (i % 10);

  GrCircle(x, y, radius, color);
}

GrText(250, 30, "TempleOS Style!", 15);
Print("Animation pattern complete!");`
  },
  plasma: {
    name: 'Plasma Effect',
    code: `GrClear(0);

// Create plasma effect
for (let y = 0; y < 480; y += 4) {
  for (let x = 0; x < 640; x += 4) {
    const value = Math.sin(x / 32) + Math.sin(y / 32) +
                  Math.sin((x + y) / 32) + Math.sin(Math.sqrt(x*x + y*y) / 32);
    const color = Math.floor(((value + 4) / 8) * 15) % 16;
    GrRect(x, y, 4, 4, color);
  }
}

GrText(240, 240, "PLASMA EFFECT", 0);
Print("Plasma effect rendered!");`
  },
  spiral: {
    name: 'Spiral Pattern',
    code: `GrClear(0);

const centerX = 320;
const centerY = 240;
let angle = 0;
let radius = 0;

for (let i = 0; i < 360; i++) {
  const x = centerX + Math.cos(angle) * radius;
  const y = centerY + Math.sin(angle) * radius;
  const color = Math.floor((i / 360) * 15) + 1;

  GrCircle(x, y, 3, color);

  angle += 0.1;
  radius += 0.5;
}

GrText(250, 30, "God's Math", 15);
Print("Spiral complete - Glory to God!");`
  }
};

const runCode = () => {
  isRunning.value = true;
  try {
    output.value = runtime.execute(code.value);
  } catch (error: any) {
    output.value = {
      stdout: '',
      stderr: error.message,
      graphics: []
    };
  } finally {
    isRunning.value = false;
  }
};

const clearOutput = () => {
  output.value = {
    stdout: '',
    stderr: '',
    graphics: []
  };
  runtime.reset();
};

const loadExample = () => {
  if (selectedExample.value && examples[selectedExample.value as keyof typeof examples]) {
    code.value = examples[selectedExample.value as keyof typeof examples].code;
  }
};

const shareCode = () => {
  const compressed = LZString.compressToEncodedURIComponent(code.value);
  const url = `${window.location.origin}${window.location.pathname}?code=${compressed}`;

  navigator.clipboard.writeText(url).then(() => {
    alert('Share link copied to clipboard!');
  }).catch(() => {
    prompt('Copy this link to share your code:', url);
  });
};

const loadFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  const compressed = params.get('code');

  if (compressed) {
    try {
      code.value = LZString.decompressFromEncodedURIComponent(compressed) || '';
    } catch (error) {
      console.error('Failed to load code from URL:', error);
    }
  }
};

onMounted(() => {
  // Load from URL if present
  loadFromURL();

  // Otherwise load default example
  if (!code.value) {
    code.value = examples.hello.code;
  }

  // Keyboard shortcut for run
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runCode();
    }
  });
});
</script>

<style scoped>
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #1e1e1e;
  color: #d4d4d4;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.app-header h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: white;
}

.subtitle {
  margin: 4px 0 16px 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  font-style: italic;
}

.header-controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

.example-select {
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  min-width: 200px;
}

.example-select option {
  background: #2d2d30;
  color: #d4d4d4;
}

.run-btn, .share-btn {
  padding: 8px 20px;
  background: #4CAF50;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.run-btn:hover:not(:disabled) {
  background: #45a049;
  transform: translateY(-1px);
}

.run-btn:disabled {
  background: #666;
  cursor: not-allowed;
}

.share-btn {
  background: #2196F3;
}

.share-btn:hover {
  background: #0b7dda;
}

.docs-btn {
  padding: 8px 20px;
  background: #9C27B0;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.docs-btn:hover {
  background: #7B1FA2;
  transform: translateY(-1px);
}

.main-content {
  flex: 1;
  display: flex;
  gap: 16px;
  padding: 16px;
  overflow: hidden;
}

.left-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.editor-section {
  flex: 1;
  min-height: 0;
}

.output-section {
  height: 200px;
  flex-shrink: 0;
}

.right-panel {
  width: 660px;
  flex-shrink: 0;
}

.graphics-section {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.section-header {
  padding: 8px 12px;
  background-color: #252526;
  border: 1px solid #333;
  border-bottom: none;
  border-radius: 4px 4px 0 0;
  color: #ccc;
  font-size: 13px;
  font-weight: 500;
}

@media (max-width: 1200px) {
  .main-content {
    flex-direction: column;
  }

  .right-panel {
    width: 100%;
    height: 520px;
  }
}
</style>
