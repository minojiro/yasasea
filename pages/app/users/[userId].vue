<script setup lang="ts">
definePageMeta({ layout: 'app' })
</script>

<template>
  <div class="py-10 px-2">
    <div class="w-1/2 mx-auto"><Avatar /></div>
    <label>
      <p class="mb-2">名前</p>
      <input type="text" class="input input-bordered w-full bg-white" />
    </label>

    <p class="text-center mt-5">
      <RouterLink class="btn btn-primary" to="/app">保存</RouterLink>
    </p>
  </div>
</template>
