<template>
  <div class="optimization-demo">
    <h1>Frontend Optimization Demo (Metrics Focused)</h1>

    <div class="lcp-example">
      <img v-for="i in 5" :key="i" :src="imageUrls[i - 1]" :alt="`Image ${i}`" @load="imageLoaded">
    </div>
    <p v-if="lcpMessage">{{ lcpMessage }}</p>

    <div class="inp-example">
      <button @click="longTask">Simulate Long Task (INP impact)</button>
      <p v-if="inpMessage">{{ inpMessage }}</p>
    </div>

    <div class="cls-example">
      <long-text></long-text>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue';

const LongText = defineAsyncComponent(() => import('./LongText.vue'))
const lcpMessage = ref(null);
const inpMessage = ref(null);

const imageLoaded = () => {
  lcpMessage.value = "LCP Image loaded.";
};

const longTask = () => {
  inpMessage.value = "Simulating long task...";
  let result = 0;
  const startTime = performance.now();
  for (let i = 0; i < 50000000; i++) { // 50,000,000: 50mil
    for (let j = 0; j < 10; j++) {
      result += j;
    }
  }

  const endTime = performance.now();
  const duration = endTime - startTime;
  console.log(`Long Task took ${duration}ms`);

  inpMessage.value = `Long task complete (Took ${duration}ms).`;
};

const imageUrls = ref([]);

const getImageSrc = async () => {
  // Random number not excceeding 400
  const width = 250;
  const height = Math.floor(Math.random() * 250) + 1;
  const response = await fetch(`https://random.imagecdn.app/${width}/${height}`);
  return response.url;
};

const loadImages = async () => {
  imageUrls.value = await Promise.all([getImageSrc(), getImageSrc(), getImageSrc(), getImageSrc(), getImageSrc()]);
};

onMounted(() => {
  // Simulate initial CLS
  loadImages()
});
</script>

<style scoped>
.optimization-demo {
  font-family: sans-serif;
  padding: 20px;
}

.lcp-example {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  /** Code HERE */
  min-height: 250px;
  gap: 2rem;
  margin-bottom: 20px;
}

.cls-example {
  margin-bottom: 25px;
}

.inp-example {
  margin-bottom: 20px;
}

.interaction-example {
  margin-bottom: 20px;
}
</style>