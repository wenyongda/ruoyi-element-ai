import type { ChatSessionVo, CreateSessionDTO, GetSessionListParams } from '@/api/session/types';
import { ChatLineRound } from '@element-plus/icons-vue';
import { defineStore } from 'pinia';
import { markRaw } from 'vue';
import { useRouter } from 'vue-router';
import { create_session, delete_session, get_session_list, update_session } from '@/api/session';
import { useUserStore } from './user';

export const useSessionStore = defineStore('session', () => {
  const router = useRouter();
  const userStore = useUserStore();

  // 当前选中的会话信息
  const currentSession = ref<ChatSessionVo | null>(null);
  // 设置当前会话
  const setCurrentSession = (session: ChatSessionVo | null) => {
    currentSession.value = session;
  };

  // 会话列表核心状态
  const sessionList = ref<ChatSessionVo[]>([]); // 会话数据列表
  const currentPage = ref(1); // 当前页码（从1开始）
  const pageSize = ref(20); // 每页显示数量
  const hasMore = ref(true); // 是否还有更多数据
  const isLoading = ref(false); // 全局加载状态（初始加载/刷新）
  const isLoadingMore = ref(false); // 加载更多状态（区分初始加载）

  // 创建新对话（按钮点击）
  const createSessionBtn = async () => {
    try {
      router.replace({ name: 'chat' });
      currentSession.value = null;
    }
    catch (error) {
      console.error('createSessionBtn错误:', error);
    }
  };

  // 发送消息后创建新会话（并插入列表顶部）
  const createSessionList = async (data: Omit<CreateSessionDTO, 'id'>) => {
    try {
      const res = await create_session(data);

      console.log('并插入列表顶部 res', res);

      // 构造新会话对象（根据接口实际返回调整）
      const newSession: ChatSessionVo = {
        ...data,
        sessionTitle: data.sessionTitle || '新对话',
        prefixIcon: markRaw(ChatLineRound),
      };

      // 插入到列表顶部（触发视图更新）
      sessionList.value.unshift(newSession);

      // 跳转聊天页
      router.replace({
        name: 'chatWithId',
        params: { id: `${res.data}` },
      });

      // 重置分页状态（新增会话后，后续加载从第一页重新开始）
      currentPage.value = 1;
      hasMore.value = true;
    }
    catch (error) {
      console.error('createSessionList错误:', error);
    }
  };

  // 获取会话列表（核心分页方法）
  const requestSessionList = async (page: number = currentPage.value) => {
    if ((page > 1 && !hasMore.value) || isLoading.value || isLoadingMore.value)
      return;

    isLoading.value = page === 1; // 第一页时标记为全局加载
    isLoadingMore.value = page > 1; // 非第一页时标记为加载更多

    try {
      const params: GetSessionListParams = {
        userId: userStore.userInfo?.userId as number,
        pageNum: page,
        pageSize: pageSize.value,
      };

      const res = await get_session_list(params);

      // 第一页：覆盖原有数据；非第一页：合并新数据
      if (page === 1) {
        sessionList.value
          = res.rows?.map((item: ChatSessionVo) => {
            return {
              ...item,
              prefixIcon: markRaw(ChatLineRound),
            };
          }) || [];
      }
      else {
        // 去重处理（避免接口返回重复数据）
        const existingIds = new Set(sessionList.value.map(item => item.id));
        const newRows = (
          res.rows?.map((item: ChatSessionVo) => {
            return {
              ...item,
              prefixIcon: markRaw(ChatLineRound),
            };
          }) || []
        ).filter(item => !existingIds.has(item.id));
        sessionList.value.push(...newRows);
      }

      // 判断是否还有更多数据（当前页数据量 < pageSize 则无更多）
      hasMore.value = (res.rows?.length || 0) === pageSize.value;
      currentPage.value = page;
    }
    catch (error) {
      console.error('requestSessionList错误:', error);
    }
    finally {
      isLoading.value = false;
      isLoadingMore.value = false;
    }
  };

  // 加载更多会话（供组件调用）
  const loadMoreSessions = async () => {
    if (hasMore.value)
      await requestSessionList(currentPage.value + 1);
  };

  // 更新会话（供组件调用）
  const updateSession = async (item: ChatSessionVo) => {
    try {
      await update_session(item);
      await requestSessionList(currentPage.value);
    }
    catch (error) {
      console.error('updateSession错误:', error);
    }
  };

  // 删除会话（供组件调用）
  const deleteSessions = async (ids: string[]) => {
    try {
      await delete_session(ids);
      await requestSessionList(currentPage.value);
    }
    catch (error) {
      console.error('deleteSessions错误:', error);
    }
  };

  return {
    // 当前选中的会话
    currentSession,
    // 设置当前会话
    setCurrentSession,
    // 列表状态
    sessionList,
    currentPage,
    pageSize,
    hasMore,
    isLoading,
    isLoadingMore,
    // 列表方法
    createSessionBtn,
    createSessionList,
    requestSessionList,
    loadMoreSessions,
    updateSession,
    deleteSessions,
  };
});
