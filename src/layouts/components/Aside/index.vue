<!-- Aside 侧边栏 -->
<script setup lang="ts">
import type { GroupableOptions } from 'vue-element-plus-x/types/Conversations';
import { useRoute } from 'vue-router';
import logo from '@/assets/images/logo.png';
import Collapse from '@/layouts/components/Header/components/Collapse.vue';
import { useDesignStore } from '@/store';
import { useChatStore } from '@/store/modules/chat';

const route = useRoute();
const chatStore = useChatStore();
const designStore = useDesignStore();

const chatId = computed(() => Number(route.params?.id));
const conversationsList = computed(() => chatStore.chatMap[chatId.value] ?? []);

/* 创建会话 开始 */
function handleCreatChat() {
  console.log('创建新会话');
}
/* 创建会话 结束 */

/* 会话组件 开始 */
const active = ref('m1');

// 自定义分组选项
const customGroupOptions: GroupableOptions = {
  // 自定义分组排序，学习 > 工作 > 个人 > 未分组
  sort: (a: any, b: any) => {
    const order: Record<string, number> = { 学习: 0, 工作: 1, 个人: 2, 未分组: 3 };
    const orderA = order[a] !== undefined ? order[a] : 999;
    const orderB = order[b] !== undefined ? order[b] : 999;
    return orderA - orderB;
  },
};

function handleChange() {
  console.log('点击了会话');
}
/* 会话组件 结束 */
</script>

<template>
  <div
    class="aside-container"
    :class="{
      'aside-container-suspended': designStore.isSafeAreaHover,
      'aside-container-collapse': designStore.isCollapse,
      // 折叠且未激活悬停时添加 no-delay 类
      'no-delay': designStore.isCollapse && !designStore.hasActivatedHover,
    }"
  >
    <div class="aside-wrapper">
      <div v-if="!designStore.isCollapse" class="aside-header">
        <div class="flex items-center gap-8px hover:cursor-pointer" @click="handleCreatChat">
          <el-image :src="logo" alt="logo" fit="cover" class="logo-img" />
          <span class="logo-text max-w-150px text-overflow">Elemennt-Plus-X</span>
        </div>
        <Collapse class="ml-auto" />
      </div>

      <div class="aside-body">
        <div class="creat-chat-btn-wrapper">
          <div class="creat-chat-btn" @click="handleCreatChat">
            <el-icon class="add-icon">
              <Plus />
            </el-icon>
            <span class="creat-chat-text">新对话</span>
            <SvgIcon name="ctrl+k" size="37" />
          </div>
        </div>

        <div class="aside-content">
          <div v-if="conversationsList.length > 0" class="conversations-wrap overflow-hidden">
            <Conversations
              v-model:active="active"
              :items="conversationsList"
              :label-max-width="200"
              :show-tooltip="true"
              :tooltip-offset="35"
              show-built-in-menu
              :groupable="customGroupOptions"
              row-key="key"
              @change="handleChange"
            />
          </div>

          <el-empty v-else class="h-full flex-center" description="暂无对话记录" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// 基础样式
.aside-container {
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;
  width: var(--sidebar-default-width);
  pointer-events: auto;
  background-color: var(--sidebar-background-color);
  border-right: 0.5px solid var(--s-color-border-tertiary, rgba(0, 0, 0, 0.08));
  z-index: 11;

  .aside-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;

    // 侧边栏头部样式
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

    // 侧边栏内容样式
    .aside-body {
      .creat-chat-btn-wrapper {
        padding: 0 12px;

        .creat-chat-btn {
          display: flex;
          align-items: center;
          padding: 8px 6px;
          margin-top: 16px;
          margin-bottom: 6px;
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

      .aside-content {
        display: flex;
        flex-direction: column;
        height: 100%;
        flex: 1;
        min-height: 0;

        // 会话列表高度-基础样式
        .conversations-wrap {
          height: calc(100vh - 110px);
        }
      }
    }
  }
}

// 折叠样式
.aside-container-collapse {
  position: absolute;
  opacity: 0;
  // 向左偏移一个宽度
  transform: translateX(-100%);
  top: 54px;
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow:
    0px 10px 20px 0px rgba(0, 0, 0, 0.1),
    0px 0px 1px 0px rgba(0, 0, 0, 0.15);
  height: auto;
  z-index: 22;
  overflow: hidden;
  max-height: calc(100% - 110px);
  padding-bottom: 12px;

  // 指定样式过渡
  transition-property: opacity, transform;
  transition-duration: 0.3s, 0.3s;
  transition-timing-function: ease, ease;
  transition-delay: 0.3s, 0.3s;

  /* 新增：未激活悬停时覆盖延迟 */
  &.no-delay {
    transition-delay: 0s, 0s;
  }

  /* 禁用悬停事件 */
  pointer-events: none;

  &:hover,
  &.aside-container-suspended {
    pointer-events: auto;
    /* 悬停激活后恢复事件响应 */
  }
}

// 悬停样式
.aside-container-collapse:hover,
.aside-container-collapse.aside-container-suspended {
  // 直接在这里写悬停时的样式（与 aside-container-suspended 一致）
  opacity: 1;
  transform: translateX(15px);
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow:
    0px 10px 20px 0px rgba(0, 0, 0, 0.1),
    0px 0px 1px 0px rgba(0, 0, 0, 0.15);
  height: auto;
  overflow: hidden;
  max-height: calc(100% - 110px);
  padding-bottom: 12px;

  // 过渡动画沿用原有设置
  transition-property: opacity, transform;
  transition-duration: 0.3s, 0.3s;
  transition-timing-function: ease, ease;
  transition-delay: 0s, 0s;

  // 会话列表高度-悬停样式
  .conversations-wrap {
    height: calc(100vh - 155px) !important;
  }
}

// 样式穿透
:deep() {
  // 会话列表背景色
  .conversations-list {
    background-color: transparent !important;
  }

  // 群组标题样式 和 侧边栏菜单背景色一致
  .conversation-group-title {
    background-color: var(--sidebar-background-color) !important;
  }
}
</style>
