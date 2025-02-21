<template>

  <div class="component__wrapper">
    <Optimized />
    <!-- <NonOptimized /> -->
  </div>

</template>

<script setup>
import { register } from 'swiper/element/bundle';
import Optimized from './components/Optimized.vue';
// import NonOptimized from './components/NonOptimized.vue';

register();
</script>

<style scoped></style>
