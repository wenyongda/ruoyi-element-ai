import type { LoginDTO } from './types';
import { post } from '@/utils/request';

export const login = (data: LoginDTO) => post('/auth/login', data);
