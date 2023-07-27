<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <n-layout>
    <n-layout has-sider>
      <n-layout-sider content-style="padding: 10px;">
        <n-space justify="space-between">
          <n-badge value="198+"><n-avatar round size="large" src="/vite.svg" /></n-badge>
          <n-gradient-text size="25" class="sitename" :gradient="{
            from: 'rgb(63, 105, 166)',
            to: 'rgb(165, 135, 180)'
          }">
            王宇航的夏日幻想
          </n-gradient-text>
        </n-space>
      </n-layout-sider>
      <n-layout-content content-style="padding: 10px;">
        <n-space justify="space-around">
          <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
          <n-button strong secondary @click="OpenDrawer" v-if="havetoken()">
            <template #icon>
              <n-icon>
                <PeopleSettings24Filled />
              </n-icon>
            </template>
            用户信息
          </n-button>
        </n-space>
      </n-layout-content>

    </n-layout>
    <n-layout has-sider style="height: calc(100vh - 83px);bottom: -30">
      <SideBar v-if="ShowSideBar" />
      <n-layout :native-scrollbar="false">
        <div style="margin-right: 15px; margin-left: 15px">
          <router-view :key="router.currentRoute" v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
        <div style="margin-top: 25px;">
          <div style="text-align: center;">
            <a style="text-align: center;">2023 © LITECAT</a>
          </div>
        </div>
      </n-layout>
    </n-layout>
  </n-layout>
  <n-drawer v-model:show="active" :width="400" :height="600" :placement="placement" :native-scrollbar="true">
    <n-drawer-content title="用户信息">

      <n-space justify="space-around" size="large">
        <n-avatar round :size="90" :src="avatar" />
        <n-space justify="space-around" size="medium">
          <n-row>
            <n-col :span="20">
              <n-statistic label="用户名" :value="userdata.user">
                <template #prefix>
                  <n-icon>
                    <ArchiveMultiple24Filled />
                  </n-icon>
                </template>
              </n-statistic>
            </n-col>
          </n-row>
          <n-row>
            <n-col :span="25">
              <n-statistic label="昵称">
                <template #prefix>
                  <n-icon>
                    <Person24Filled />
                  </n-icon>
                </template>
                <template #suffix>
                  <template v-if="_doevent">
                    <n-input-group>
                      <n-input :style="{ width: '50%' }" v-model:value="doevent_new" />
                      <n-button dashed @click="doevent('3')">
                        确认
                      </n-button>
                      <n-button dashed circle @click="doevent('2')">
                        <template #icon>
                          <n-icon>
                            <Close />
                          </n-icon>
                        </template>
                      </n-button>
                    </n-input-group>
                  </template>
                  <template v-else>
                    <n-space justify="center">
                      {{ doevent_new }}
                      <n-button tertiary circle @click="doevent('1')">
                        <template #icon>
                          <n-icon>
                            <Rename24Filled />
                          </n-icon>
                        </template>
                      </n-button>
                    </n-space>
                  </template>
                </template>
              </n-statistic>
            </n-col>
          </n-row>
          <n-row>
            <n-col :span="25">
              <n-statistic label="用户编号" :value="userdata.uid">
                <template #prefix>
                  <n-icon>
                    <NumberSymbolSquare24Filled />
                  </n-icon>
                </template>
              </n-statistic>
            </n-col>
          </n-row>
        </n-space>
      </n-space>
      <n-button type="success" @click="doevent('4')" ghost v-if="havetoken()">
        <template #icon>
          <n-icon>
            <LogInOutline />
          </n-icon>
        </template>
        退出登录
      </n-button>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { h, ref } from "vue";
import { NIcon } from "naive-ui";
import { ArrowCounterclockwise24Regular, PeopleSettings24Filled, Rename24Filled, NumberSymbolSquare24Filled, ArchiveMultiple24Filled, Person24Filled } from "@vicons/fluent";
import { Close, LogInOutline } from "@vicons/ionicons5";
import { generateFromString } from 'generate-avatar'
import { editnickname, dologinout, havetoken } from '../utils/oauth';
import router from "../router";
import SideBar from "./sidebar.vue";

const avatar = ref('data:image/svg+xml;utf8,<svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg"><rect id="bg" width="300" height="300" fill="rgb(143,140,161)" /><path d="m 150 611 Q 194 106 -311 150 Q 194 194 150 -311 Q 106 194 611 150 Q 106 106 150 611 z" fill="rgb(167,138,155)" /><path d="m 150 341 Q 197 103 -41 150 Q 197 197 150 -41 Q 103 197 341 150 Q 103 103 150 341 z" fill="rgb(88,117,100)" /><path d="m 150 182 Q 201 99 118 150 Q 201 201 150 118 Q 99 201 182 150 Q 99 99 150 182 z" fill="rgb(112,115,94)" /></svg>')
const _doevent = ref(false)
const doevent_new = ref(sessionStorage.getItem("nickname"))
const userdata = ref({
  "user": sessionStorage.getItem("user"),
  "uid": sessionStorage.getItem("uid"),
  "nickname": sessionStorage.getItem("nickname")
})
function doevent(step) {
  if (sessionStorage.getItem("token") != null) {
    if (step == "1") {
      userdata.value.nickname = sessionStorage.getItem("nickname")
      _doevent.value = true
    }
    if (step == "2") {
      userdata.value.nickname = sessionStorage.getItem("nickname")
      _doevent.value = false
    }
    if (step == "3") {
      _doevent.value = false
      editnickname(userdata.value.user, sessionStorage.getItem("token"), doevent_new.value)
      userdata.value.nickname = sessionStorage.getItem("nickname")
    }
    if (step == "4") {
      active.value = false;
      dologinout(userdata.value.user, sessionStorage.getItem('token'))
    }
  }
}
function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
function OpenDrawer() {
  avatar.value = "data:image/svg+xml;utf8," + generateFromString(sessionStorage.getItem("user"))
  active.value = true;
}
const key = router.path + Math.random();
const active = ref(false); //是否打开抽屉
const placement = ref("right"); //打开位置
const menuOptions = [
  {
    label: () => h(
      "a",
      {
        href: "javascript:location.reload();",
        rel: "home"
      },
      "卡了刷新"
    ),
    key: "hear-the-wind-sing",
    icon: renderIcon(ArrowCounterclockwise24Regular)
  }
];
const activeKey = ref(null)
// 手机状态下收缩菜单栏
const collapsed = ref(true);
if (document.body.clientWidth >= 1000) {
  collapsed.value = false;
}
</script>
<script>
export const ShowSideBar = ref(true);
export function ChangeShowSideBar_Main(is_show) {
  ShowSideBar.value = is_show;
}
export const ShowLoginOutBtn = ref(false);
export function ChangeShowLoginOutbtn(is_show) {
  ShowLoginOutBtn.value = is_show;
}
</script>


<style scoped>
/* 
enter-active 定义进入过渡的结束状态
leave-active 定义离开过渡的结束状态
 */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.31s;
}

/* 
enter定义进入过渡的开始状态
 */
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

/* 
leave-to离场动画结束后的状态
 */
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
<style>
.github-corner:hover .octo-arm {
  animation: octocat-wave 560ms ease-in-out
}


n-menu {
  justify-content: center;
}

.n-layout-header,
.n-layout-footer {
  background: rgba(255, 255, 255, 0.2);
  padding: 24px;
}

.n-layout-sider {
  background: rgba(255, 255, 255, 0.4);
}

.n-layout-content {
  background: rgba(255, 255, 255, 0.4);
}

n-gradient-text {
  max-width: 100%;
  max-height: 100%;
}

.sitename {
  /* align-items: center; */
  display: flex;
  /* padding: -20px; */
}
</style>
