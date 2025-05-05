<script lang="ts" setup>
import type { ChatSessionVo } from '@/api/session/types';
import type { ConversationItem } from 'vue-element-plus-x/types/Conversations';
import { getSessionList } from '@/api';
import { useUserStore } from '@/store';
import { Conversations } from 'vue-element-plus-x';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const active = computed<string>(() => (route.params?.id as string) ?? '');
const items = ref<ConversationItem<ChatSessionVo>[]>([]);

function handleChange(item: ConversationItem<ChatSessionVo>) {
  console.log(item);
  router.replace({
    name: 'chat',
    params: {
      id: item.id,
    },
  });
}

async function getSessions() {
  try {
    const res = await getSessionList({
      userId: userStore.userInfo?.userId as number,
    });
    console.log(res);
    items.value
      = res.rows?.map(item => ({
        ...item,
        label: item.sessionTitle as string,
      })) ?? [];
  }
  catch (error) {
    console.error('getSessions:', error);
  }
}
getSessions();

const sessionId = computed<string>(() => route.params?.id as string);
function handleNewSession() {
  if (sessionId.value) {
    router.replace({ name: 'chatWithoutId' });
  }
}

watchEffect(() => {
  console.log('active', active.value, '>>>');
});
</script>

<template>
  <el-container class="h-screen overflow-hidden">
    <el-aside>
      <Conversations
        :active="active"
        :items="items"
        row-key="id"
        label-key="sessionTitle"
        @change="handleChange"
      >
        <template #header>
          <el-button @click="handleNewSession">
            新增
          </el-button>
        </template>
        <template #footer>
          <div>用户信息</div>
        </template>
      </Conversations>
    </el-aside>
    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>
