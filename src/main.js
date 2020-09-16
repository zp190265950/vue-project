import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Vue.config.productionTip = false
let instance = null
const render = (props) => {
  instance = new Vue({
    router,
    render: h => h(App)
  }).$mount('#vue-app');
}

if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}
if (!window.__POWERED_BY_QIANKUN__) { // 默认独立运行
  render();
}

// 子组件的协议就ok了
export async function bootstrap(props) {

};
export async function mount(props) {
  console.log(props)
  render(props)
}
export async function unmount(props) {
    instance.$destroy();
}
