<!-- Header 头部 -->
<script setup lang="ts">
import { SIDE_BAR_WIDTH } from '@/config/index';
import { useUserStore } from '@/store';
import Avatar from './components/Avatar.vue';
import Collapse from './components/Collapse.vue';
import CreateChat from './components/CreateChat.vue';
import LoginBtn from './components/LoginBtn.vue';
import TitleEditing from './components/TitleEditing.vue';

const userStore = useUserStore();
console.log('userStore', userStore.token);

onMounted(() => {
  document.documentElement.style.setProperty(
    `--sidebar-left-container-default-width`,
    `${SIDE_BAR_WIDTH}px`,
  );
});
</script>

<template>
  <div class="header-container">
    <div class="header-box relative z-10 top-0 left-0 right-0">
      <div class="absolute left-0 right-0 top-0 bottom-0 flex items-center flex-row">
        <!-- 左边 -->
        <div class="left-box flex h-full items-center pl-20px gap-12px flex-shrink-0 flex-row">
          <Collapse />
          <CreateChat />
        </div>

        <!-- 中间 -->
        <div class="middle-box flex h-full items-center gap-12px flex-1 pl-12px">
          <div class="w-0.5px h-30px bg-[rgba(217,217,217)]" />
          <TitleEditing />
        </div>

        <!-- 右边 -->
        <div class="right-box flex h-full items-center pr-20px flex-shrink-0 mr-auto flex-row">
          <!-- <Avatar v-if="userStore.token" /> -->
          <!-- <LoginBtn v-else /> -->
          <Avatar />
          <LoginBtn />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-container {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  .header-box {
    height: var(--header-container-default-heigth);
    width: 100%;
    width: calc(
      100% - var(--sidebar-left-container-default-width, 0px) - var(
          --sidebar-right-container-default-width,
          0px
        )
    );
    margin: 0 var(--sidebar-right-container-default-width, 0px) 0
      var(--sidebar-left-container-default-width, 0px);
  }
}
</style>
