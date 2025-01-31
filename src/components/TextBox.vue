<template>
    <div class="text-box">
        <!-- <p>{{ user }}</p> -->
        <input type="text" :value="modelValue" @input="handleInput" :placeholder="placeholder" :disabled="disabled"
            class="text-box__input" />
    </div>
</template>

<script setup>

// import _ from 'lodash'

// const user = _.camelCase('Mahmoud Hazem')

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: 'Enter text...',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['update:modelValue']);

const handleInput = (event) => {
    emit('update:modelValue', event.target.value);
};


</script>

<style scoped>
.text-box {
    margin: 10px 0;
}

.text-box__input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
}

.text-box__input:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.text-box__input:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
}
</style>