<template>
    <div>
        <p>This text demonstrates a Cumulative Layout Shift.</p>
        <p v-if="showCLS">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto in non nobis
            molestias maiores beatae corrupti quasi nisi aliquid alias, ad a, ut, officia laborum incidunt! Doloremque,
            tempore nostrum. Qui! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus incidunt quam iste
            error magni aliquid repellat quasi. Voluptas quas unde quis repudiandae, reiciendis veritatis eos, quisquam
            numquam vel sequi asperiores. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem a laborum
            perferendis eveniet alias vero facilis quisquam nihil temporibus doloremque porro, laboriosam corporis odio
            quo aspernatur distinctio expedita atque harum. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Numquam architecto quas vitae, nihil molestias consequuntur blanditiis error, quasi ad explicabo commodi
            dolores quisquam voluptatem facere fugiat hic nostrum eos atque. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Voluptatum molestias deserunt, repudiandae doloribus ex animi labore quae esse aperiam
            distinctio! Culpa a at eius ratione officia temporibus deleniti dolorem molestias.</p>
        <button @click="showCLS = !showCLS">Toggle CLS Content</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const showCLS = ref(false);
</script>

<style lang="scss" scoped></style>