<script setup>
import TheSidebar from "../components/TheSidebar.vue";
import TheContent from "../components/TheContent.vue";
import { usePaginationStore } from "../stores/pagination";
import { useRoute } from "vue-router";
import { watch } from "vue";

const route = useRoute();
const store = usePaginationStore();

store.getCategoryProducts(route.params.category);

watch(route, (to) => {
  if (to.params.category) {
    store.getCategoryProducts(to.params.category);
  }
});
</script>

<template>
  <main class="grid grid-cols-1 sm:grid-cols-9">
    <TheSidebar class="sm:col-span-3" />
    <ul
      class="sm:col-start-4 sm:col-end-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-center"
    >
      <TheContent :products="store.paginatedProducts" />
    </ul>
  </main>
</template>
