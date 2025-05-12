import type { ChatMessageVo, GetChatListParams, SendDTO } from './types';
import { get, post } from '@/utils/request';

export const send = (data: SendDTO) => post<null>('/chat/send', data).stream();

export function getChatList(params: GetChatListParams) {
  return get<ChatMessageVo[]>('/system/message/list', params);
}
