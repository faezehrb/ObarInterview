import { createRouter, createWebHistory } from 'vue-router';

import AddressFormPage from '@/pages/AddressFormPage.vue';
import AddressListPage from '@/pages/AddressListPage.vue';

const routes = [
    {
        path: '/',
        name: 'NewAddress',
        component: AddressFormPage,
    },
    {
        path: '/addresslist',
        name: 'AddressList',
        component: AddressListPage,
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;