<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useStackAnimation } from './scripts/BtnMatcha01';

const containerRef = ref<HTMLElement | null>(null);
const topBarRef = ref<HTMLElement | null>(null);
const bottomBarRef = ref<HTMLElement | null>(null);
const buttonRef = ref<HTMLElement | null>(null);

const { initAnimations, cleanup } = useStackAnimation();

onMounted(() => {
    if (containerRef.value && topBarRef.value && bottomBarRef.value && buttonRef.value) {
        initAnimations(containerRef.value, topBarRef.value, bottomBarRef.value, buttonRef.value);
    }
});

onUnmounted(() => cleanup());
</script>

<template>
    <div ref="containerRef" class="flex flex-col items-center select-none py-12">
        <div class="flex">
            <div class="w-28 h-16"></div>
            <div 
                ref="topBarRef"
                class="w-46 h-16 rounded-tr-full rounded-bl-full bg-gradient-to-r from-[#C5E4E8] to-[#7FFFE5] shadow-[-4px_-4px_0_4px_rgba(0,0,0,0.1)] opacity-0"
            ></div>
        </div>

        <div 
            ref="buttonRef"
            class="w-48 h-17 flex justify-center items-center rounded-xl font-prosto-one text-[#C5B8B8] text-xl shadow-[0_0_5px_0px_rgba(0,0,0,0.1)] cursor-pointer relative z-10 opacity-0 border border-white/30 backdrop-blur-sm"
        >
            Let's Go
        </div>

        <div class="flex">
            <div 
                ref="bottomBarRef"
                class="w-46 h-16 rounded-tr-full rounded-bl-full bg-gradient-to-r from-[#C5E4E8] to-[#7FFFE5] shadow-[4px_4px_0_4px_rgba(0,0,0,0.1)] opacity-0"
            ></div>
            <div class="w-28 h-16"></div>
        </div>
    </div>
</template>