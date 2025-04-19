import { createRouter, createWebHashHistory } from 'vue-router';
import { jwtGuard } from './permissions';

const routes = [
  { path: '/', component: () => import('@/components/HelloWorld.vue') },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

console.group('Routes');
console.log('routes', router.getRoutes());
console.groupEnd();

router.beforeEach(jwtGuard());

export default router;
