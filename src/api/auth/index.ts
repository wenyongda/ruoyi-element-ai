import type { LoginDTO, LoginVO } from './types';
import { post } from '@/utils/request';

export const login = (data: LoginDTO) => post<LoginVO>('/auth/login', data);
