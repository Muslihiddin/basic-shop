<script setup>
import { computed } from "vue";
import { useAuthStore } from "../../stores/auth";
import TheCategories from "./utils/TheCategories.vue";

const store = useAuthStore();
const authenticated = computed(() => store.authenticated);
</script>
<template>
  <nav
    class="flex items-center justify-between xl:max-w-[1080px] pr-4 mx-auto pt-5"
  >
    <RouterLink to="/">
      <img
        src="../../assets/Logo_small.svg"
        alt="Site logo"
        class="w-[120px]"
      />
    </RouterLink>
    <div class="flex items-center gap-x-10">
      <TheCategories />
      <RouterLink
        v-if="!authenticated"
        :to="{ name: 'sign-in' }"
        class="hover:text-orange-500 duration-150 font-bold"
        >Sign up/in</RouterLink
      >
      <button
        v-if="authenticated"
        class="hover:text-orange-500 duration-150 font-bold"
        @click="store.logout"
      >
        Logout
      </button>
    </div>
  </nav>
</template>
