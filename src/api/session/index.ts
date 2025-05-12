import type {
  ChatSessionVo,
  CreateSessionDTO,
  CreateSessionVO,
  GetSessionListParams,
} from './types';
import { get, post } from '@/utils/request';

export function getSessionList(params: GetSessionListParams) {
  return get<ChatSessionVo[]>('/system/session/list', params);
}

export function createSession(data: CreateSessionDTO) {
  return post<CreateSessionVO>('/system/session', data);
}
