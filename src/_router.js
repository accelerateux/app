import { createRouter, createWebHistory } from 'vue-router';

import { homeRoutes } from '@/Home/_routes/home.routes.js';

const routes = [
  {
    path: '/',
    component: () => import('@/_layouts/Main.vue'),
    children: [
      ...homeRoutes,
      { 
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/Shared/_views/NotFound.vue')
      }
    ]
  }  
];

export const router = createRouter({
  history: createWebHistory('/'), // base directory option now here createWebHistory('/base-directory/'),
  routes
});

router.resolve({
  name: 'not-found',
  params: { pathMatch: ['not', 'found'] }
}).href
