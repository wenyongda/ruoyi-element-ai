<!-- 纵向布局作为基础布局 -->
<script setup lang="ts">
import { useWindowWidthObserver } from '@/hooks/useWindowWidthObserver';
import Aside from '@/layouts/components/Aside/index.vue';
import Header from '@/layouts/components/Header/index.vue';
import Main from '@/layouts/components/Main/index.vue';
import { useDesignStore } from '@/store/modules/design';

const designStore = useDesignStore();

console.log('每次加载全局的折叠状态', designStore.collapseType);

/** 监听窗口大小变化，折叠侧边栏 */
useWindowWidthObserver();
</script>

<template>
  <el-container class="layout-container">
    <el-header class="layout-header">
      <Header />
    </el-header>
    <el-container class="layout-container-main">
      <Transition :class="designStore.pageAnimateType">
        <Aside v-if="!designStore.isCollapse" class="layout-aside transition-all" />
      </Transition>
      <el-main class="layout-main">
        <!-- 路由页面 -->
        <Main />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  width: 100%;
  height: 100%;

  .layout-header {
    padding: 0;
  }

  .layout-aside {
    overflow: hidden;
    width: var(--sidebar-left-container-default-width, 0px);
    height: 100%;
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
  }

  .layout-main {
    padding: 0;
  }

  .layout-container-main {
    margin-left: var(--sidebar-left-container-default-width, 0px);
  }
}

/** 去除菜单右侧边框 */
.el-menu {
  border-right: none;
}

.layout-scrollbar {
  width: 100%;
}
</style>
