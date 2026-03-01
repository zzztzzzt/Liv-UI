<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from 'vue';
import { useTechInputAnimation } from './scripts/InputMatchaTech';

const containerRef = ref<HTMLElement | null>(null);
const shellRef = ref<HTMLElement | null>(null);
const inputWrapRef = ref<HTMLElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);

const { initAnimations, cleanup } = useTechInputAnimation();

onMounted(async () => {
  await nextTick();  // Ensure the template has been rendered ( for the blur-intro )

  requestAnimationFrame(() => {
    if (
      containerRef.value &&
      shellRef.value &&
      inputRef.value
    ) {
      initAnimations(
        containerRef.value,
        shellRef.value,
        inputRef.value
      );
    }
  });
});

onUnmounted(cleanup);
</script>

<template>
  <div ref="containerRef">

    <div
      ref="shellRef"
      class="flex justify-center items-center max-w-screen w-180 h-42 rounded-full bg-gradient-to-l from-white from-40% to-[#81FFAB]"
    >
      <div class="relative flex items-center max-w-screen w-174 h-36 bg-white rounded-full">
        <div class="max-w-screen w-130 h-30 lg:absolute lg:top-16 lg:left-1/2 lg:-translate-x-1/2 max-lg:ml-3 flex justify-center items-center rounded-full bg-gradient-to-l from-white from-40% to-[#58A770]">
          <div class="relative flex items-center max-w-screen w-126 h-26 rounded-full bg-white">
            <div
              class="w-88 h-15 lg:absolute lg:-top-9 lg:left-1/2 lg:-translate-x-1/2 max-lg:ml-3 flex justify-center items-center rounded-full bg-[#AFAFAF]"
            >
              <input
                ref="inputRef"
                type="text"
                class="w-86 h-13 px-5 text-lg bg-white rounded-full focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>