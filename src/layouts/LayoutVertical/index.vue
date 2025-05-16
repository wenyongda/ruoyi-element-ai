<!-- 纵向布局作为基础布局 -->
<script setup lang="ts">
import { useWindowWidthObserver } from '@/hooks/useWindowWidthObserver';
import Aside from '@/layouts/components/Aside/index.vue';
import Header from '@/layouts/components/Header/index.vue';
import Main from '@/layouts/components/Main/index.vue';

import { useDesignStore } from '@/store/modules/design';

const designStore = useDesignStore();

// 动态绑定左侧菜单animate动画
const menuAnimate = computed(() => designStore.pageAnimateType);
const menuCollapseFinal = computed(() => designStore.isCollapseFinal);

console.log('menuAnimate===>', menuAnimate);
console.log('menuCollapseFinal===>', menuCollapseFinal);

watch([menuCollapseFinal, menuAnimate], (newValue, oldValue) => {
  console.log('newValue', newValue);
  console.log('oldValue', oldValue);
});

/** 监听窗口大小变化，折叠侧边栏 */
useWindowWidthObserver();
</script>

<template>
  <el-container class="layout-container">
    <el-aside
      v-if="menuCollapseFinal"
      class="layout-aside transition-all"
      :class="menuAnimate"
    >
      <el-scrollbar class="layout-scrollbar">
        <Aside />
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header class="layout-header">
        <Header />
      </el-header>
      <!-- 路由页面 -->
      <Main />
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  width: 100vw;
  height: 100vh;
  .layout-aside {
    // z-index: $layout-aside-z-index; // 左侧菜单层级
    // padding-right: $aside-menu-padding-right; // 左侧布局右边距[用于悬浮和选择更明显]
    // padding-left: $aside-menu-padding-left; // 左侧布局左边距[用于悬浮和选择更明显]
    background-color: var(--el-menu-bg-color);
    border-right: none;
    // box-shadow: $aside-menu-box-shadow; // 左侧布局右边框阴影
  }
  .layout-header {
    // height: $aside-header-height;
    background-color: var(--el-header-bg-color);
  }
}

/** 去除菜单右侧边框 */
.el-menu {
  border-right: none;
}
.layout-scrollbar {
  width: 100%;
  // height: calc(100vh - $aside-header-height);
}
</style>
