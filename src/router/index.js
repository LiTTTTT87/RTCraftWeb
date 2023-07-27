import { createRouter, createWebHistory } from 'vue-router'
const routes = [

    {// HOME
        path: '/app',
        name: 'App',
        component: () => import('../view/app.vue'),
        meta: {
            title: "主页"
        }
    }


]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.afterEach((to) => {
    if (to.meta.title) {
        document.title = "RTCRAFT | " + to.meta.title 
    }
})


export default router