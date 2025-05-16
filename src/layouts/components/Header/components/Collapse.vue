<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue';
import { useDesignStore } from '@/store/modules/design';

const designStore = useDesignStore();

/** 切换图标 */
function changeCollapseIcon() {
  // 定义图标切换变量(true-折叠，false-展开)
  // 保存当前用户 手动 意图，并跟新最终的展开状态
  const isFinal = designStore.setCollapseManual(!designStore.isCollapseFinal);
  designStore.setCollapseFinal(isFinal);
}
</script>

<template>
  <div
    class="hover:bg-[rgba(46,50,56,.05)] hover:c-[rgba(0,0,0,0.8)] hover:cursor-pointer p-2px rounded-md flex-center inline-block c-[rgba(0,0,0,0.6)] active:bg-[rgba(46,50,56,.08)] transition-all transition-delay-10"
    @click="changeCollapseIcon"
  >
    <SvgIcon
      v-if="designStore.isCollapseFinal"
      name="ms-left-panel-close-outline"
      size="24"
    />
    <SvgIcon
      v-if="!designStore.isCollapseFinal"
      name="ms-left-panel-open-outline"
      size="24"
    />
  </div>
</template>

<style lang="scss" scoped></style>
