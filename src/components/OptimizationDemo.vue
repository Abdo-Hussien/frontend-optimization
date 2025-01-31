<template>
  <div class="optimization-demo">
    <h1>Frontend Optimization Demo (Metrics Focused)</h1>

    <div class="lcp-example">
      <img v-for="i in 3" :key="i" :src="imageUrls[i - 1]" :alt="`Image ${i}`" @load="imageLoaded">
    </div>
    <p v-if="lcpMessage">{{ lcpMessage }}</p>

    <div class="cls-example">
      <div :class="{ 'cls-content': showCLS }">
        <p>This text demonstrates a Cumulative Layout Shift.</p>
      </div>
      <button @click="showCLS = !showCLS">Toggle CLS Content</button>
    </div>

    <div class="inp-example">
      <button @click="longTask">Simulate Long Task (INP impact)</button>
      <p v-if="inpMessage">{{ inpMessage }}</p>
    </div>

    <div class="interaction-example">
      <button @click="updateValue">Update Value (Interaction)</button>
      <p>Value: {{ value }}</p>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue';
const lcpMessage = ref(null);
const showCLS = ref(false);
const inpMessage = ref(null);
const value = ref(0);

const imageLoaded = () => {
  lcpMessage.value = "LCP Image loaded.";
};

const longTask = () => {
  inpMessage.value = "Simulating long task...";
  let result = 0;
  const startTime = performance.now();
  for (let i = 0; i < 50000000; i++) { // Increased loop count for more impact
    result += i;
  }

  const endTime = performance.now();
  const duration = endTime - startTime;
  console.log(`Long Task took ${duration}ms`);

  inpMessage.value = `Long task complete (Took ${duration}ms).`;
};

const updateValue = () => {
  value.value++;
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
  imageUrls.value = await Promise.all([getImageSrc(), getImageSrc(), getImageSrc()]);
};

onMounted(() => {
  // Simulate initial CLS
  loadImages()
  setTimeout(() => {
    showCLS.value = true;
  }, 500);

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
  /** Code HERE */
  /* min-height: 250px; */
  gap: 2rem;
  margin-bottom: 20px;
}

.lcp-example img {
  max-width: 500px;
  /* Or whatever width you want */
  display: block;
  /* Prevent image from affecting layout */
}

.cls-example {
  margin-bottom: 20px;
}

.cls-content {
  transition: height 0.3s ease;
  /* Smooth transition for CLS */
  height: 50px;
  /* Initial height */
}

.cls-content:not(.show) {
  height: 0;
  /* height change to create CLS */
  overflow: hidden;
}

.cls-content.show {
  height: 50px;
}

.inp-example {
  margin-bottom: 20px;
}

.interaction-example {
  margin-bottom: 20px;
}
</style>