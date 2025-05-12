import type { HookFetchPlugin } from 'hook-fetch';
import { useUserStore } from '@/store';
import { ElMessage } from 'element-plus';
import hookFetch from 'hook-fetch';
import { sseTextDecoderPlugin } from 'hook-fetch/plugins';

interface BaseResponse {
  code: number;
  data: never;
  msg: string;
  rows: never;
}

export const request = hookFetch.create<BaseResponse, 'data' | 'rows'>({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  plugins: [sseTextDecoderPlugin({ json: true, prefix: 'data:' })],
});

function jwtPlugin(): HookFetchPlugin<BaseResponse> {
  const userStore = useUserStore();
  return {
    name: 'jwt',
    beforeRequest: async (config) => {
      config.headers = new Headers(config.headers);
      config.headers.set('authorization', `Bearer ${userStore.token}`);
      return config;
    },
    afterResponse: async (response) => {
      // console.log(response);
      if (response.result?.code === 200) {
        return response;
      }
      if (response.result?.code === 401) {
        userStore.logout();
      }
      ElMessage.error(response.result?.msg);
      return Promise.reject(response);
    },
  };
}

request.use(jwtPlugin());

export const post = request.post;

export const get = request.get;

export default request;
