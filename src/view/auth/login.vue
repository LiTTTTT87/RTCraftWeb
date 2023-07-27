<template>
    <n-space justify="center">
        <n-card title=" " class="_cord">
            <img src="/login.png" alt="login_png" class="_pic">
            <template #footer>
                <n-space vertical>
                    <n-avatar round :size="48" :src="avatar" />
                    <!-- <n-avatar round :size="48">
                        {{ user }}
                    </n-avatar>-->
                    <n-space justify="center">
                        <n-tag :bordered="false">
                            用户名
                            <template #icon>
                                <n-icon :component="CaretRight24Filled" />
                            </template>
                        </n-tag>
                        <n-input type="text" placeholder="用户名" v-model:value="user" @change="updateacatar" />
                    </n-space>
                    <n-space justify="center">
                        <n-tag :bordered="false">
                            密码
                            <template #icon>
                                <n-icon :component="CaretRight24Filled" />
                            </template>
                        </n-tag>
                        <n-input type="password" show-password-on="click" placeholder="密码" v-model:value="password" />
                    </n-space>
                </n-space>
            </template>
            <template #action>
                <n-space justify="space-around" size="large">
                    <n-button-group>
                        <n-button ghost type="primary" size="large" :onclick="login">
                            <template #icon>
                                <n-icon>
                                    <ChevronCircleRight24Filled />
                                </n-icon>
                            </template>
                            登录
                        </n-button>
                        <router-link to="/">
                            <n-button type="default" size="large">
                                <template #icon>
                                    <n-icon :component="ReturnDownBack"></n-icon>
                                </template>
                                返回
                            </n-button></router-link>
                    </n-button-group>
                </n-space>
                <br>
                『期待一下~(☆▽☆)』
            </template>
        </n-card>
    </n-space>
</template>
<script setup>
import { CaretRight24Filled, ChevronCircleRight24Filled } from "@vicons/fluent";
import { ref } from 'vue';
import { dologin } from "../../utils/oauth";
import { generateFromString } from 'generate-avatar'
import { ReturnDownBack } from '@vicons/ionicons5'
const user = ref("")
const password = ref("")
const avatar = ref('data:image/svg+xml;utf8,<svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg"><rect id="bg" width="300" height="300" fill="rgb(143,140,161)" /><path d="m 150 611 Q 194 106 -311 150 Q 194 194 150 -311 Q 106 194 611 150 Q 106 106 150 611 z" fill="rgb(167,138,155)" /><path d="m 150 341 Q 197 103 -41 150 Q 197 197 150 -41 Q 103 197 341 150 Q 103 103 150 341 z" fill="rgb(88,117,100)" /><path d="m 150 182 Q 201 99 118 150 Q 201 201 150 118 Q 99 201 182 150 Q 99 99 150 182 z" fill="rgb(112,115,94)" /></svg>')
function updateacatar() {
    avatar.value = "data:image/svg+xml;utf8," + generateFromString(user.value)
}
function login() {
    dologin(user.value, password.value)

}
</script>
<style>
._cord {
    margin-top: 50px;
    position: relative;
    width: 100%;
    max-width: 100%;
    height: auto;
}

._pic {
    max-width: 100%;
    height: auto;
}

.n-layout-scroll-container {
    text-align: center;
}
</style>