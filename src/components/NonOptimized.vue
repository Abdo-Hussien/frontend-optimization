<template>
  <div class="optimization-demo">
    <h1>Frontend Optimization Hands-On</h1>

    <div class="section">
      <button @click="longTask">Simulate Long Task (INP impact)</button>
      <p v-if="inpMessage">{{ inpMessage }}</p>
    </div>

    <div style="height: 720px;"></div> <!-- Assuming the button is outside the viewport -->

    <div class="section">
      <button @click="showCLS = !showCLS">Toggle CLS Content</button>
      <long-text v-if="showCLS" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import LongText from "./LongText.vue";

const inpMessage = ref('Run Simulator to see INP impact');
const showCLS = ref(false);


const longTask = () => {
  inpMessage.value = "Simulating long task...";
  let result = 0;
  const iterations = 70000000;

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
</script>

<style lang="scss" scoped></style>
