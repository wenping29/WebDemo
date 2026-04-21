const configdata = {
    menus:[
        {
            path: '/Home',name:"主页", key:"Home",
        },{
            path:"/Image",
            key:"Image",
            name:"图片",
            children:[
                {path:"/Image/VideoManager",name:"视频", key:"VideoManager",},
                {path:"/Image/ImageManager",name:"图片", key:"ImageManager",},
                {path: '/Image/ImgDetail',name:"图片详情", key:"ImgDetail",}
            ]
        },{
            path:"/Vehicle",
            name:"车辆", key:"Vehicle",
            children:[
                {path:"/Vehicle/VehicleManagement",name:"车辆管理", key:"VehicleManagement",},
                {path: "/Vehicle/VehicleTracking",name:"车辆轨迹", key:"VehicleTracking",},
                {path: '/Vehicle/VehicleDashboard',name:"车辆面板", key:"VehicleDashboard",},
                {path:"/Vehicle/TrajectoryQuery",name:"轨迹查询", key:"TrajectoryQuery",}
            ]
        },{
            path:"/PaymentRecords",name:"支付记录", key:"PaymentRecords",
        },{
            path:"/DatabaseQuery",name:"数据表", key:"DatabaseQuery",
        },{
            path: '/Dashbord',
            key:"Dashbord",
            name:"大屏",
            children:[
                {   path:"/Dashboard",name:"大屏2", key:"Dashboard"   },
                {   path: '/Dashboard',name:"大屏" , key:"Dashboard"    }
            ]
        },{
            path: '/Map',name:"地图", key:"Map",
        },{
            path: '/Report',
            name:"报表",
            key:"Report",
            children:[
                {   path:"/Report/ReportP",name:"大屏2", key:"ReportP"   },
                {   path: '/Report/ReportView',name:"大屏" , key:"ReportView"    }
            ]
             
        },{
            path: "/System",name:"系统", key:"System",
            children:[
                {path:"/System/SettingView",name:"设置", key:"SettingView",},
                {path:"/System/SystemLogPage",name:"系统日志", key:"SystemLogPage",},
                {path:"/System/RouteMenuConfig",name:"路由", key:"RouteMenuConfig",},
                {path:"/System/LoginLogQuery",name:"登陆日志", key:"LoginLogQuery",}
            ]
        },{
            path: '/About',name:"关于", key:"About",
        },{
            path: '/login',
            name:"登陆",
            key:"login",
            children: [
                {path: '/login/login' ,name:"登陆", key:"login",},
                {path: '/login/loginV2' ,name:"登陆2", key:"login",},
                {path: '/login/register',name:"注册", key:"register",},
                {path: '/login/ForgetPassword',name:"找回密码", key:"ForgetPassword",}
            ],
        }
    ]
}
export default configdata;