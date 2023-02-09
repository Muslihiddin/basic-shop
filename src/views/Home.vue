<script setup>
import TheContent from "../components/TheContent.vue";
import ThePagination from "../components/ThePagination.vue";
import { usePaginationStore } from "../stores/pagination";

const store = usePaginationStore();
store.getProducts();
</script>
<template>
  <main class="flex flex-col justify-between items-center">
    <ul class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      <TheContent :products="store.paginatedProducts" />
    </ul>
    <ThePagination />
  </main>
</template>
