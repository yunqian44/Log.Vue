import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Router from 'vue-router';
import App from './App.vue';
import 'font-awesome/css/font-awesome.min.css';




Vue.use(ElementUI);
Vue.use(Router);


router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }

  next();
  // if (to.path == '/login') {
  //   next();
  // } else {
  //   next();
  // }
});

// 引入路由
import router from "./router.js"
new Vue({
  el: '#app',
  router, // 注入到根实例中
  render: h => h(App)
});