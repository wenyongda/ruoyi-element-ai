import type { ChatMessageVo } from '@/api/chat/types';
import { getChatList } from '@/api/chat';
import { defineStore } from 'pinia';
import { useUserStore } from './user';

export const useChatStore = defineStore('chat', () => {
  const userStore = useUserStore();
  const chatMap = ref<Record<number, ChatMessageVo[]>>({});

  const setChatMap = (id: number, data: ChatMessageVo[]) => {
    chatMap.value[id] = data;
  };

  const requestChatList = async (sessionId: number) => {
    try {
      const res = await getChatList({
        sessionId,
        userId: userStore.userInfo?.userId as number,
      });
      if (res.rows) {
        setChatMap(sessionId, res.rows);
      }
    }
    catch (error) {
      console.error('getChatList:', error);
    }
  };

  return {
    chatMap,
    requestChatList,
  };
});
