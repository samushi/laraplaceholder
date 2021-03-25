<template>
  <div>
      <UploadComponent v-if="showComponent.upload" />
      <ProcessingComponent v-else-if="showComponent.processing" />
  </div>
</template>

<script lang="ts">
    import {ref, defineComponent} from '@nuxtjs/composition-api';

    export default defineComponent({
        setup(){
            const showComponent = ref<Object>({
                upload: true,
                processing: false,
                downloading: false          
            })

            return {
                showComponent
            }
        }
    });

</script>

<style lang="postcss">
    
</style>
