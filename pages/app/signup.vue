<script lang="ts" setup>
import { useAuth } from "~~/composable/useAuth";
const { createUser } = useAuth();
const email = ref("");
const password = ref("");
const router = useRouter();

useHead({
  title: "新規登録 | ヤサシー（yasasea）",
});

const handleSubmit = async () => {
  const credential = await createUser(email.value, password.value);
  if (credential) {
    router.push("/app");
  }
};
</script>

<template>
  <div>
    <p>登録</p>
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
        <button type="submit" class="btn btn-primary" to="/app">登録</button>
      </p>
    </form>
  </div>
</template>
