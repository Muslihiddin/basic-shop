<script setup>
import dummyjsonAPI from "../../../services/dummyjsonAPI";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const categories = reactive([]);

const getCategories = async () => {
  const response = await dummyjsonAPI.getAllCategories();
  response.data.map((x) => categories.push(x));
};
getCategories();

const isModalOpen = ref(false);

const handleCategories = (category) => {
  isModalOpen.value = false;
  router.push({ name: "categories", params: { category: category } });
};
</script>
<template>
  <button class="px-4 py-2 bg-slate-200" @click="isModalOpen = !isModalOpen">
    Categories
  </button>
  <Transition name="categories-modal">
    <ul
      v-if="isModalOpen"
      class="fixed top-[85px] bottom-0 left-0 right-0 bg-white grid grid-cols-1 sm:grid-cols-2 gap-5 pt-10 overflow-y-scroll sm:overflow-y-auto xl:max-w-[1080px] mx-auto pb-5 z-10"
    >
      <li
        v-for="item in categories"
        :key="item"
        class="pl-5 cursor-pointer hover:text-orange-500 duration-150"
        @click="handleCategories(item)"
      >
        <p class="capitalize">{{ item }}</p>
      </li>
    </ul>
  </Transition>
</template>
<style scoped>
@media screen and (min-width: 640px) {
  .categories-modal-enter-active {
    transition: all 0.11s ease;
  }

  .categories-modal-enter-from {
    transform: scale(0.8);
  }
  .categories-modal-enter-to {
    transform: scale(1);
  }
}

.categories-modal-enter-active {
  transition: all 0.11s ease;
}

.categories-modal-enter-from {
  top: 100%;
}
.categories-modal-enter-to {
  bottom: 0;
}
</style>
