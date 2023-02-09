<script setup>
import TheHeader from "../../components/header/TheHeader.vue";
import TheFooter from "../../components/TheFooter.vue";
</script>
<template>
  <TheHeader />
  <div class="mx-auto pt-[80px] xl:max-w-[1080px] pl-2 min-h-screen">
    <RouterView />
  </div>
  <TheFooter />
</template>
