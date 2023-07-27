<template>
  <n-layout-sider bordered show-trigger :collapsed="collapsed" @collapse="collapsed = true" @expand="collapsed = false"
    collapse-mode="width" :collapsed-width="64" :native-scrollbar="true" :inverted="inverted" id="sider"
    style="height: 100%;bottom: 0">
    <n-menu ref="menuInstRef" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22"
      :options="menuOptions" style="" :value="active" @update:value="handleUpdateValue" />
  </n-layout-sider>
</template>
<script setup>
import { NMenu } from "naive-ui";
import { NLayoutSider } from "naive-ui";
import { h, ref } from "vue";
import { NIcon } from "naive-ui";

import {
  AlignLeft24Filled,
  BoardHeart24Regular,
  Eye24Filled,
  CommentAdd24Filled,
  AnimalCat24Filled,
  LinkSquare24Filled
} from "@vicons/fluent";

// 手机状态下收缩菜单栏
const collapsed = ref(true);
if (document.body.clientWidth >= 1000) {
  collapsed.value = false;
}

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = [
  {
    path: "/app",
    label: "总览",
    key: "main",
    icon: renderIcon(AlignLeft24Filled),
  },
  {
    label: "留言墙",
    key: "lovewall",
    icon: renderIcon(BoardHeart24Regular),
    children: [
      {
        path: "/msgwall",
        label: "看看墙！",
        key: "msgwall_all",
        icon: renderIcon(Eye24Filled),
      },
      {
        path: "/msgwall/add",
        label: "添加留言",
        key: "msgwall_add",
        icon: renderIcon(CommentAdd24Filled),
      },
    ],
  },
  {
    label: "友情链接",
    key: "lovelinks",
    icon: renderIcon(LinkSquare24Filled),
    children: [
      {
        label: () => h(
          "a",
          {
            href: "https://www.litecat.buzz",
            target: "_blank"
          },
          "LITECAT's BLOG"
        ),
        key: "LiteCatbolg",
        icon: renderIcon(AnimalCat24Filled),
      },
    ]
  }
];

const inverted = false;
</script>
<script>
import router from "../router";

const active = ref("");
const menuInstRef = ref(null);

export const handleUpdateValue = (key, item) => {
active.value = key;
router.push({ path: item.path });
};

export function SetSideBarActiveKey(name) {
active.value = name;
menuInstRef.value.showOption(name);
}
</script>