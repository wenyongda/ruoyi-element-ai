import type { NavigationGuard } from 'vue-router';

export function jwtGuard(): NavigationGuard {
  return () => {
    console.log('进入路由守卫');
  };
}
