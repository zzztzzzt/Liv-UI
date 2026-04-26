<script setup lang="ts">
const layers = [
  { fromColor: 'from-[#D6D6D6]', toColor: 'to-[#FFFFFF]', z: 'z-[10]', rot: 'rotate-0' },
  { fromColor: 'from-[#EDD6E5]', toColor: 'to-[#EDD6E5]', z: 'z-[9]',  rot: '-rotate-10' },
  { fromColor: 'from-[#FFC5EA]', toColor: 'to-[#FFC5EA]', z: 'z-[8]',  rot: '-rotate-20' },
  { fromColor: 'from-[#F7A8F1]', toColor: 'to-[#F7A8F1]', z: 'z-[7]',  rot: '-rotate-30' },
  { fromColor: 'from-[#D4A3F8]', toColor: 'to-[#D4A3F8]', z: 'z-[6]',  rot: '-rotate-40' }
];
</script>

<template>
  <div class="relative w-[244px] h-[44px]">
    <div
      v-for="(layer, index) in layers"
      :key="index"
      :class="[
        'absolute bg-gradient-to-l to-[#FFFFFF] rounded-full border-none p-[2px]',
        layer.fromColor,
        layer.z,
        layer.rot
      ]"S
    >
      <input
        type="text"
        :class="[
          'bg-gradient-to-l from-[#FFFFFF] via-[#FFFFFF] w-60 h-10 rounded-full border-none outline-none',
          layer.toColor
        ]"
      >
    </div>
  </div>
</template>