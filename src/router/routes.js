
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/PageUser.vue') },
      { path: '/auth', component: () => import('src/pages/PageAuth.vue') },
      { path: '/chat/:otherUserId', component: () => import('src/pages/PageChat.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
