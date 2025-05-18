<!-- Aside 侧边栏 -->
<script setup lang="ts">
import logo from '@/assets/images/logo.png';
import Collapse from '@/layouts/components/Header/components/Collapse.vue';

/* 创建会话 开始 */
function handleCreatChat() {
  console.log('创建新会话');
}
/* 创建会话 结束 */

/* 会话组件 开始 */
const active = ref();
const conversationsList = ref([]);

function handleChange() {
  console.log('点击了会话');
}
/* 会话组件 结束 */
</script>

<template>
  <div class="aside-container">
    <div class="aside-wrapper">
      <div class="aside-header">
        <div class="flex items-center gap-8px hover:cursor-pointer" @click="handleCreatChat">
          <el-image :src="logo" alt="logo" fit="cover" class="logo-img" />
          <span class="logo-text max-w-150px text-overflow">Elemennt-Plus-X</span>
        </div>
        <Collapse class="ml-auto" />
      </div>

      <div class="creat-chat-btn-wrapper">
        <div class="creat-chat-btn" @click="handleCreatChat">
          <el-icon class="add-icon">
            <Plus />
          </el-icon>
          <span class="creat-chat-text">新对话</span>
          <SvgIcon name="ctrl+k" size="37" />
        </div>
      </div>

      <div class="aside-body">
        <div v-if="conversationsList.length > 0" class="flex h-full">
          <Conversations
            :active="active"
            :items="conversationsList"
            row-key="id"
            label-key="sessionTitle"
            @change="handleChange"
          />
        </div>

        <el-empty v-else class="h-full flex-center" description="暂无对话记录" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.aside-container {
  height: 100%;
  position: relative;
  user-select: none;
  box-sizing: border-box;
  background-color: var(--sidebar-background-color);
  border-right: 1px solid rgba(0, 0, 0, 0.08);

  .aside-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;

    .aside-header {
      height: 36px;
      margin: 10px 12px 0px;
      display: flex;
      align-items: center;

      .logo-img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background-color: #fff;
        overflow: hidden;
        box-sizing: border-box;
        padding: 4px;

        img {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .logo-text {
        font-size: 16px;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 700;
        transform: skewX(-2deg);
      }
    }

    .creat-chat-btn-wrapper {
      padding: 0 12px;

      .creat-chat-btn {
        display: flex;
        align-items: center;
        padding: 8px 6px;
        margin-top: 16px;
        margin-bottom: 6px;
        color: #0057ff;
        background-color: rgba(0, 87, 255, 0.06);
        border-radius: 12px;
        border: 1px solid rgba(0, 102, 255, 0.15);
        cursor: pointer;
        gap: 6px;

        &:hover {
          background-color: rgba(0, 87, 255, 0.12);
        }

        .creat-chat-text {
          font-size: 14px;
          font-weight: 700;
          line-height: 22px;
        }

        .add-icon {
          font-size: 16px;
          width: 24px;
          height: 24px;
        }

        .svg-icon {
          margin-left: auto;
          height: 24px;
          color: rgba(0, 87, 255, 0.3);
        }
      }
    }

    .aside-body {
      display: flex;
      flex-direction: column;
      height: 100%;
      flex: 1;
      min-height: 0;
    }
  }
}
</style>
