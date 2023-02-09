<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { usePaginationStore } from "../stores/pagination";
import ProductView from "../components/product/ProductView.vue";

const route = useRoute();
const store = usePaginationStore();
onMounted(() => {
  if (route.params.id) {
    store.getSingleProduct(route.params.id);
  }
});

const product = computed(() => store.product);
</script>
<template>
  <div class="pr-2">
    <ProductView :product="product" />
  </div>
</template>
