
export const publicRoutes = [
  { 
    path: '/',
    component: () => import('@/Public/_views/Login.vue')
  },
  { 
    path: '/login',
    component: () => import('@/Public/_views/Login.vue')
  },
  { 
    path: '/logout',
    component: () => import('@/Public/_views/Login.vue')
  },
  { 
    path: '/sign-up',
    component: () => import('@/Public/_views/Sign-up.vue')
  }
]