<template>
    <div class="optimization-demo">
        <h1>Comulative Layout Shift: Before Optimization</h1>

        <div class="section">
            <button @click="loadImages()">Load new images</button>
        </div>

        <div v-if="imagesState.urls.length > 0">
            <img v-for="i in imagesState.numOfImages" :key="i" :src="imagesState.urls[i - 1]" :alt="`Image ${i}`" />
        </div>
        <p v-if="clsMessage">{{ clsMessage }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";

const clsMessage = ref('');

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
    clsMessage.value = "Loading images...";
    imagesState.urls = await Promise.all(Array.from({ length: imagesState.numOfImages }, getImageSrc))
    clsMessage.value = "LCP Image loaded.";
};

onMounted(() => {
    loadImages();
});
</script>

<style lang="scss" scoped></style>