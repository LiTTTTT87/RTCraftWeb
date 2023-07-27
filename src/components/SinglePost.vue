<script setup>
import { generateFromString } from 'generate-avatar'
import { Timeline24Filled, TimeAndWeather24Filled } from "@vicons/fluent";
import { ref, computed } from 'vue'
const props = defineProps({
    post: Object,
})
const _Post = computed(() => {
    return props.post.Post;
})
const avatar = ref('data:image/svg+xml;utf8,<svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg"><rect id="bg" width="300" height="300" fill="rgb(143,140,161)" /><path d="m 150 611 Q 194 106 -311 150 Q 194 194 150 -311 Q 106 194 611 150 Q 106 106 150 611 z" fill="rgb(167,138,155)" /><path d="m 150 341 Q 197 103 -41 150 Q 197 197 150 -41 Q 103 197 341 150 Q 103 103 150 341 z" fill="rgb(88,117,100)" /><path d="m 150 182 Q 201 99 118 150 Q 201 201 150 118 Q 99 201 182 150 Q 99 99 150 182 z" fill="rgb(112,115,94)" /></svg>')
avatar.value = "data:image/svg+xml;utf8," + generateFromString(props.post.Nickname)

</script>



<template>
    <n-card embedded :bordered="false" :segmented="{
            content: true,
            footer: 'soft'
        }">
        <template #footer>
            <n-h4>{{props.post.Post }}</n-h4>
        </template>
        <template #action>
            <n-space>
                <n-tag>
                    {{ props.post.Nickname }}
                    <template #avatar>
                        <n-avatar round :src="avatar" />
                    </template>
                </n-tag>
                <n-tag type="info" :bordered="true">{{ props.post.tag || '|' }}</n-tag>
                <n-tag>
                    {{ props.post.UID }}
                    <template #icon>
                        <n-icon :component="Timeline24Filled" />
                    </template>
                </n-tag>
                <n-tag>
                    <n-time :time="Math.round(new Date() / 1000)" :to="props.post.Time" type="relative" unix/>
                    <template #icon>
                        <n-icon :component="TimeAndWeather24Filled" />
                    </template>
                </n-tag>
            </n-space>
        </template>
    </n-card>
</template>

<style>
.n-tag {
    margin-top: 10px;
}
</style>