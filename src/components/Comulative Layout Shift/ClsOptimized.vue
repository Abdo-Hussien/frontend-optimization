<template>
    <div class="optimization-demo">
        <h1>Comulative Layout Shift: After Optimization</h1>

        <div class="section">
            <button @click="loadImages()">Load new images</button>
        </div>

        <div class="slider-wrapper">
            <image-slider>
                <template #item>
                    <swiper-slide class="swiper-slide" v-for="i in imagesState.numOfImages" :key="i">
                        <div v-if="!imagesState.loading">
                            <img :src="imagesState.urls[i - 1]" :alt="`Image ${i}`" />
                        </div>
                        <div v-else class="skeleton-loader"></div>
                    </swiper-slide>
                </template>
            </image-slider>
        </div>
        <p v-if="clsMessage">{{ clsMessage }}</p>
    </div>
</template>

<script setup>

import { ref, onMounted, reactive } from "vue";
import ImageSlider from "../ImageSlider.vue";

const clsMessage = ref('');

const imagesState = reactive({
    numOfImages: 10,
    urls: [],
    loading: true,
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
    imagesState.loading = true;
    imagesState.urls = await Promise.all(Array.from({ length: imagesState.numOfImages }, getImageSrc))
    imagesState.loading = false;
    clsMessage.value = "Images loaded.";
};

onMounted(() => {
    loadImages();
});
</script>

<style lang="scss" scoped>
.slider-wrapper {
    max-width: 750px;
    min-height: 400px;
}

.swiper-slide {
    width: 250px;
    height: 400px;

    & .img {
        display: block;
        width: 100%;
    }
}

.skeleton-loader {
    position: relative;
    display: block;
    width: 250px;
    height: 400px;
    background: linear-gradient(90deg, #141414 25%, #1a1a1a 50%, #141414 75%);
    background-size: 200% 100%;
    animation: loadingAnimation 1.5s infinite linear;
    border-radius: 8px;
}

@keyframes loadingAnimation {
    0% {
        background-position: 200% 0;
    }

    100% {
        background-position: -200% 0;
    }
}
</style>