<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    default: "//placehold.jp/100x100.png",
  },
});
</script>
<template>
  <div class="avatar w-full">
    <div class="rounded-max w-full mask mask-squircle align-middle bg-white">
      <img :src="props.src" class="align-middle" />
    </div>
  </div>
</template>
