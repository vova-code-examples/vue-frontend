import Vue from 'vue'
import Router from 'vue-router'
import MainView from "@/views/MainView"
import AuthView from "@/views/AuthView"
import CitiesView from "@/views/CitiesView"
import AuthService from "@/services/AuthService"


Vue.use(Router)


const router = new Router({
    mode: 'history',
    routes: [
        { path: '/', name:'main', component: MainView, children: [
            { path: 'cities', name: "cities", component: CitiesView },
        ] },            
        { path: '/auth', name:'auth', component: AuthView, meta: {public: true}},
        // { path: "/:catchAll(.*)", name: "NotFound", component: NotFound },
    ]
})

router.beforeEach((to, from, next)=>{
    const isLoggedIn = AuthService.isLoggedIn();
    const isPublicPage = to.matched.some(record => record.meta.public)
    
    if (isLoggedIn && to.name == 'auth'){
        next({ name: 'main' })
    }

    if (isLoggedIn || isPublicPage){
        next();
    } else {
        next({ name: 'auth' })
    }
})

export default router