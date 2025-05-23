<script setup lang="ts">
import { Sender } from 'vue-element-plus-x';
import { useRoute, useRouter } from 'vue-router';
import { createSession } from '@/api';
import { send } from '@/api/chat';
import LoginDialog from '@/components/LoginDialog/index.vue';
import WelecomeText from '@/components/WelecomeText/index.vue';
import { ModelEnum } from '@/constants/enums';
import { useUserStore } from '@/store';
import { useChatStore } from '@/store/modules/chat';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const chatStore = useChatStore();

const senderValue = ref('');
const isSelect = ref(false);
const isLoginDialogVisible = ref(false);

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
  <div class="chat-home-container">
    <div class="chat-home-wrap">
      <WelecomeText />
      <Sender
        v-model="senderValue"
        class="chat-home-sender"
        :auto-size="{
          maxRows: 9,
          minRows: 3,
        }"
        :loading="loading"
        variant="updown"
        clearable
        allow-speech
        @submit="handleSend"
      >
        <template #prefix>
          <div class="flex-1 flex items-center gap-8px flex-none w-fit overflow-hidden">
            <div
              class="flex items-center gap-4px px-12px py-8px rounded-15px cursor-pointer font-size-12px border-1px border-gray border-solid hover:bg-[rgba(0,0,0,.04)]"
            >
              <el-icon>
                <Paperclip />
              </el-icon>
            </div>

            <div
              :class="{ isSelect }"
              class="flex items-center gap-4px px-10px py-8px rounded-15px cursor-pointer font-size-12px border-1px border-gray border-solid hover:bg-[rgba(0,0,0,.04)]"
              @click="isSelect = !isSelect"
            >
              <el-icon>
                <ElementPlus />
              </el-icon>
              <span>深度思考</span>
            </div>
          </div>
        </template>
      </Sender>
    </div>

    <!-- 登录弹框 -->
    <LoginDialog v-model:visible="isLoginDialogVisible" />
  </div>
</template>

<style lang="scss" scoped>
.chat-home-container {
  padding: 0 16px;
  width: calc(100% - 32px);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow-anchor: none;

  .chat-home-wrap {
    position: relative;
    width: 100%;
    max-width: 800px;
    min-height: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .chat-home-sender {
      width: 100%;
    }
  }
}
</style>
