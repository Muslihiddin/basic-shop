<script setup>
import { ref } from "vue";

defineProps(["isActive"]);
const emits = defineEmits(["toRate"]);

const ratings = ref([
  { rate: 1 },
  { rate: 2 },
  { rate: 3 },
  { rate: 4 },
  { rate: 5 },
]);

const rating = ref(0);

const hadleRating = () => {
  emits("toRate", rating.value);
  rating.value = 0;
};
</script>
<template>
  <div class="relative">
    <Teleport to="#modal">
      <div
        v-show="isActive"
        class="fixed top-0 left-0 h-full w-full font-roboto grid bg-black/30"
      >
        <div
          class="max-w-[500px] w-full md:max-w-[375px] place-self-center flex flex-col gap-y-10 bg-white p-8"
        >
          <p>Your opinion is valuable to us.</p>
          <div class="flex items-center justify-between gap-x-2 text-slate-300">
            <button
              v-for="item in ratings"
              :key="item.rate"
              @click="rating = item.rate"
              class="hover:bg-orange-400 px-3 py-1 cursor-pointer"
              :class="{
                'bg-orange-400': rating == item.rate,
                'bg-gray-500': rating != item.rate,
              }"
            >
              {{ item.rate }}
            </button>
          </div>
          <button class="w-full" @click="hadleRating">Rate</button>
        </div>
      </div>
    </Teleport>
  </div>
</template>
