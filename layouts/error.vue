<template>
    <div class="error-page">        
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