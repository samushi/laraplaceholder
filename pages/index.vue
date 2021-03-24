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
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
    setup () {
        const uploading = ref<HTMLElement | null>(null)
        const progress = ref<number>(0)
        const highlighted = ref<boolean>(false);
        const fileListDirectory: any[] = [];
        const fileBag: File[] = [];
        const AppContext = useContext();
        const downloadUrl = ref<string>("#");

        // Drag Files or Folder
        const onDropped = (e: DragEvent) => {
            e.preventDefault();
            highlighted.value = false;

            let dt = <DataTransfer>e.dataTransfer,
                files = <FileList>dt?.files,
                items = <DataTransferItemList>dt.items,
                entry = items[0].webkitGetAsEntry();

            if(entry.isDirectory){
                readDropped(items);
            }else if(entry.isFile){
                uploadFiles(files);
            }
        }

        const readDropped = (entries: any) => {
            for (let i = 0; i < entries.length; i += 1) {
                const item = entries[i];
                const entry = item.webkitGetAsEntry();

                AppContext.$placeholder.traverseDirectory(entry).then((results: any) => {
                    getEntry(results[0]);

                    Promise.all(fileListDirectory).then((fl: any) => {
						uploadFiles(fl);
                    });

                });
            }
        }

        const getEntry = (results: any[]) => {
            results.map((r)=> {
                if(Array.isArray(r)){
                    getEntry(r);
                }else{
                    fileListDirectory.push(getFile(r));
                }
            })
        }

        const getFile = async (fileEntry: any) : Promise<any> => {
            return await new Promise((resolve, reject) => fileEntry.file(resolve, reject));
        }

        const onDragOver = (e: DragEvent) => {
            e.preventDefault();
            highlighted.value = true;
        }

        const onDragLeave = (e: DragEvent) => {
            highlighted.value = false;
        }

        const onClickFileUplopad = () => {
            uploading.value?.click()
        }

        const appendImages = (files: FileList) => {
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
        }

        const generateImages = () : void => {

            const fd:FormData = new FormData();

            if(fileBag.length > 0){
                fileBag.forEach((image) => {
                    fd.append('files[]', image, image.name);
                });

                // Show Uploading page
                AppContext.$axios.post('/', fd, {
                    onUploadProgress: (uploadEvent: any) => {
                        let percentage: number = Math.round(uploadEvent.loaded / uploadEvent.total * 100);
                        progress.value = percentage;
                    }
                }).then((res: any) => {
                    if(res.status == 200){
                        // Show last page
                        // Reset Progress
                        progress.value = 0;

                        downloadUrl.value = res.data.download;

                    }
                }).catch((e: any) => {
                    console.log(e);
                });
            }else{
                alert("Please dont upload another type, just images you can upload");
            }
        }

        const uploadFiles = (files: FileList)=> {
            appendImages(files);
            generateImages();

            console.log("Yes this very good");
        }

        const onFileSelected = (e: Event) => {
            const files:FileList = (<FileList>(<HTMLInputElement>e.target).files);
            uploadFiles(files);
        }

        return {
            onClickFileUplopad, 
            onFileSelected, 
            uploading, 
            highlighted,
            onDropped,
            onDragOver,
            onDragLeave,
            fileBag,
            downloadUrl,
            progress
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
