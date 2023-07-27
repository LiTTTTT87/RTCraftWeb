<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { generateFromString } from 'generate-avatar'
import { Timeline24Filled, TimeAndWeather24Filled } from "@vicons/fluent";
import { addmessage } from '../../utils/lovewall.js';
import { SendInfoMessage, SendErrorMessage, SendWarningMessage, SendSuccessMessage } from '../../utils/message.js'
var baseurl = import.meta.env.VITE_V1_API
const showModal = ref(false);
const timeout = ref(6e3);
const nickname = ref(sessionStorage.getItem("nickname"))
const _astatus = ref()
const post = ref("")
const avatar = ref('data:image/svg+xml;utf8,<svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg"><rect id="bg" width="300" height="300" fill="rgb(143,140,161)" /><path d="m 150 611 Q 194 106 -311 150 Q 194 194 150 -311 Q 106 194 611 150 Q 106 106 150 611 z" fill="rgb(167,138,155)" /><path d="m 150 341 Q 197 103 -41 150 Q 197 197 150 -41 Q 103 197 341 150 Q 103 103 150 341 z" fill="rgb(88,117,100)" /><path d="m 150 182 Q 201 99 118 150 Q 201 201 150 118 Q 99 201 182 150 Q 99 99 150 182 z" fill="rgb(112,115,94)" /></svg>')
avatar.value = "data:image/svg+xml;utf8," + generateFromString(sessionStorage.getItem("user"))
function countdown() {
    if (!(timeout.value <= 0)) {
        timeout.value -= 1e3;
        setTimeout(countdown, 1e3);
    }
}
function handleClick() {
    showModal.value = true;
    timeout.value = 6e3;
    countdown();
}
function ihavebeenseentherule() {
    showModal.value = false;
    sessionStorage.setItem('ihaveseentherule', "true")
}
if (sessionStorage.getItem('ihaveseentherule')) {
    ihavebeenseentherule()
} else {
    handleClick()
}
const getstatus = async (user, token) => {
    try {
        //http://127.0.0.1:5000/app/lovewall/status
        var url = baseurl + "/app/lovewall/status"
        var body_json = JSON.stringify({
            "user": user,
            "token": token
        });
        var Headers = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let data = await axios.post(url, body_json, Headers)
        _astatus.value = data.data

    } catch (error) {
        console.error(error.code)
        SendErrorMessage(error.code)
        return ('{"next_action": "LoveWallGSD-BOMB!","now_action": "LoveWallGSD-BOMB!"}')

    }
}
getstatus(sessionStorage.getItem("user"), sessionStorage.getItem("token"))
function _addmessage() {
    addmessage(sessionStorage.getItem("user"), sessionStorage.getItem("token"), post.value)
    post.value = ""
}
</script>
<template>
    <n-modal :show="showModal">
        <n-card style="width: 600px" title="留言墙墙规" size="huge" :bordered="false" role="dialog" aria-modal="true">
            <n-scrollbar style="max-height: 120px" trigger="none">
                一、禁止发布违禁信息<br>
                1. 严禁发布违禁品、毒品、管制刀具、赌博、假证假票据、售卖考试答案、 售卖个人信息相关的违法信息。<br>
                二、禁止发布色情低俗<br>
                1.严禁发布色情交易、不正当交友信息。<br>
                2.严禁发布表示对未满14周岁儿童产生性幻想、性冲动的内容。<br>
                三、禁止不友善言论<br>
                1.严禁以不文明语言对他人进行攻击、 谩骂，或者进行负面评价。<br>
                2.严禁攻击、抹黑与自身文化不同的地域、民族、国家。<br>
                四、禁止发布他人隐私信息<br>
                1. 禁止发布他人姓名、住址、联系方式、位置等个人隐私。<br>
                2. 禁止使用他人的姓名等个人隐私作为个人昵称，造成任何不当后果将由发布墙的人承担。<br>
                五、禁止破坏本网站<br>
                1. 严谨通过各种手段破坏、阻止、延缓本网站正常运行。<br>
                2. 严禁不以正常发墙为目的，恶意反复砸墙导致网站瘫痪的行为。<br>
            </n-scrollbar>
            <template v-if="!(timeout <= 0)">
                距离确认按钮出现还剩 {{ timeout / 1000 }} 秒
                <n-progress type="line" status="success" :percentage="(5000 - timeout) / 50" :show-indicator="false" />
            </template>
            <template v-else>
                <br>
                <n-checkbox @click="ihavebeenseentherule">
                    我已阅读并将遵循「墙规」的规则
                </n-checkbox>
            </template>
        </n-card>
    </n-modal>
    <n-card>
        <n-h1 prefix="bar" align-text type="info">
            <n-text type="info">
                欢迎来到「留言」墙！
            </n-text>
        </n-h1>
        <n-alert title="墙规——简版" type="warning">
            1. 本墙禁止发布任何关于色情、暴力、血腥、敏感、违法的内容<br>
            2. 禁止发布违禁信息<br>
            3. 禁止不友善言论<br>
            4. 禁止发布他人隐私信息<br>
            <n-button @click="handleClick">
                详细墙规
            </n-button>
        </n-alert>
    </n-card>
    <br>
    <n-card embedded :bordered="false" :segmented="{
            content: true,
            footer: 'soft'
        }">
        <template #footer>
            <n-input type="textarea" v-model:value="post" placeholder="说你想对墙说的话吧~" maxlength="300" show-count :autosize="{
                    minRows: 3
                }" />
        </template>
        <template #action>
            <n-alert type="info" :show-icon="false">下方数据仅供参考，实际以发布时间为准</n-alert><br>
            <n-space>
                <n-tag>
                    {{ nickname }}
                    <template #avatar>
                        <n-avatar round :src="avatar" />
                    </template>
                </n-tag>
                <n-tag type="info" :bordered="true">|</n-tag>
                <n-tag>
                    #楼层(将在发布后可见)
                    <template #icon>
                        <n-icon :component="Timeline24Filled" />
                    </template>
                </n-tag>
                <n-tag>
                    <n-time :time="Math.round(new Date() / 1000)" format="yyyy年MM月dd日 hh时mm分ss秒" unix />
                    <template #icon>
                        <n-icon :component="TimeAndWeather24Filled" />
                    </template>
                </n-tag>
            </n-space>
            <br>
            <n-popconfirm :negative-text="null" @positive-click="_addmessage()">
                <template #trigger>
                    <n-button strong secondary type="success">
                        提交
                    </n-button>
                </template>
                预计将在<n-gradient-text type="danger">
                    {{ _astatus.next_action }}
                </n-gradient-text>中展示
            </n-popconfirm>

        </template>
    </n-card>
</template>