import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import HelpUs from '@/components/HelpUs'
import Search from '@/components/Search'
import Term from '@/components/Term'

Vue.use(Router)

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
            path: '/search/:term',
            name: 'search',
            component: Search,
        },
        {
            path: '/term/:id',
            name: 'term',
            component: Term,
        }
    ],

})
