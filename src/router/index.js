import { createRouter, createWebHistory } from 'vue-router'
import { StartLoadingBar, FinishLoadingBar } from "../utils/loadingbar.js";
import { ChangeShowSideBar_Main } from '../components/Narbar.vue';
import { SendInfoMessage, SendErrorMessage, SendWarningMessage, SendSuccessMessage } from '../utils/message.js'
const routes = [

    {// HOME
        path: '/app',
        name: 'App',
        component: () => import('../view/app.vue'),
        meta: {
            title: "主页"
        }
    },
    {// Welcome
        path: '/',
        name: 'FirstPage',
        component: () => import('../view/firstpage.vue'),
        meta: {
            title: "欢迎"
        }
    },
    {// AUTH
        path: '/auth/login',
        name: 'Login',
        component: () => import('../view/auth/login.vue'),
        meta: {
            title: "登录"
        }
    },
    {// AUTH
        path: '/auth/register',
        name: 'Register',
        component: () => import('../view/auth/register.vue'),
        meta: {
            title: "注册"
        }
    },
    {// Msgwall
        path: '/msgwall',
        name: 'msgwall_all',
        component: () => import('../view/msgwall/all.vue'),
        meta: {
            title: "「全」留言墙"
        }
    },
    {// Msgwall
        path: '/msgwall/add',
        name: 'msgwall_add',
        component: () => import('../view/msgwall/add.vue'),
        meta: {
            title: "「留言」墙"
        }
    }


]

const router = createRouter({
    history: createWebHistory(),
    routes
})



router.beforeEach((to, from, next) => {
    StartLoadingBar();
    // if (to.path != "/"){
    //     SendInfoMessage("即将开发完成，请耐心等待！")
    //     next("/")
    // }else{
    //     next()
    // }
    if (to.path == '/') {
        if (sessionStorage.getItem("token")){
            next({name: 'App' });
            return
        }
        next()
    }
    else {
        if (sessionStorage.getItem("token") != null) {
            if (to.name == "Login" || to.name == "Register"){
                next("/app")
            }else{
                next()
            }
        } else {
            if (to.name == "Login" || to.name == "Register"){
                next()
            }else{
                next('/auth/login')
            }
            
        }
    }
});

router.afterEach((to) => {
    if (to.meta.title) {
        document.title = to.meta.title + " - 王宇航的夏日幻想 —— 幻想云间"
    }
    
    switch (to.name) {
        case "App":
            ChangeShowSideBar_Main(true);
            break;
        case "Login":
            ChangeShowSideBar_Main(false);
            break;
        case "Register":
            ChangeShowSideBar_Main(false);
            break;
        case "FirstPage":
            ChangeShowSideBar_Main(false);
            break;
        default:
            ChangeShowSideBar_Main(true);
    }
    FinishLoadingBar();
    
})


export default router