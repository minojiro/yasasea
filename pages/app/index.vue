<script setup lang="ts">
import { usePosts } from "~~/composable/usePosts";

useHead({
  title: "ヤサシー（yasasea）",
});

const { displayPosts, submitPost } = usePosts();
definePageMeta({ layout: "app" });
const postText = ref("");
const handleSubmit = async () => {
  if (postText.value) {
    await submitPost(postText.value);
    postText.value = "";
  }
};
</script>

<template>
  <div class="pb-10">
    <div class="sticky top-0 z-index-1 z-10 bg-base-100 p-2">
      <form class="input-group flex" @submit.prevent="handleSubmit">
        <input
          v-model="postText"
          type="text"
          placeholder="いまの気分は？"
          class="input input-bordered flex-1 bg-white"
        />
        <button class="btn btn-square btn-accent">
          <Icon icon="paper-plane" />
        </button>
      </form>
    </div>

    <ul class="p-2">
      <li
        v-for="post in displayPosts"
        :key="post.id"
        class="pb-3 border-b border-base-300 mb-3"
      >
        <PostItem :post="post" />
      </li>
    </ul>
    <p class="text-xs">
      <a
        href="https://www.freepik.com/free-vector/smiling-people-avatar-set-different-men-women-characters-collection_13663484.htm"
        target="_blank"
        rel="noopener"
        >Image by jcomp</a
      >
      on Freepik
    </p>
  </div>
</template>
