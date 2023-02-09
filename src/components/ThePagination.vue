<script setup>
import { usePaginationStore } from "../stores/pagination";

const store = usePaginationStore();

const handlePrev = () => {
  if (store.pageNumber == 1) {
    return;
  } else {
    store.prevPage();
    window.scrollTo(0, 0);
  }
};
const handleNext = () => {
  if (store.pageNumber == Math.ceil(store.products.length / 12)) {
    return;
  } else {
    store.nextPage();
    window.scrollTo(0, 0);
  }
};
const handlePageJump = (page) => {
  if (page == store.pageNumber) {
    console.log(page);
    return;
  } else {
    store.toPage(page);
    window.scrollTo(0, 0);
  }
};
</script>
<template>
  <div class="flex justify-center items-center mt-10">
    <button class="px-4 py-2 mr-4" @click="handlePrev">back</button>
    <div class="flex justify-between">
      <button
        v-if="store.pageNumber > 1"
        class="text-gray-400 px-4 py-2 text-sm"
        @click="handlePageJump(1)"
      >
        1
      </button>
      <button v-if="store.pageNumber > 2" class="py-2 px-4 cursor-default">
        ...
      </button>
      <button class="py-2 px-4 border border-gray-600">
        {{ store.pageNumber }}
      </button>
      <button
        v-if="Math.ceil(store.products.length / 12) > store.pageNumber"
        class="py-2 px-4 cursor-default"
      >
        ...
      </button>
      <button
        v-if="Math.ceil(store.products.length / 12) > store.pageNumber"
        class="text-gray-400 px-4 py-2 text-sm"
        @click="handlePageJump(Math.ceil(store.products.length / 12))"
      >
        {{ Math.ceil(store.products.length / 12) }}
      </button>
    </div>
    <button class="px-4 py-2 ml-4" @click="handleNext">next</button>
  </div>
</template>
