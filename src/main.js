// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import $ from 'jquery'
import {GLOBAL_,waitPush} from "./api/global"
import store from "./store/index"
import echarts from 'echarts'

import { DatetimePicker } from 'vant';
import { RadioGroup, Radio } from 'vant';
import { Popup } from 'vant';
import { Button } from 'vant';
import { SwipeCell } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Toast } from 'vant';
import { Uploader } from 'vant';
import { Loading } from 'vant';
import { Overlay } from 'vant';
import { Pagination } from 'vant';
import { PullRefresh } from 'vant';
import { List } from 'vant';

Vue.use(List);
Vue.use(PullRefresh);
Vue.use(Pagination);
Vue.use(Overlay);
Vue.use(Loading);
Vue.use(Uploader);
Vue.use(Toast);
Vue.use(Cell).use(CellGroup);
Vue.use(SwipeCell);
Vue.use(Button);
Vue.use(Popup);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(DatetimePicker);


Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

Vue.prototype.$axios = axios;
Vue.prototype.GLOBAL_ = GLOBAL_;
Vue.prototype.waitPush = waitPush;

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
      //这里判断用户是否登录，验证本地存储是否有token
      if (!localStorage.getItem("accessToken")) { // 判断当前的token是否存在
          next({
              path: '/login'
          })
      } else {
          next()
      }
  } else {
      next() // 确保一定要调用 next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
