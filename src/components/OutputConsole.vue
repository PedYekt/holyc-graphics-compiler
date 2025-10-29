<template>
  <div class="console">
    <div class="console-header">
      <span>Output</span>
      <button @click="$emit('clear')" class="clear-btn">Clear</button>
    </div>
    <div class="console-content">
      <div v-if="stdout" class="console-stdout">
        <pre>{{ stdout }}</pre>
      </div>
      <div v-if="stderr" class="console-stderr">
        <pre>{{ stderr }}</pre>
      </div>
      <div v-if="!stdout && !stderr" class="console-empty">
        No output yet. Click "Run" to execute your code.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  stdout: string;
  stderr: string;
}>();

defineEmits<{
  clear: [];
}>();
</script>

<style scoped>
.console {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #1e1e1e;
  border: 1px solid #333;
  border-radius: 4px;
  overflow: hidden;
}

.console-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: #252526;
  border-bottom: 1px solid #333;
  color: #ccc;
  font-size: 13px;
  font-weight: 500;
}

.clear-btn {
  background: #333;
  border: none;
  color: #ccc;
  padding: 4px 12px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.2s;
}

.clear-btn:hover {
  background: #444;
}

.console-content {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.5;
}

.console-stdout pre {
  margin: 0;
  color: #d4d4d4;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.console-stderr pre {
  margin: 0;
  color: #f48771;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.console-empty {
  color: #666;
  font-style: italic;
}

.console-content::-webkit-scrollbar {
  width: 10px;
}

.console-content::-webkit-scrollbar-track {
  background: #1e1e1e;
}

.console-content::-webkit-scrollbar-thumb {
  background: #424242;
  border-radius: 5px;
}

.console-content::-webkit-scrollbar-thumb:hover {
  background: #4e4e4e;
}
</style>
