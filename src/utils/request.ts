import type { HookFetchPlugin } from 'hook-fetch';
import hookFetch from 'hook-fetch';
import { sseTextDecoderPlugin } from 'hook-fetch/plugins';

interface BaseResponse {
  code: number;
  data: null;
  msg: string;
}

const instance = hookFetch.create<BaseResponse, unknown, 'data'>({
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
      // alert(response.result?.msg);
      return Promise.reject(response);
    },
  };
}

instance.use(jwtPlugin());

export const request = instance.request;

export const post = instance.post;

export const get = instance.get;

export default instance;
