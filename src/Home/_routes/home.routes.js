
export const homeRoutes = [
  { 
    path: '/dashboard',
    component: () => import('@/Home/_views/Home.vue'),
    meta: {
      requiresAuth: true
    }
  },
  { 
    path: '/home',
    component: () => import('@/Home/_views/Home.vue'),
    meta: {
      requiresAuth: true
    }
  }
]