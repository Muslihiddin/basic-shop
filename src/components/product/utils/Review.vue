<script setup>
defineProps(["review"]);
</script>
<template>
  <li class="flex flex-col gap-y-4">
    <div class="flex flex-col gap-y-2">
      <h2 class="text-xl font-semibold">{{ review.user.username }}</h2>
      <p class="text-sm">{{ review.rating ? review.rating : "5" }}/5</p>
    </div>
    <p class="text-gray-700">{{ review.body }}</p>
  </li>
</template>
