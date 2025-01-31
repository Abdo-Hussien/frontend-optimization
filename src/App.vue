<script setup>
import { defineAsyncComponent, onMounted, ref } from 'vue';

import TextBox from './components/TextBox.vue';

// const TextBox = defineAsyncComponent(() => import('./components/TextBox.vue'))

// const isComponentVisible = ref(false)


// function callback(entries, observer) {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       isComponentVisible.value = true;
//       console.log("Component is now visible! ", entry)
//     }
//     else {
//       isComponentVisible.value = false;
//       console.log("Component is invisible!")
//     }

//   })
// }

// let helloWorldWrapper = null
// onMounted(() => {

//   const options = {
//     root: null,
//     rootMargin: '0px',
//     threshold: 0
//   }

//   const observer = new IntersectionObserver(callback, options)

//   helloWorldWrapper = document.querySelector('.component__wrapper')

//   observer.observe(helloWorldWrapper)
// })


const inputValue = ref('');
const isDisabled = ref(false);

const toggleDisabled = () => {
  isDisabled.value = !isDisabled.value;
};

</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <h1>Vite + Vue</h1>

  
  <!-- <div style="min-height: 1000px;"></div> -->

  <div class="component__wrapper">
    <h2>Vue TextBox Example</h2>
    <TextBox v-model="inputValue" :disabled="isDisabled" />
    <p>You typed: {{ inputValue }}</p>
    <button @click="toggleDisabled">
      {{ isDisabled ? 'Enable Input' : 'Disable Input' }}
    </button>
  </div>

  <!-- <div style="min-height: 1000px;"></div> -->
</template>

<style scoped>
.component__wrapper {
  padding: 50px;
  /* border: 1px solid gray; */
  border-radius: 10px;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
