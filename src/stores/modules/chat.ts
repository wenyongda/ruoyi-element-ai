import type { ChatMessageVo } from '@/api/chat/types';
import { defineStore } from 'pinia';
import { getChatList } from '@/api';
import { useUserStore } from './user';

export const useChatStore = defineStore('chat', () => {
  const userStore = useUserStore();

  // 用户头像
  const avatar = computed(() => {
    const userInfo = userStore.userInfo;
    return userInfo?.avatar || 'https://avatars.githubusercontent.com/u/76239030?v=4';
  });

  // 是否开启深度思考
  const isDeepThinking = ref<boolean>(false);

  const setDeepThinking = (value: boolean) => {
    isDeepThinking.value = value;
  };

  // 会议ID对应-聊天记录 map对象
  const chatMap = ref<Record<string, ChatMessageVo[]>>({});

  const setChatMap = (id: string, data: ChatMessageVo[]) => {
    chatMap.value[id] = data?.map((item: ChatMessageVo) => {
      const isUser = item.role === 'user';
      return {
        ...item,
        key: item.id,
        placement: isUser ? 'end' : 'start',
        isMarkdown: !isUser,
        // variant: 'shadow',
        // shape: 'corner',
        avatar: isUser
          ? avatar
          : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        avatarSize: '32px',
        typing: false,
      };
    });
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
