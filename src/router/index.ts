import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import { jwtGuard } from './permissions';

const routes: Readonly<RouteRecordRaw>[] = [
  {
    path: '/',
    redirect: '/chat',
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: '',
        name: 'chatWithoutId',
        component: () => import('@/pages/chat/index.vue'),
      },
      {
        path: ':id',
        name: '/chat',
        component: () => import('@/pages/chat/index.vue'),
      },
      {
        path: '/chat/home',
        name: 'chatHome',
        component: () => import('@/pages/chat/home/index.vue'),
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
  history: createWebHistory(),
  routes,
});

console.group('Routes');
console.log('routes', router.getRoutes());
console.groupEnd();

router.beforeEach(jwtGuard());

export default router;
