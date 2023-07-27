<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { darkTheme } from "naive-ui";
import SinglePost from "../components/SinglePost.vue"
import { Qq } from '@vicons/fa';
// defineComponent({
//   darkTheme
// });
const props = defineProps({
  post: Array,
});
// onMounted(() => {

//   message.success("加载完成")
// });
// onUnmounted(() => {
//   message.warning("已卸载")
// });
// onUpdated(() => {
//   message.loading("已更新");
// });
</script>

<template>
  <div v-for="item in post" :key="item.UID">
    <SinglePost :post="item" />
    <br>
  </div>
</template>
<style>
.link {
  color: rgb(79, 194, 222);
}
</style>