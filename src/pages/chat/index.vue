<script setup lang="ts">
import { createSession } from '@/api';
import { useUserStore } from '@/store';
import { Sender } from 'vue-element-plus-x';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const _router = useRouter();
console.log(route.params, '>>>>>>', route.query);
const chatId = computed(() => route.params?.id);
const senderValue = ref('');
const userStore = useUserStore();
async function handleSend() {
  console.log('chatId', chatId.value);
  console.log('value', senderValue.value);
  if (!chatId.value) {
    await createSession({
      userId: userStore.userInfo?.userId as number,
      sessionContent: senderValue.value,
      sessionTitle: senderValue.value.slice(0, 10),
      remark: senderValue.value.slice(0, 10),
    });
    // 跳转到会话页面(传入query参数-sendValue)
    // router.replace(`${}`)
  }
}
</script>

<template>
  <div>
    <Sender v-model="senderValue" @submit="handleSend" />
  </div>
</template>
