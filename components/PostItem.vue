<script setup lang="ts">
import { Post } from "~~/types";
const props = defineProps({
  post: {
    type: Object as PropType<Post>,
    required: true,
  },
});
</script>

<template>
  <div class="flex gap-3">
    <div class="w-12">
      <Avatar :src="props.post.author?.photoURL" />
    </div>
    <div class="flex-1">
      <div class="flex gap-2 items-center">
        <p class="text-sm font-bold">{{ props.post.author?.displayName }}</p>
        <p class="text-sm">{{ post.createdAt.format("YYYY/MM/DD HH:mm") }}</p>
        <div
          class="tooltip tooltip-accent"
          data-tip="AI処理中。あなたにしか見えていません"
          v-if="props.post.isRaw"
        >
          <div class="flex gap-1 text-accent">
            <Icon icon="robot" />
            <Icon icon="spinner" animateSpin />
          </div>
        </div>
        <div class="tooltip tooltip-primary" data-tip="AI処理済み" v-else>
          <div class="flex gap-1 text-base-300">
            <Icon icon="robot" />
            <Icon icon="check" />
          </div>
        </div>
        <!-- {{ props.post.isMyPost ? "mypost" : "false" }} -->
      </div>
      <p :class="{ 'text-gray-400': props.post.isRaw }">
        {{ props.post.text }}
      </p>
    </div>
  </div>
</template>
