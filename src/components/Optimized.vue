<template>
    <div class="optimization-demo">
        <h1>Frontend Optimized Version</h1>

        <div class="section">
            <button @click="longTask">Simulate Long Task (INP impact)</button>
            <p v-if="inpMessage">{{ inpMessage }}</p>
        </div>

        <div style="height: 720px;"></div> <!-- Assuming the button is outside the viewport -->

        <div class="section" id="long-text__wrapper">
            <button @click="openComponent = !openComponent">
                Show Lazy loaded component
            </button>
            <long-text v-if="openComponent" />
        </div>
    </div>
</template>

<script setup>
import { defineAsyncComponent, onMounted, ref, shallowRef } from "vue";

const inpMessage = ref('Run Simulator to see INP impact');

const openComponent = ref(false)

// For VueJs Devs: use defineAsyncComponent for lazy loading.
// const LongText = defineAsyncComponent(() => import("./LongText.vue"));

const LongText = shallowRef(null);

const callback = (entries, observer) => {
    const targetElement = entries[0]
    if (targetElement.isIntersecting) // Is Wrapper intersecting with the viewport?
        import('./LongText.vue').then(({ default: longTextComponent }) => {
            LongText.value = longTextComponent // Dynamic import to load the component.
        })
}

let longTextWrapper = null

onMounted(() => {
    const observer = new IntersectionObserver(callback)
    longTextWrapper = document.getElementById('long-text__wrapper')
    if (longTextWrapper)
        observer.observe(longTextWrapper)
})



const longTask = () => {
    inpMessage.value = "Simulating long task...";
    const startTime = performance.now();
    const worker = new Worker(new URL("../scripts/LongTask.js", import.meta.url));

    // Send the number of iterations to the worker
    worker.postMessage({ iterations: 70000000 });

    worker.onmessage = function (e) {
        const result = e.data;
        const endTime = performance.now();
        const duration = endTime - startTime;
        console.log(`Web Worker Task took ${duration}ms`);
        console.log("Result:", result);

        inpMessage.value = `Long task complete (Took ${duration}ms).`;
        worker.terminate();
    };
};
</script>

<style lang="scss" scoped></style>