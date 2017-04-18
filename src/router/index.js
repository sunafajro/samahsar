import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Home from '@/components/Home'
import About from '@/components/About'
import HelpUs from '@/components/HelpUs'
import Term from '@/components/Term'

Vue.use(Router)
Vue.use(VueResource);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/about',
            name: 'About',
            component: About
        },
        {
            path: '/helpus',
            name: 'HelpUs',
            component: HelpUs
        },
        {
            path: '/term/:id',
            name: 'term',
            component: Term,
        }
    ]
})
