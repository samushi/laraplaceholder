<template>
  <div 
    class="uploadform" 
    :class="highlighted ? 'highlighted' : ''"

    @drop="onDropped"
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
import { defineComponent, ref, Ref, onMounted } from '@vue/composition-api'

export default defineComponent({
    setup () {
        const uploading = ref<HTMLElement | null>(null)
        const highlighted = ref<boolean>(false);

        // Drag Files
        const onDropped = (e: DragEvent) => {
            e.preventDefault();
            highlighted.value = false;

            let dt = <DataTransfer>e.dataTransfer,
                files = <FileList>dt?.files,
                items = <DataTransferItemList>dt.items,
                entry = items[0].webkitGetAsEntry();

            console.log(files, entry);

            if(entry.isDirectory){
                console.log("Is dir");
            }else if(entry.isFile){
                console.log("is file");
            }

        }

        const onDragOver = (e: DragEvent) => {
            e.preventDefault();
            highlighted.value = true;
            console.log("On Drag over")
        }

        const onDragLeave = (e: DragEvent) => {
            highlighted.value = false;
            console.log("On Drag Leave");
        }

        const onClickFileUplopad = () => {
            uploading.value?.click()
        }

        const onFileSelected = (e: Event) => {
            const files:FileList = (<FileList>(<HTMLInputElement>e.target).files);
            let fileBag: File[] = [];

            Array.from(files).forEach((file) => {
                if(
                    file.type === "image/jpeg" ||
                    file.type === "image/jpg" ||
                    file.type === "image/gif" ||
                    file.type === "image/png"
                ){
                    fileBag.push(file);
                }
            });

            console.log(fileBag);
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
                    /* @apply absolute left-0 top-0 opacity-0 w-full h-full z-auto cursor-pointer; */
                }
            }

        }
    }
</style>
