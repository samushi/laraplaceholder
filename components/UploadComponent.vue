<template>
    <div 
    class="uploadform" 
    :class="highlighted ? 'highlighted' : ''"

    @drop.prevent="onDropped"
    @dragover="onDragOver" 
    @dragleave="onDragLeave"
  >
        <h2>Drag & Drop files here</h2>
        <p>(only .JPEG, .JPG, .PNG & .GIF accepted)</p>
        <p>OR</p>

        <div class="file_upload">
            <button class="btn-upload" @click.prevent="onClickFileUplopad">Browse</button> 
            <input class="input-files" @change="onFileSelected($event)" ref="uploading" value="Browse" type="file" name="files[]" multiple>
        </div>

        <p>to Upload</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
    setup (props, {emit}) {
        const uploading = ref<HTMLElement | null>(null)
        const highlighted = ref<boolean>(false);

        
        // Drag Files or Folder
        const onDropped = (e: DragEvent) => {
            highlighted.value = false;
            emit('onPost', e);
        }

        // On drag over
        const onDragOver = (e: DragEvent) => {
            e.preventDefault();
            highlighted.value = true;
        }

        // On drag leave
        const onDragLeave = (e: DragEvent) => {
            highlighted.value = false;
        }

        // On click to upload
        const onClickFileUplopad = () => {
            uploading.value?.click()
        }

        // On file is selected
        const onFileSelected = (e: Event) => {
            emit('onPost', e);
        }

        return {
            onClickFileUplopad, 
            onFileSelected, 
            uploading, 
            highlighted,
            onDropped,
            onDragOver,
            onDragLeave
        }
    }
})
</script>

<style lang="postcss">
    .border-form-color{
        border-color: #9b82c7;
    }
    .uploadform{
        @apply p-16 border-form-color border-dashed border-4 rounded-2xl text-center text-white;

        &.highlighted{
            @apply border-yellow-500;
        }

        > h2{
            @apply font-lato text-7xl italic font-bold;
        }

        > p{
            @apply text-sm my-4;
        }

        .file_upload{
            @apply relative inline-block overflow-hidden my-0 mx-auto w-auto h-full;

            .btn-upload{
                @apply table 
                font-cabinbold 
                text-sm
                text-white 
                no-underline 
                uppercase 
                py-5 
                px-14
                z-50
                rounded-lg 
                border-none 
                outline-none
                transition-all delay-300 duration-300 ease-in-out
                bg-gradient-to-tr 
                from-placeholder 
                to-placeholder-light
                hover:from-placeholder-light hover:to-placeholder;
			}

            input{
                &.input-files{
                    @apply hidden;
                }
            }

        }
    }
</style>