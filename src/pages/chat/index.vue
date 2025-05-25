<script setup lang="ts">
import { useRoute } from 'vue-router';
import ChatDefaul from '@/pages/chat/layouts/chatDefaul/index.vue';
import ChatWithId from '@/pages/chat/layouts/chatWithId/index.vue';
import { useChatStore } from '@/stores/modules/chat';

const route = useRoute();
const chatStore = useChatStore();

const senderValue = ref('');

const chatId = computed(() => Number(route.params?.id));
if (chatId.value) {
  chatStore.requestChatList(chatId.value);
}
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

// const a = JSON.parse(`{"id":"chatcmpl-BVD1f4snw4KHOCKIgu4JOMoZbOwRh","object":"chat.completion.chunk","created":1746777939,"model":"gpt-4o-mini-2024-07-18","system_fingerprint":"fp_ded0d14823","choices":[{"delta":{"content":"","role":"assistant"},"logprobs":null,"finish_reason":null,"index":0}],"usage":null}`)
// console.log(a);
</script>

<template>
  <div class="chat-container">
    <!-- 默认聊天页面 -->
    <ChatDefaul v-if="!chatId" />
    <!-- 带id的聊天页面 -->
    <ChatWithId v-else :chat-id="chatId" />
  </div>
</template>

<style lang="scss" scoped>
.chat-container {
  padding: 0 16px;
  width: calc(100% - 32px);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow-anchor: none;
}
</style>
