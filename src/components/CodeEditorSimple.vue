<template>
  <div class="editor-wrapper">
    <textarea
      v-model="localValue"
      @input="handleInput"
      class="code-editor"
      spellcheck="false"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const localValue = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  if (localValue.value !== newValue) {
    localValue.value = newValue;
  }
});

const handleInput = () => {
  emit('update:modelValue', localValue.value);
};
</script>

<style scoped>
.editor-wrapper {
  width: 100%;
  height: 100%;
  border: 1px solid #333;
  border-radius: 4px;
  overflow: hidden;
  background-color: #1e1e1e;
}

.code-editor {
  width: 100%;
  height: 100%;
  padding: 12px;
  background-color: #1e1e1e;
  color: #d4d4d4;
  border: none;
  outline: none;
  font-family: 'Courier New', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.5;
  resize: none;
  tab-size: 2;
}

.code-editor::selection {
  background-color: #264f78;
}
</style>
