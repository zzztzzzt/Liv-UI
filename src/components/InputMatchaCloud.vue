<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useCloudInputAnimation } from './scripts/InputMatchaCloud';

const containerRef = ref<HTMLElement | null>(null);
const shellRef = ref<HTMLElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);
const cloudARef = ref<HTMLElement | null>(null);
const cloudBRef = ref<HTMLElement | null>(null);
const cloudCRef = ref<HTMLElement | null>(null);

const { initAnimations, cleanup } = useCloudInputAnimation();

onMounted(() => {
  if (
    containerRef.value &&
    shellRef.value &&
    inputRef.value &&
    cloudARef.value &&
    cloudBRef.value &&
    cloudCRef.value
  ) {
    initAnimations(containerRef.value, shellRef.value, inputRef.value, [
      cloudARef.value,
      cloudBRef.value,
      cloudCRef.value,
    ]);
  }
});

onUnmounted(cleanup);
</script>

<template>
  <div ref="containerRef" class="relative">
    <div
      ref="shellRef"
      class="relative h-16 w-115 flex justify-center items-center rounded-full"
      style="isolation: isolate;" 
    >
      <div 
        class="absolute inset-0 rounded-full bg-gradient-to-r from-[#6AFDC2] to-[#3F9774] z-40 pointer-events-none"
      ></div>

      <input
        ref="inputRef"
        type="text"
        placeholder="Type in Here"
        class="relative z-50 h-14 w-113 bg-white rounded-full focus:outline-none px-7 font-orbitron font-extrabold text-center text-[1.45rem] placeholder:text-[#AAAAAA] text-[#AAAAAA]"
      >

      <div
        ref="cloudARef"
        class="absolute z-10 -top-47 left-28 h-43 w-43 rounded-full bg-gradient-to-r from-[#9BFFCF] to-[#56929F] pointer-events-none"
      >
        <div class="h-full w-full ml-1 mt-6 bg-white rounded-full"></div>
      </div>

      <div
        ref="cloudBRef"
        class="absolute z-20 -top-28 left-15 h-43 w-43 rounded-full bg-gradient-to-r from-[#9BFFCF] to-[#56929F] pointer-events-none"
      >
        <div class="h-full w-full ml-5 mt-1 bg-white rounded-full"></div>
      </div>

      <div
        ref="cloudCRef"
        class="absolute z-30 -top-41 left-44 h-57 w-57 rounded-full bg-gradient-to-r from-[#9BFFCF] to-[#56929F] pointer-events-none"
      >
        <div class="h-50 w-50 mt-7 ml-1 rounded-full bg-white"></div>
      </div>
    </div>
  </div>
</template>