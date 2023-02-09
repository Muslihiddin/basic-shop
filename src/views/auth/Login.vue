<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { Form, Field, ErrorMessage } from "vee-validate";
import dummyjsonAPI from "../../services/dummyjsonAPI";
import VueCookies from "vue-cookies";

const router = useRouter();
const store = useAuthStore();
const $cookies = VueCookies;

const isLoading = ref(false);
const errMessage = ref("");

// Validation
const validateUsername = (value) =>
  value && value.trim() ? true : "Username is required";

const validatePassword = (value) =>
  value && value.trim() ? true : "Password is required";

const submit = async (values) => {
  try {
    isLoading.value = true;
    const response = await dummyjsonAPI.login(values);
    $cookies.set("user_session", response.data.token, "1h"); //expires in 1 hour
    store.setUser(response.data);
    router.push("/");
  } catch (err) {
    errMessage.value = err.response.data.message;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <main class="w-full min-h-screen flex flex-col items-center gap-y-8">
    <h2 class="inline-block w-full text-2xl text-center mt-[120px]">Sign in</h2>
    <p v-if="errMessage" class="text-red-600">{{ errMessage }}</p>
    <div class="max-w-[550px] w-full p-4">
      <Form @submit="submit" class="flex flex-col gap-5">
        <label class="flex flex-col gap-2">
          Username
          <Field
            name="username"
            type="text"
            class="border border-gray-200 px-3 py-2 outline-none focus:border-gray-500 duration-150"
            :rules="validateUsername"
          />
          <ErrorMessage
            name="username"
            class="text-sm text-red-600 tracking-wider"
          />
        </label>
        <label class="flex flex-col gap-2">
          Password
          <Field
            name="password"
            type="password"
            class="font-bold border border-gray-200 px-3 py-2 outline-none focus:border-gray-500 duration-150"
            :rules="validatePassword"
          />
          <ErrorMessage
            name="password"
            class="text-sm text-red-600 tracking-wider"
          />
        </label>
        <button
          type="submit"
          class="mt-4 py-4 bg-orange-500 text-white tracking-widest"
        >
          {{ isLoading ? "Loading..." : "Sign in" }}
        </button>
        <p class="text-sm flex gap-x-3 justify-center">
          You don't have an account yet?<RouterLink
            :to="{ name: 'register' }"
            class="text-orange-500 tracking-widest"
            >Sign up</RouterLink
          >
        </p>
      </Form>
    </div>
  </main>
</template>
