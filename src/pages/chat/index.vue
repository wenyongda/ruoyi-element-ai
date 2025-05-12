<script setup lang="ts">
import { createSession } from '@/api';
import { send } from '@/api/chat';
import { ModelEnum } from '@/constants/enums';
import { useUserStore } from '@/store';
import { useChatStore } from '@/store/modules/chat';
import { BubbleList, Sender } from 'vue-element-plus-x';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const chatId = computed(() => Number(route.params?.id));
const senderValue = ref('');
const userStore = useUserStore();
const chatStore = useChatStore();
const chatList = computed(() => chatStore.chatMap[chatId.value] ?? []);
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
        console.log(v);
      }
    }
  },
);

// const a = JSON.parse(`{"id":"chatcmpl-BVD1f4snw4KHOCKIgu4JOMoZbOwRh","object":"chat.completion.chunk","created":1746777939,"model":"gpt-4o-mini-2024-07-18","system_fingerprint":"fp_ded0d14823","choices":[{"delta":{"content":"","role":"assistant"},"logprobs":null,"finish_reason":null,"index":0}],"usage":null}`)
// console.log(a);
const loading = ref(false);
async function handleSend() {
  if (!chatId.value) {
    try {
      const res = await createSession({
        userId: userStore.userInfo?.userId as number,
        sessionContent: senderValue.value,
        sessionTitle: senderValue.value.slice(0, 10),
        remark: senderValue.value.slice(0, 10),
      });
      localStorage.setItem('chatContent', senderValue.value);
      router.replace({
        name: 'chat',
        params: {
          id: res.data.id,
        },
      });
    }
    catch (error) {
      console.error('createSessionError', error);
    }
    return;
  }
  // 发送消息
  loading.value = true;
  const req = send({
    sessionId: chatId.value,
    model: ModelEnum.GPT_4o_MINI.value,
    messages: [
      {
        role: 'user',
        content: senderValue.value,
      },
    ],
  });
  for await (const chunk of req) {
    if (chunk.result && typeof chunk.result === 'string') {
      console.log('string:', chunk.result);
      // const a = JSON.parse(chunk.result);
      // console.log(a,'>>>');
    }
    console.log(chunk.result);
  }
  loading.value = false;
}
</script>

<template>
  <div>
    <BubbleList :list="chatList">
      <template #content="{ item }">
        {{ item.content }}
      </template>
    </BubbleList>
    <Sender v-model="senderValue" :loading="loading" @submit="handleSend" />
  </div>
</template>
