<!-- 侧边栏折叠按钮 -->
<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue';
import { SIDE_BAR_WIDTH } from '@/config/index';
import { useCollapseToggle } from '@/hooks/useCollapseToggle';
import { useDesignStore } from '@/store/modules/design';

const { changeCollapse } = useCollapseToggle();
const designStore = useDesignStore();

function handleChangeCollapse() {
  changeCollapse();
  if (!designStore.isCollapse) {
    document.documentElement.style.setProperty(
      `--sidebar-left-container-default-width`,
      `${SIDE_BAR_WIDTH}px`,
    );
  }
  else {
    document.documentElement.style.setProperty(`--sidebar-left-container-default-width`, ``);
  }
}
</script>

<template>
  <div class="collapse-container btn-icon-btn" @click="handleChangeCollapse">
    <SvgIcon v-if="!designStore.isCollapse" name="ms-left-panel-close-outline" size="24" />
    <SvgIcon v-if="designStore.isCollapse" name="ms-left-panel-open-outline" size="24" />
  </div>
</template>

<style lang="scss" scoped>
// .collapse-container {
// }
</style>
