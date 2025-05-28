import type { ChatMessageVo } from '@/api/chat/types';
import { defineStore } from 'pinia';
import { getChatList } from '@/api/chat';
import { useUserStore } from './user';

export const useChatStore = defineStore('chat', () => {
  const userStore = useUserStore();

  // 是否开启深度思考
  const isDeepThinking = ref<boolean>(false);

  const setDeepThinking = (value: boolean) => {
    isDeepThinking.value = value;
  };

  // 会议ID对应-聊天记录 map对象
  const chatMap = ref<Record<string, ChatMessageVo[]>>({});

  const setChatMap = (id: string, data: ChatMessageVo[]) => {
    chatMap.value[id] = data;
  };

  // 获取当前会话的聊天记录
  const requestChatList = async (sessionId: string) => {
    // 如果没有 token 则不查询聊天记录
    if (!userStore.token)
      return;
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
    isDeepThinking,
    setDeepThinking,
  };
});
