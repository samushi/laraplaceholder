<template>
    <div class="uploading">
        <h2>Uploading & Creating</h2>
        <div class="progressing">
            <div ref="percentage" class="percentage" :style="{ width: progress + '%' }"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
    setup() {
        const progress = ref<Number>(0)

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
