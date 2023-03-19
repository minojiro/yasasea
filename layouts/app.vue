<script setup lang="ts">
import { getAuth } from "firebase/auth";

const currentUserId = ref("");
const { push } = useRouter();

onMounted(() => {
  const auth = getAuth();
  auth.onAuthStateChanged((u) => {
    if (u) {
      currentUserId.value = u?.uid || "";
    } else {
      push("/app/signup");
    }
  });
});
</script>

<template>
  <div class="max-w-lg mx-auto" v-if="currentUserId">
    <div class="p-2 pb-0 flex items-center justify-between">
      <div>
        <RouterLink to="/app"
          ><img src="~/assets/images/logo.svg" class="w-12"
        /></RouterLink>
      </div>
      <div class="w-12">
        <RouterLink :to="`/app/users/${currentUserId}`"><Avatar /></RouterLink>
      </div>
    </div>
    <slot />
  </div>
  <div v-else>loading</div>
</template>
