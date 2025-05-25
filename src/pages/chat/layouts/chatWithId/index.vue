<!-- 每个回话对应的聊天内容 -->
<script setup lang="ts">
interface ChatWithIdProps {
  chatId?: number;
}

const props = withDefaults(defineProps<ChatWithIdProps>(), {
  chatId: undefined,
});

console.log('props ==> ', props);
</script>

<template>
  <div>新建对话</div>
</template>

<style scoped lang="scss"></style>
