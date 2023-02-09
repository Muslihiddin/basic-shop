<script setup>
import { computed, ref } from "vue";
import { usePaginationStore } from "../stores/pagination";

const isModalOpen = ref(false);

const store = usePaginationStore();
const brands = computed(() => {
  return new Set(store.products.map((x) => x.brand));
});
</script>

<template>
  <div>
    <aside class="hidden sm:block">
      <h3 class="font-bold">Filters</h3>
      <div class="mt-10 pl-4 flex flex-col">
        <label class="mr-2">Brand:</label>
        <ul class="mt-5 flex flex-col gap-y-4 mb-5">
          <li v-for="item in brands" :key="item" class="flex items-center">
            <label class="flex items-center gap-x-3 cursor-pointer">
              <input
                type="checkbox"
                class="w-5 h-4"
                :value="item"
                v-model="store.appliedFilter"
              />
              {{ item }}
            </label>
          </li>
        </ul>
        <p
          v-if="store.appliedFilter.length"
          class="text-sm text-gray-400 cursor-pointer"
          @click="store.dropFilters"
        >
          reset
        </p>
      </div>
    </aside>

    <aside class="block sm:hidden relative">
      <button
        class="px-4 py-2 bg-slate-200 outline-none"
        @click="isModalOpen = !isModalOpen"
      >
        Filters
      </button>

      <Transition name="sidebar-modal">
        <div
          v-show="isModalOpen"
          class="pt-4 px-4 fixed w-full h-full bg-white"
        >
          <div class="flex justify-between items-center">
            <label class="mr-2">Brand:</label>
            <p
              v-if="store.appliedFilter.length"
              class="text-gray-400 cursor-pointer"
              @click="store.dropFilters"
            >
              reset
            </p>
          </div>
          <ul class="mt-5 flex flex-col gap-y-4 mb-5">
            <li v-for="item in brands" :key="item" class="flex items-center">
              <label class="flex items-center gap-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  class="w-5 h-4"
                  :value="item"
                  v-model="store.appliedFilter"
                />
                {{ item }}
              </label>
            </li>
          </ul>
          <button
            class="w-full py-5 bg-orange-500 text-white"
            @click="isModalOpen = !isModalOpen"
          >
            Apply
          </button>
        </div>
      </Transition>
    </aside>
  </div>
</template>

<style scoped>
.sidebar-modal-enter-active,
.sidebar-modal-leave-active {
  transition: all 0.11s ease;
}

.sidebar-modal-enter-from,
.sidebar-modal-leave-to {
  transform: translateY(100%);
}
</style>
