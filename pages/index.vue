<template>
  <div>
      <UploadComponent v-if="showComponent.upload" @onPost="progressing" />
      <ProcessingComponent :inPost="uploading" @done="hasBeenUploaded" v-else-if="showComponent.processing" />
      <DownloadComponent :downloadUrl="downloadUrl" @newUpload="progressing" v-else-if="showComponent.downloading" />
  </div>
</template>

<script lang="ts">
    import {ref, defineComponent} from '@nuxtjs/composition-api';
    import {ShowComponent, PlaceEvent} from '~/types/helpers';

    export default defineComponent({
        setup(){

            const uploading = ref<PlaceEvent|null>(null);
            const downloadUrl = ref<string|null>(null);

            const showComponent = ref<ShowComponent>({
                upload: true,
                processing: false,
                downloading: false          
            });

            const progressing = (e:PlaceEvent) => {
                uploading.value = e;
                showComponent.value.upload = false;
                showComponent.value.processing = true;
            };

            const hasBeenUploaded = (link:string) => {
                showComponent.value.upload = false;
                showComponent.value.processing = false;
                showComponent.value.downloading = true;
                downloadUrl.value = link;
            }

            return {
                showComponent,
                progressing,
                uploading,
                hasBeenUploaded,
                downloadUrl
            }
        }
    });

</script>

<style lang="postcss">
    
</style>
