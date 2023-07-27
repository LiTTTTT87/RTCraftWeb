<<<<<<< HEAD
<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
=======
<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme-overrides="{ common: { fontWeightStrong: '500' } }">
    <n-loading-bar-provider>
      <n-message-provider>
        <n-dialog-provider>
          <basic />
          <navbar></navbar>
        </n-dialog-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup>
import navbar from '../src/components/Narbar.vue';
import basic from './view/basic.vue'
import { zhCN, dateZhCN } from 'naive-ui'
</script>
>>>>>>> 9ca12173c616f1bee61b26b7fe91f67afee72ee2
