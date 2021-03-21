<template>
    <div>
        <div class="howtouse">
            <h2>Getting Started With Image LaraHolder Generator</h2>
            <p>This application is primarily designed to simplify the work of creating dummy images during projects. Here is how you can begin using this tool:</p>

            <p>Since this image generator tool is built conferring a powerful interface, hence it ultimately reduces the time and efforts required to complete the tasks.</p>

            <p>
                You will be given two options “Drag & Drop” and “Browse” on the screen. Using the drag & drop feature, you can simply drag the picture from the destination file and drop it in the box specified. While on clicking the browse button, a specific dialog box would open giving you the options to pick the relevant image format.
                <b>Note: the supported image formats are .JPEG, .JPG, .PNG & .GIF extensions.</b>
            </p>
            <p>
                Once you have selected the file, the tool will automatically start uploading the placeholder image simultaneously. Soon after the process ends, you will be asked to download the developed file in a Zip format. The generated file remains available on the server to download for next 8 hours. Continue the process for creating any number of placeholder images.
                <b>Note: You can choose one or more image files while creating dummy picture for your site.</b>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref} from '@vue/composition-api';

export default defineComponent({
    setup(){
        return {};
    }
});
</script>

<style lang="postcss" scoped>
    .howtouse{
        @apply text-placeholder-light;

        > h2{
            @apply font-nunito text-3xl text-white;
        }

        > p{
            @apply my-5;

            > b{
                @apply block text-white font-bold my-3;
            }
        }
    }
</style>