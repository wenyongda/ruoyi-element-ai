import type {
  ChatSessionVo,
  CreateSessionDTO,
  GetSessionListParams,
} from './types';
import { get, post } from '@/utils/request';

export function getSessionList(params: GetSessionListParams) {
  return get<ChatSessionVo[]>('/system/session/list', params);
}

export function createSession(data: CreateSessionDTO) {
  return post<null>('/system/session', data);
}
