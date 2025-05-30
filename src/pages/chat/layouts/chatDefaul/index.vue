<!-- 默认消息列表页 -->
<script setup lang="ts">
import ModelSelect from '@/components/ModelSelect/index.vue';
import WelecomeText from '@/components/WelecomeText/index.vue';
import { useUserStore } from '@/stores';
import { useSessionStore } from '@/stores/modules/session';

const userStore = useUserStore();
const sessionStore = useSessionStore();
const senderValue = ref('');

async function handleSend() {
  localStorage.setItem('chatContent', senderValue.value);
  await sessionStore.createSessionList({
    userId: userStore.userInfo?.userId as number,
    sessionContent: senderValue.value,
    sessionTitle: senderValue.value.slice(0, 10),
    remark: senderValue.value.slice(0, 10),
  });
}
</script>

<template>
  <div class="chat-defaul-wrap">
    <WelecomeText />
    <Sender
      v-model="senderValue"
      class="chat-defaul-sender"
      :auto-size="{
        maxRows: 9,
        minRows: 3,
      }"
      variant="updown"
      clearable
      allow-speech
      @submit="handleSend"
    >
      <template #prefix>
        <div class="flex-1 flex items-center gap-8px flex-none w-fit overflow-hidden">
          <ModelSelect />
          <div
            class="flex items-center gap-4px p-10px rounded-10px cursor-pointer font-size-14px border-1px border-[rgba(0,0,0,0.08)] border-solid hover:bg-[rgba(0,0,0,.04)]"
          >
            <el-icon>
              <Paperclip />
            </el-icon>
          </div>
        </div>
      </template>
    </Sender>
  </div>
</template>

<style scoped lang="scss">
.chat-defaul-wrap {
  position: relative;
  width: 100%;
  max-width: 800px;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .chat-defaul-sender {
    width: 100%;
  }
}
</style>
