<template>
  <div class="optimization-demo">
    <h1>Frontend Optimization Hands-On</h1>

    <div class="section">
      <button @click="loadImages()">Load new images</button>
    </div>

    <div v-if="imagesState.urls.length > 0">
      <img v-for="i in imagesState.numOfImages" :key="i" :src="imagesState.urls[i - 1]" :alt="`Image ${i}`" />
    </div>
    <p v-if="lcpMessage">{{ lcpMessage }}</p>

    <div class="section">
      <button @click="longTask">Simulate Long Task (INP impact)</button>
      <p v-if="inpMessage">{{ inpMessage }}</p>
    </div>

    <div class="section">
      <button @click="showCLS = !showCLS">Toggle CLS Content</button>
      <long-text v-if="showCLS" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import LongText from "./LongText.vue";

const lcpMessage = ref('');
const inpMessage = ref('Run Simulator to see INP impact');
const showCLS = ref(false);


const longTask = () => {
  inpMessage.value = "Simulating long task...";
  let result = 0;
  const iterations = 50000000;

  const startTime = performance.now();

  // DON'T REMOVE THE NESTED LOOP
  for (let i = 0; i < iterations; i++)
    for (let j = 0; j < 10; j++)
      result += j;

  const endTime = performance.now();
  const duration = endTime - startTime;
  console.log(`Task took ${duration}ms`);
  console.log("Result:", result);

  inpMessage.value = `Long task complete (Took ${duration}ms).`;
};

const imagesState = reactive({
  numOfImages: 10,
  urls: [],
  // Other states...
});

const getImageSrc = async () => {
  const width = 250;
  const height = Math.floor(Math.random() * 201) + 200;

  const response = await fetch(
    `https://random.imagecdn.app/${width}/${height}`
  );
  return response.url;
};

const loadImages = async () => {
  lcpMessage.value = "Loading images...";
  imagesState.urls = await Promise.all(Array.from({ length: imagesState.numOfImages }, getImageSrc))
  lcpMessage.value = "LCP Image loaded.";
};

onMounted(() => {
  loadImages();
});
</script>

<style lang="scss" scoped>
.section {
  padding: 1rem;
}
</style>
