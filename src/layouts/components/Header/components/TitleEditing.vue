<!-- 标题编辑 -->
<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue';

function handleClickTitle() {
  ElMessageBox.prompt('', '编辑对话名称', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputErrorMessage: '请输入对话名称',
    confirmButtonClass: 'el-button--primary',
    cancelButtonClass: 'el-button--info',
    roundButton: true,
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
  <div class="w-full h-full flex flex-col justify-center">
    <div class="box-border mr-20px">
      <div
        class="title-editing-container p-4px w-fit max-w-full flex items-center justify-start cursor-pointer select-none hover:bg-[rgba(0,0,0,.04)] cursor-pointer rounded-md font-size-14px"
        @click="handleClickTitle"
      >
        <div class="text-overflow select-none pr-8px">
          标题编辑标题编辑标题编辑标题编辑标题编辑标题编辑标题编辑标题编辑
        </div>
        <SvgIcon name="draft-line" size="14" class="flex-none c-gray-500" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title-editing-container {
  transition: all 0.3s ease;
  &:hover {
    .svg-icon {
      opacity: 1;
      display: block;
    }
  }

  .svg-icon {
    transition: all 0.3s ease;
    opacity: 0.5;
    display: none;
  }
}
</style>
