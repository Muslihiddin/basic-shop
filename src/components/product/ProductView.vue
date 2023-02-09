<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useReviewsStore } from "../../stores/reviews";
import { useAuthStore } from "../../stores/auth";
import Review from "./utils/Review.vue";
import BaseModal from "../BaseModal.vue";

const route = useRoute();
const props = defineProps(["product"]);

const inStock = computed(() => {
  return props.product.stock > 0 ? true : false;
});

const authStore = useAuthStore();
const store = useReviewsStore();
store.getReviews(route.params.id);

// leaving review
const isModalActive = ref(false);
const review = ref("");

const handleReview = () => {
  isModalActive.value = true;
};

const handleSubit = (userRating) => {
  store.addNewReview({
    id: authStore.user.id,
    body: review.value,
    rating: userRating,
    user: {
      id: 1,
      username: authStore.user.username,
    },
  });
  review.value = "";
  isModalActive.value = false;
  document.getElementById("reviews").scrollIntoView({ behavior: "smooth" });
};
</script>
<template>
  <!-- Product section -->
  <section class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <div>
      <img :src="product.thumbnail" class="w-full" />
    </div>
    <div class="flex flex-col gap-y-4">
      <header class="flex justify-between items-start">
        <h2 class="font-semibold text-2xl">{{ product.title }}</h2>
        <div
          v-if="authStore.authenticated"
          class="px-1 rounded"
          :class="{ 'bg-orange-400': inStock, 'bg-red-500': !inStock }"
        >
          <p class="text-sm text-white tracking-wider">
            {{ inStock ? "Available" : "Not available" }}
          </p>
        </div>
      </header>
      <p class="text-sm text-gray-500">
        Brand: <span class="text-orange-500">{{ product.brand }}</span>
      </p>
      <p><span class="text-gray-500">Price: </span>${{ product.price }}</p>
      <p v-if="authStore.authenticated">
        <span class="text-gray-500">Quantity:</span> {{ product.stock }}
      </p>
      <p>
        {{ product.description }}
      </p>
      <p class="flex items-center gap-x-1 text-gray-500">
        <span>⭐</span>{{ product.rating }} of 5
      </p>
    </div>
  </section>

  <!-- Reviews section -->
  <section
    class="mt-[80px] flex flex-col items-center max-w-[800px] w-full mx-auto"
  >
    <header class="border-b border-b-gray-200 mb-6 py-1 w-full">
      <h3 class="text-xl">Recent Reveiws</h3>
    </header>
    <div
      v-if="!authStore.authenticated"
      class="w-full flex flex-col sm:flex-row gap-3"
    >
      <p class="tracking-wide">
        In order to leave a review you need to be signed in.
      </p>
      <RouterLink :to="{ name: 'sign-in' }" class="text-orange-500"
        >Sign in</RouterLink
      >
    </div>

    <BaseModal :is-active="isModalActive" @to-rate="handleSubit" />

    <main class="w-full">
      <form
        v-if="authStore.authenticated"
        @submit.prevent="handleReview"
        class="max-w-[800px] min-w-full"
      >
        <textarea
          v-model="review"
          class="w-full h-[80px] border border-gray-300 resize-none outline-none px-4 py-2"
        ></textarea>
        <div class="flex justify-between">
          <div></div>
          <button type="submit" class="py-2 px-10 bg-orange-500 text-white">
            Send
          </button>
        </div>
      </form>

      <!-- Reviews -->
      <ul class="mt-[80px] flex flex-col gap-y-[90px] px-5" id="reviews">
        <Review v-for="item in store.reviews" :key="item.id" :review="item" />
      </ul>
    </main>
  </section>
</template>
