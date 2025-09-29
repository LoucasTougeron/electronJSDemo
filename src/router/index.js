import { createRouter, createWebHashHistory } from 'vue-router';
import PageOne from "../views/PageOne.vue";
import PageTwo from "../views/PageTwo.vue";
import Authenticate from "../views/Authenticate.vue";
import Register from "../views/Register.vue";
import ArticlesList from "../views/ArticlesList.vue";
import ArticleDetail from "../views/ArticleDetail.vue";

const routes = [
    { path: '/', name: 'Authenticate', component: Authenticate},
    { path: '/register', name: 'Register', component: Register},
    { path: '/articles-list', name: 'ArticlesList', component: ArticlesList},
    { path: '/articles/:id', name: 'ArticleDetail', component: ArticleDetail},
    { path: '/page-1', name: 'PageOne', component: PageOne },
    { path: '/page-2', name: 'PageTwo', component: PageTwo }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;