import type { CreateSessionDTO } from '@/api/session/types';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { createSession, getSessionList } from '@/api/session';
import { useUserStore } from './user';

export const useSessionStore = defineStore('session', () => {
  const router = useRouter();
  const userStore = useUserStore();

  const sessionList = ref<CreateSessionDTO[]>([]);

  // 单独点击创建新对话按钮
  const createSessionBtn = async () => {
    try {
      // 直接回到首页
      router.replace({ name: 'chat' });
    }
    catch (error) {
      console.error('createSessionBtn:', error);
    }
  };

  // 发送消息后，创建对话
  const createSessionList = async (data: CreateSessionDTO) => {
    try {
      const res = await createSession(data);
      localStorage.setItem('chatContent', data.sessionContent);
      router.replace({
        name: 'chatWithId',
        params: {
          id: `${res.data}`,
        },
      });
    }
    catch (error) {
      console.error('createSession:', error);
    }
  };

  // 获取会话列表
  const requestSessionList = async () => {
    try {
      const res = await getSessionList({
        userId: userStore.userInfo?.userId as number,
      });
      if (res.rows) {
        sessionList.value = (res.rows || []).map(item => ({
          ...item,
          // 提供默认值
          remark: item.remark || '',
          sessionContent: item.sessionContent || '',
          sessionTitle: item.sessionTitle || '',
          userId: item.userId || -1,
        }));
      }
    }
    catch (error) {
      console.error('getSessionList:', error);
    }
  };

  return {
    sessionList,
    createSessionBtn,
    createSessionList,
    requestSessionList,
  };
});
