import hookFetch from 'hook-fetch';
import { sseTextDecoderPlugin } from 'hook-fetch/plugins';

interface BaseResponse {
  code: number;
  data: null;
  message: string;
}

const instance = hookFetch.create<BaseResponse, unknown, 'data'>({
  baseURL: 'https://web.pandarobot.chat/api',
  headers: {
    'Content-Type': 'application/json',
  },
  plugins: [sseTextDecoderPlugin()],
});

function jwtPlugin() {
  return {
    name: 'jwt',
  };
}

instance.use(jwtPlugin());

export const request = instance.request;

export const post = instance.post;

export const get = instance.get;

export default instance;
