<!-- Main -->
<script setup lang="ts">
import { useDesignStore } from '@/store';
import { useKeepAliveStore } from '@/store/modules/keepAlive';

const designStore = useDesignStore();
const keepAliveStore = useKeepAliveStore();

// 刷新当前路由页面缓存方法
const isRouterShow = ref(true);
const refreshMainPage = (val: boolean) => (isRouterShow.value = val);
provide('refresh', refreshMainPage);
</script>

<template>
  <el-main class="layout-main">
    <router-view v-slot="{ Component, route }">
      <transition :name="designStore.pageAnimateType" mode="out-in" appear>
        <keep-alive :max="16" :include="keepAliveStore.keepAliveName">
          <component :is="Component" v-if="isRouterShow" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
</template>

<style scoped lang="scss"></style>
