import type { LoginUser } from '@/api/auth/types';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string>();
    const router = useRouter();
    const setToken = (value: string) => {
      token.value = value;
    };
    const clearToken = () => {
      token.value = void 0;
    };

    const userInfo = ref<LoginUser>();
    const setUserInfo = (value: LoginUser) => {
      userInfo.value = value;
    };
    const clearUserInfo = () => {
      userInfo.value = void 0;
    };

    const logout = async () => {
      // 如果需要调用接口，可以在这里调用
      clearToken();
      router.replace({ name: 'login' });
      clearUserInfo();
    };

    return {
      token,
      setToken,
      clearToken,
      userInfo,
      setUserInfo,
      clearUserInfo,
      logout,
    };
  },
  {
    persist: true,
  },
);
