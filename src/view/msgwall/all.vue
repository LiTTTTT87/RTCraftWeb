<script setup>
import postlist from '../../components/postlist.vue';
import { ref } from 'vue';
import axios from 'axios';
import { SendInfoMessage, SendErrorMessage, SendWarningMessage, SendSuccessMessage } from '../../utils/message.js'
var baseurl = import.meta.env.VITE_V1_API
const showModal = ref(false);
const showPost = ref(false);
const showStep = ref(false);
const timeout = ref(6e3);
const _postlist = ref();
const _astatus = ref()
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
    getmessage()
    getstatus(sessionStorage.getItem("user"), sessionStorage.getItem("token"))
    showModal.value = false;
    sessionStorage.setItem('ihaveseentherule', "true")
}
const getmessage = async () => {
    try {
        //http://127.0.0.1:5000/app/lovewall/get
        var url = baseurl + "/app/lovewall/get"
        var body_json = JSON.stringify({
            "user": sessionStorage.getItem('user'),
            "token": sessionStorage.getItem('token')
        });
        var Headers = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let data = await axios.post(url, body_json, Headers)
        _postlist.value = data.data
        showPost.value = true


    } catch (error) {
        console.error(error.code)
        SendErrorMessage(error.code)
        _postlist.value = [{ "Fid": -1, "Nickname": "万墙之主——墙长", "Post": "亲爱的云，当你看到这篇帖子的时候就证明墙的后端炸了\n你可以尝试联系我们让我们修复\n邮箱：littttt87@hotmail.com", "tag": "炸了", "Time": "1609291836" }]
        showPost.value = true
    }
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
        showStep.value = true

    } catch (error) {
        console.error(error.code)
        SendErrorMessage(error.code)
        _astatus.value = { "next_action": "LoveWallGSD-BOMB!", "now_action": "LoveWallGSD-BOMB!" }

    }
}
if (sessionStorage.getItem('ihaveseentherule')) {
    ihavebeenseentherule()
} else {
    handleClick()
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
                欢迎来到留言墙！
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
        </n-alert><br>
        <n-alert title="关于发布延迟问题" type="info">
            ● 为了防止服务器处理数据导致宕机我们使用了延迟更新的的方案，<br>每10分钟进行一次数据更新(特殊情况延时)，下方为当前数据进度
            <n-space vertical>
                <n-steps vertical :current="2" v-if="showStep">
                    <n-step :title="_astatus.now_action">
                        <div class="n-step-description">
                            <p>当前展示的数据编号</p>
                        </div>
                    </n-step>
                    <n-step :title="_astatus.next_action">
                        <div class="n-step-description">
                            <p>数据正在编制中···</p>
                        </div>
                    </n-step>
                </n-steps>
            </n-space>
            <br><router-link to="/msgwall/add">
                <n-button strong secondary type="success">
                    去留言
                </n-button></router-link>
        </n-alert>
    </n-card>
    <br>
    <postlist v-if="showPost" :post="_postlist"></postlist>
</template>