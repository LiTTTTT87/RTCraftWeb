<script setup>
import { ref } from 'vue';
import COPY from "../components/copy.vue";
import { dologin, editnickname } from "../utils/oauth";
const cardcols = ref(2)
if (document.body.clientWidth >= 1000) {
    //手机端
    cardcols.value = 4;
}
</script>

<template>
    <n-grid :x-gap="12" :y-gap="8" :cols="cardcols">
        <n-grid-item>
            <router-link to="/msgwall">
            <n-card title="留言墙">
                <template #cover>
                    <n-image width="100" src="/pic/Yhnj6FIYsOMK8g8TBE1fu.png" preview-disabled />
                </template>
                将 · 你 · 的 · 留 · 言 · 送 · 往 · 云 · 间
            </n-card>
        </router-link>
        </n-grid-item>
        <n-grid-item>
            <router-link to="">
            <n-card title="尽情期待">
                <template #cover>
                    <n-image width="100" src="/pic/WBaJMR3WI38blYXeUEq1T.png" preview-disabled />
                </template>
                在 · 做 · 了 · 在 · 做 · 了 ， 咕 · 咕 · 咕
            </n-card>
        </router-link>
        </n-grid-item>
    </n-grid>
</template>

