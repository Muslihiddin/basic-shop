<script setup>
import { usePaginationStore } from "../stores/pagination";
import { useRouter } from "vue-router";

const store = usePaginationStore();
const router = useRouter();

defineProps(["products"]);

const chooseProduct = async (productId) => {
  await store.getSingleProduct(productId);
  router.push({
    name: "product",
    params: { title: store.product.title, id: store.product.id },
  });
};
</script>
<template>
  <li
    v-for="item in products"
    :key="item.id"
    class="mt-5 max-w-[260px] flex flex-col justify-between gap-2 pr-3"
    @click="chooseProduct(item.id)"
  >
    <div>
      <img
        :src="item.thumbnail"
        :alt="item.title"
        class="w-[260px] h-[200px] object-cover"
      />
      <p class="font-bold inline-block mt-3">{{ item.title }}</p>
    </div>
    <div>
      <p class="text-gray-600 inline-block mb-1">{{ item.brand }}</p>
      <p>$ {{ item.price }}</p>
    </div>
  </li>
</template>
