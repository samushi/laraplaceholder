<template>
    <div class="uploading">
        <h2>Uploading & Creating</h2>
        <div class="progressing">
            <div ref="percentage" class="percentage" :style="{ width: progress + '%' }"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, useContext, watch } from '@nuxtjs/composition-api'
import {PlaceEvent} from '~/types/helpers';

export default defineComponent({
    props: ['inPost'],
    setup(props, {emit}) {
        const Placeholder = useContext().$placeholder;
        const progress = ref<Number>(0);
        const inPost = ref<PlaceEvent|null>(props.inPost);

        // Upload Event
        const uploadingFn = (uploadEvent: any) => {
            let percentage: number = Math.round(uploadEvent.loaded / uploadEvent.total * 100);
                progress.value = percentage;
        };

        // When is done
        const done = (r: any) => {
            const downloadLink:string = r.data.download;
            emit('done', downloadLink);
        }

        // When Post in drag & drop
        const onPostDir = (e:DragEvent) => {
            let dt = <DataTransfer>e.dataTransfer,
                files = <FileList>dt?.files,
                items = <DataTransferItemList>dt.items,
                entry = items[0].webkitGetAsEntry(),

            if(entry.isDirectory){
                Placeholder.readDropped(items);
            }else if(entry.isFile){
                Placeholder.uploadFiles(files);
            }
            // Generate from backend
            Placeholder.generate(uploadingFn).then(done);
        }

        // When select file
        const onPostFile = (e:Event) => {
            const files:FileList = (<FileList>(<HTMLInputElement>e.target).files);
            Placeholder.uploadFiles(files)
            .generate(uploadingFn)
            .then(done);
        }


        if(inPost.value instanceof DragEvent){
            onPostDir(inPost.value);
        }else if(inPost.value instanceof Event){
            onPostFile(inPost.value);
        }

        return {
            progress
        }
    }
})
</script>

<style lang="postcss" scoped>
    .uploading{
        @apply text-white;
		> h2{
            @apply font-lato text-6xl italic font-bold text-center;
		}

		> .progressing{
            @apply w-full h-10 border border-placeholder-light border-solid my-8 mx-0;

			.percentage{
                @apply w-0 h-full bg-white;
			}
		}
	}
</style>
