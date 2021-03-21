<template>
  <h2 class="text-2xl text-white text-center">{{message}}</h2>
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

<style>

</style>
