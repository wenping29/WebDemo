import { createRouter, createWebHistory } from 'vue-router';
import Home from './Pages/Home.vue';
import About from './Pages/AboutPage.vue';

import Login from './Pages/Login/Login.vue';
import Login2 from './Pages/Login/LoginV2.vue';
import Register from './Pages/Login/Register.vue';
import Register2 from './Pages/Login/Register2.vue';
import ForgetPassword from './Pages/Login/ForgetPassword.vue';
import ForgetPassword2 from './Pages/Login/ForgetPassword2.vue';

import ImgDetail from './Pages/ImgDetail.vue';
import Dashbord from './Pages/Dashbord.vue';

import ReportP from './Pages/Report/ReportP.vue';
import ReportView from "./Pages/Report/ReportView.vue"

import Map from './Pages/Map.vue';

import SettingView from  "./Pages/System/SettingView.vue"
import SystemLogPage from './Pages/System/SystemLogPage.vue'


import VehicleTracking from "./Pages/Vehicle/VehicleTracking.vue"
import VehicleManagement from './Pages/Vehicle/VehicleManagement.vue'
import VehicleDashboard from "./Pages/Vehicle/VehicleDashboard.vue"
import VehicleMonitoring from "./Pages/Vehicle/VehicleMonitoring.vue"
import DatabaseQuery from "./Pages/DataBase/DatabaseQuery.vue"

import Dashboard from "./Pages/Dashboard.vue"
import TrajectoryQuery from "./Pages/Vehicle/TrajectoryQuery.vue"

import PaymentRecords from "./Pages/Pay/PaymentRecords.vue"

import ImageManager from "./Pages/Image/ImageManager.vue"
import VideoManager from "./Pages/Image/VideoManager.vue"

// import VehicleDashboard from "./Pages/Vehicle/VehicleDashboard.vue"
// import VehicleDashboard from "./Pages/Vehicle/VehicleDashboard.vue"
import LoginLogQuery from "./Pages/System/LoginLogQuery.vue"

import RouteMenuConfig from "./Pages/System/RouteMenuConfig.vue"

 const routes = [
        {
            path: '/Home',
            name: 'Home',
            component: Home
        },{
            path: '/',
            component: Login2
        },{
            path:"/Image",
            name:"Image",
            children:[
                {
                    path:"VideoManager",
                    name:"VideoManager",
                    component: VideoManager
                },{
                    path:"ImageManager",
                    name:"ImageManager",
                    component: ImageManager
                },{
                    path: 'ImgDetail',
                    name: 'ImgDetail',
                    component: ImgDetail
                }]
        },{
            path: '/login',
             name: 'Login',
            component: Login,
        },{
            path: '/login2',
            name: 'Login2',
            component: Login2,
        },{
            path: '/user',
            name: 'user',
            children: [
                {path: 'register', component: Register},
                {path: 'register2', component: Register2},
                {path: 'ForgetPassword',component: ForgetPassword},
                {path: 'ForgetPassword2',component: ForgetPassword2}
            ],
        },{
            path:"/Vehicle",
            name:"Vehicle",
            children:[
                {path:"VehicleManagement",component: VehicleManagement},
                {path: "VehicleTracking",component: VehicleTracking},
                {path: 'VehicleDashboard',component: VehicleDashboard},
                {path:"TrajectoryQuery",component: TrajectoryQuery},
                {path:"VehicleMonitoring",component: VehicleMonitoring}
            ]
        },{
            path:"/PaymentRecords",
            name:"PaymentRecords",
            component: PaymentRecords
        },{
            path: "/System",
            name:"System",
            children:[
                {path:"SettingView",component: SettingView},
                {path:"SystemLogPage",component: SystemLogPage},
                {path:"RouteMenuConfig",component: RouteMenuConfig},
                {path:"LoginLogQuery",component: LoginLogQuery}
            ]
        },{
            path:"/DatabaseQuery",
            name:"DatabaseQuery",
            component: DatabaseQuery
        },{
            path: '/About',
            name: 'About',
            component: About,
            children:[
                {path:"SettingView",component: SettingView}]
        },{
            path:"/Dashboard",
            name:"Dashboard",
            component: Dashboard
        },{
            path:"/Dashbord",
            name:"Dashbord",
            component: Dashbord
        },{
            path: '/Map',
            name: 'Map',
            component: Map
        },{
            path: '/Report',
            name: 'Report',
            children:[
                {path:"ReportP",component: ReportP},
                {path:"ReportView",component: ReportView}
            ]
        },{
            name: '404',
            path: '/:catchAll(.*)',
            component: Map
        }];

const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;