import VueRouter from 'vue-router'
import login from '../components/login/index'
import home from '../components/home/index'
import register from '../components/register/index'
import lockScreen from '../components/lockscreen/index'
import dashboard from '../components/home/dashbord/index'
import uiElement from '../components/home/dashbord/uiElement/index'
import typography from '../components/home/dashbord/typography/index'
// basicElements
import formelements from '../components/home/dashbord/formelement/index'
import chartjs from '../components/home/dashbord/chart/index'
import basictable from '../components/home/dashbord/basictable/index'
import iconsMdi from '../components/home/dashbord/iconsMdi/index'
import documentation from '../components/home/dashbord/documentation/index'

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/login',component: login},
    { path: '/register',component: register},
    { path: '/lockScreen',component: lockScreen},
    { path: '/home', component: home ,children: [
        { path: '/', redirect: '/home/dashboard' },
        { path: 'dashboard',component: dashboard},
        { path: 'uielements',redirect: '/home/uielements/button'},
        { path: 'uielements/button',component: uiElement},
        { path: 'uielements/typography',component: typography},
        { path: 'formelements',component: formelements},
        { path: 'charts',component: chartjs},
        { path: 'tables',component: basictable},
        { path: 'icons',component: iconsMdi},
        { path: 'documentation',component: documentation}
      ] 
    }
  ]
})

export default router