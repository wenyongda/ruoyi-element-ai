<script lang="ts" setup>
import type { ConversationItem } from 'vue-element-plus-x/types/components/Conversations/types';
import { Conversations } from 'vue-element-plus-x';
import { useRoute, useRouter } from 'vue-router';

interface ChatItem {
  key: string;
}

const route = useRoute();
const router = useRouter();
const active = computed<string>(() => (route.params?.id as string) ?? '');
const items = ref<ConversationItem<ChatItem>[]>([
  {
    key: '1',
    label: '今天的会话111111111111111111111111111',
    group: 'today',
    disabled: true,
  },
  {
    key: '2',
    group: 'today',
    label: '今天的会话2',
  },
  {
    key: '3',
    group: 'yesterday',
    label: '昨天的会话1',
  },
  {
    key: '4',
    label: '昨天的会话2',
  },
  {
    key: '5',
    label: '一周前的会话',
  },
  {
    key: '6',
    label: '一个月前的会话',
  },
  {
    key: '7',
    label: '很久以前的会话',
  },
]);

function handleChange(item: ConversationItem<ChatItem>) {
  console.log(item);
  router.replace({
    name: 'chat',
    params: {
      id: item.key,
    },
  });
}
</script>

<template>
  <el-container class="h-screen overflow-hidden">
    <el-aside>
      <el-button>新增</el-button>
      <Conversations :active="active" :items="items" @change="handleChange" />
    </el-aside>
    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>
