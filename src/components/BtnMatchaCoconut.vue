<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useHeroAnimation } from './scripts/BtnMatchaCoconut';

const containerRef = ref<HTMLElement | null>(null);
const buttonRef = ref<HTMLElement | null>(null);
const stripRefs = ref<HTMLElement[]>([]);

const { initAnimations, cleanup, STRIP_DATA } = useHeroAnimation();

onMounted(() => {
if (containerRef.value && buttonRef.value) {
    initAnimations(containerRef.value, buttonRef.value, stripRefs.value);
}
});

onUnmounted(() => cleanup());
</script>
    
<template>
  <div ref="containerRef" class="relative flex items-center justify-center">
    <div
      v-for="(item, index) in STRIP_DATA"
      :key="index"
      ref="stripRefs"
      :class="[
        item.class,
        'absolute w-26 h-9 rounded-tr-full rounded-bl-full bg-gradient-to-r from-[#7FFFE5] to-[#C5E4E8] opacity-0 pointer-events-none'
      ]"
    />

    <div
      ref="buttonRef"
      class="rotate-45 w-45 h-15 flex justify-center items-center text-lg text-[#C5B8B8] border border-[#DFDFDF] rounded-full bg-[#E6FEFF] font-prosto-one cursor-pointer select-none relative z-10"
    >
      Let's Go
    </div>
  </div>
</template>