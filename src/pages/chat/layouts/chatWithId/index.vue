<!-- 每个回话对应的聊天内容 -->
<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useChatStore } from '@/stores/modules/chat';

interface ChatWithIdProps {}

const props = withDefaults(defineProps<ChatWithIdProps>(), {});
const route = useRoute();
const chatStore = useChatStore();
const senderValue = ref('');

console.log('props ==> ', props);

watch(
  () => route.params?.id,
  (_id_) => {
    if (_id_) {
      chatStore.requestChatList(Number(_id_));
      const v = localStorage.getItem('chatContent');
      if (v) {
        senderValue.value = v;
        localStorage.removeItem('chatContent');
        // 发送消息
        console.log('发送消息 v', v);
      }
    }
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <div>新建对话，当前页面对话id: {{ route.params?.id }}</div>
</template>

<style scoped lang="scss"></style>
