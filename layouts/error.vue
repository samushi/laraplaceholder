<template>
    <div class="flex justify-center content-center flex-wrap">        
        <h1 class="heading" v-if="error.statusCode === 404">Page not found</h1>
        <h1 class="heading" v-else>An error occurred - {{ error.statusCode }} </h1>
        <NuxtLink to="/" class="back-to-home">Back to home</NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import Vue from 'vue';

export default Vue.extend({
    props: ['error']
})

</script>

<style>
    .error-text{
        font-size: 80px;
    }

    .heading{
        @apply block w-full text-center text-white error-text;
    }

    .back-to-home{
        @apply text-white font-cabinbold font-bold text-lg;
    }

</style>