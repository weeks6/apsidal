const routes = [
  { path: '/', component: () => import('./pages/Home.vue') },
  {
    path: '/login',
    name: 'login',
    component: () => import('./pages/Login.vue')
  },
  { path: '/register', component: () => import('./pages/Register.vue') },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('./pages/Profile.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import('./pages/Gallery.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/stories',
    name: 'stories',
    component: () => import('./pages/Stories.vue'),
    meta: {
      requiresAuth: true
    }
  }
];

export default routes;
