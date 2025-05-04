import type { HookFetchPlugin } from 'hook-fetch';
import { ElMessage } from 'element-plus';
import hookFetch from 'hook-fetch';
import { sseTextDecoderPlugin } from 'hook-fetch/plugins';

interface BaseResponse {
  code: number;
  data: null;
  msg: string;
}

export const request = hookFetch.create<BaseResponse, 'data'>({
  baseURL: 'https://web.pandarobot.chat/api',
  headers: {
    'Content-Type': 'application/json',
  },
  plugins: [sseTextDecoderPlugin()],
});

function jwtPlugin(): HookFetchPlugin<BaseResponse> {
  return {
    name: 'jwt',
    afterResponse: async (response) => {
      console.log(response);
      if (response.result?.code === 200) {
        return response;
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
