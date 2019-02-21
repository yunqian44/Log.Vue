import Vue from "vue"
import VueRouter from "vue-router"

// 引入组件

import login from './page/login.vue'
import home from './page/home.vue'


Vue.use(VueRouter);// 要告诉 vue 使用 vueRouter

let routes = [{
        path: '/login',
        component: login,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: home,
        name: '导航一',
        iconCls: 'el-icon-message', //图标样式class
    },
];
var router = new VueRouter({
    routes//这里可以带有路由器的配置参数
})
export default router;//将路由器导出