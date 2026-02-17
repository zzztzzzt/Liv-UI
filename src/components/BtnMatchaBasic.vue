<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useBasicButtonAnimation } from './scripts/BtnMatchaBasic';

const containerRef = ref<HTMLElement | null>(null);
const buttonRef = ref<HTMLElement | null>(null);
const labelRef = ref<HTMLElement | null>(null);

const { initAnimations, cleanup } = useBasicButtonAnimation();

onMounted(() => {
  if (containerRef.value && buttonRef.value && labelRef.value) {
    initAnimations(containerRef.value, buttonRef.value, labelRef.value);
  }
});

onUnmounted(() => cleanup());
</script>

<template>
  <div
    ref="containerRef"
    style="perspective: 600px"
    class="h-26 w-70 flex justify-center items-center rounded-3xl bg-gradient-to-r from-[#7FFFE5] to-[#C5E4E8] shadow-[inset_0_3px_1px_0_rgba(0,0,0,0.1)]"
  >
    <div
      ref="buttonRef"
      class="border border-white py-1 px-7 bg-white/5 rounded-full shadow-[0_0_3px_0px_rgba(0,0,0,0.1)] cursor-pointer"
    >
      <span
        ref="labelRef"
        class="font-orbitron text-[1.3rem] text-white text-shadow-md font-extrabold"
      >Green & Gray</span>
    </div>
  </div>
</template>
