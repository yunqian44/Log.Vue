import Vue from "vue"
import VueRouter from "vue-router"

// 引入组件

import login from './page/login.vue'
import home from './page/home.vue'
import detail from './page/detail.vue'
import index from './page/admin/Log/index.vue'
import logList from './page/admin/Log/logList.vue'
import addorEditLog from './page/admin/Log/addOrEditLog.vue'
import userList from './page/admin/User/userList.vue'


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
        name: '首页',
        iconCls: 'el-icon-message', //图标样式class
        children: [{
            path: '/detail',
            component: detail,
            name: '详情'
        }],
        hidden: true
    },
    {
        path: '/admin',
        component: index,
        name: '后台首页',
        iconCls: 'el-icon-menu', //图标样式class
        children: [{
            path: '/admin/logList',
            component: logList,
            name: '日志列表',
            iconCls: 'el-icon-menu'
        },{
            path: '/admin/addOrEditLog',
            component: addorEditLog,
            name: '录入编辑',
            iconCls: 'el-icon-menu'
        }]
    },
    {
        path: '/admin',
        component: index,
        name: '系统管理',
        iconCls: 'el-icon-setting', //图标样式class
        children: [{
            path: '/admin/userList',
            component: userList,
            name: '用户管理',
            iconCls: 'el-icon-menu'
        }]
    }
];
var router = new VueRouter({
    routes//这里可以带有路由器的配置参数
})
export default router;//将路由器导出