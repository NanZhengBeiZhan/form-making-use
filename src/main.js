import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
// 'development',use package;'production':use cdn;
import ElementUI from 'element-ui'
import FormMaking from 'form-making'

import { VueEditor, Quill } from "vue2-editor";

import'element-ui/lib/theme-chalk/index.css'
import 'form-making/dist/FormMaking.css'
import '@/permission' // permission control
import '@/mockjs' // mock数据

import globalComponents from '@/components/global-components' // 引入全局组件
import { GenerateForm, MakingForm } from 'form-making'

Vue.use(ElementUI, { size: 'mini' })
Vue.use(FormMaking)
Vue.use(globalComponents)

Vue.component(GenerateForm.name, GenerateForm)
Vue.component(MakingForm.name, MakingForm)
Vue.component(VueEditor.name, VueEditor)

// i18n国际化
import i18n from '@/lang'

// 分享功能集合
import { shareConfig } from './utils/share'
Vue.prototype.shareConfig = shareConfig

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n, // 便于可以直接在组件中通过this.$i18n使用，也可以按需引用
  render: (h) => h(App),
}).$mount('#app')
