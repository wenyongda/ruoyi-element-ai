<!-- 标题编辑 -->
<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue';

function handleClickTitle() {
  ElMessageBox.prompt('', '编辑对话名称', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputErrorMessage: '请输入对话名称',
    inputValidator: (value) => {
      if (!value) {
        return false;
      }
      return true;
    },
  })
    .then(({ value }) => {
      ElMessage({
        type: 'success',
        message: `修改成功:${value}`,
      });
    })
    .catch(() => {
      // ElMessage({
      //   type: 'info',
      //   message: '取消修改',
      // });
    });
}
</script>

<template>
  <div
    class="title-editing-container hover:bg-[rgba(0,0,0,.04)] cursor-pointer rounded-md p-4px flex items-center"
    @click="handleClickTitle"
  >
    <span class="font-size-14px text-overflow max-w-320px">标题编辑标题编辑标题编辑标题编辑标题编辑标题编辑标题编辑标题编辑</span>
    <SvgIcon name="draft-line" size="14" />
  </div>
</template>

<style scoped lang="scss">
.title-editing-container {
  &:hover {
    .svg-icon {
      display: block;
    }
  }

  .svg-icon {
    display: none;
  }
}
</style>
