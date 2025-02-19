<template>
  <div class="component__wrapper">
    <NonOptimized />
    <!-- <div id="text-box-component">
      <TextBox v-model="inputValue" :disabled="isDisabled" />
    </div>
    <p>You typed: {{ inputValue }}</p>
    <button @click="toggleDisabled">
      {{ isDisabled ? 'Enable Input' : 'Disable Input' }}
    </button> -->
  </div>
</template>
<script lang="ts" setup>
import { defineAsyncComponent, onMounted, ref } from 'vue';

import { register } from 'swiper/element/bundle';
import NonOptimized from './components/NonOptimized.vue';
import Optimized from './components/Optimized.vue';
// import TextBox from './components/TextBox.vue';
register();

const TextBox = defineAsyncComponent(() => import('./components/TextBox.vue'))

const isComponentVisible = ref(false)


const callback: IntersectionObserverCallback = (entries, observer) => {
  isComponentVisible.value = entries[0].isIntersecting
}

let helloWorldWrapper: Element | null = null
onMounted(() => {
  const container = document.querySelector('.component__wrapper')
  if (!container) return
  const options: IntersectionObserverInit = {
    root: container,
    threshold: 1
  }
  const observer = new IntersectionObserver(callback, options)
  helloWorldWrapper = document.getElementById('text-box-component')
  if (helloWorldWrapper)
    observer.observe(helloWorldWrapper)
})


const inputValue = ref('');
const isDisabled = ref(false);

const toggleDisabled = () => {
  isDisabled.value = !isDisabled.value;
};

</script>

<style scoped>
.component__wrapper {
  width: 100%;
  border-radius: 10px;
}
</style>
