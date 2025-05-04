import type { RouteRecordRaw } from 'vue-router';
import {
  createRouter,
  createWebHashHistory,

} from 'vue-router';
import { jwtGuard } from './permissions';

const routes: Readonly<RouteRecordRaw>[] = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'chatWithoutId',
        component: () => import('@/pages/chat/index.vue'),
      },
      {
        path: ':id',
        name: 'chat',
        component: () => import('@/pages/chat/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue'),
  },
] as const;

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

console.group('Routes');
console.log('routes', router.getRoutes());
console.groupEnd();

router.beforeEach(jwtGuard());

export default router;
