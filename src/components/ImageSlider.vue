<template>
    <swiper-container class="my-swiper" :slides-per-view="3" :space-between="10" :effect="'coverflow'"
        :coverflowEffect="{ rotate: 45, stretch: 3, depth: 100, modifier: 1, slideShadows: false }" :grabCursor="true"
        :centeredSlides="true">
        <slot name="item" />
    </swiper-container>
</template>

<script lang="ts" setup>
import Swiper from 'swiper';
import 'swiper/css';

import { EffectCoverflow } from 'swiper/modules';
Swiper.use([EffectCoverflow]);
</script>

<style lang="scss" scoped></style>