import Vue from 'vue'
import App from './App.vue'

// scss
import "./element-ui/packages/theme-chalk/src/icon.scss"
import "./element-ui/packages/theme-chalk/src/button.scss"
import "./element-ui/packages/theme-chalk/src/message.scss"

Vue.config.productionTip = false

import ele from "./element-ui/src/index"
Vue.use(ele);  


new Vue({
  render: h => h(App), 
}).$mount('#app') 
