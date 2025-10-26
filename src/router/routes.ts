import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'informacije',
        name: 'informacije',
        component: () => import('pages/InformacijePage.vue'),
      },
      {
        path: 'literatura',
        name: 'literatura',
        component: () => import('pages/LiteraturaPage.vue'),
      },
      {
        path: 'o-nama',
        name: 'o-nama',
        component: () => import('pages/ONamaPage.vue'),
      },
      {
        path: 'privatnost',
        name: 'privatnost',
        component: () => import('pages/PrivatnostPage.vue'),
      },
      {
        path: 'reset',
        name: 'reset',
        component: () => import('pages/ResetPage.vue'),
      },
      {
        path: 'help',
        name: 'help',
        component: () => import('pages/HelpPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
