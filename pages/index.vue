<template>
  <h2 class="test-header">{{message}}</h2>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({

    setup ({ user }) {
        
        const message = ref("Welcome to the laraplaceholder")

        return {message}
    }
})
</script>

<style lang="postcss">
    .test-header{
        @apply text-2xl text-placeholder-light text-center;
    }
</style>
