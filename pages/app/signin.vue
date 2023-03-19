<script lang="ts" setup>
import { useAuth } from "~~/composable/useAuth";
const { signin } = useAuth();
const email = ref("");
const password = ref("");
const router = useRouter();

useHead({
  title: "ログイン | ヤサシー（yasasea）",
});

const handleSubmit = async () => {
  const credential = await signin(email.value, password.value);
  if (credential) {
    router.push("/app");
  }
};
</script>

<template>
  <div>
    <p>ログイン</p>
    <form @submit.prevent="handleSubmit">
      <p>
        <input
          v-model="email"
          type="email"
          placeholder="メールアドレス"
          class="input input-bordered flex-1 bg-white"
        />
      </p>
      <p>
        <input
          v-model="password"
          type="password"
          placeholder="パスワード"
          class="input input-bordered flex-1 bg-white"
        />
      </p>
      <p class="text-center mt-5">
        <button type="submit" class="btn btn-primary" to="/app">
          ログイン
        </button>
      </p>
    </form>
  </div>
</template>
