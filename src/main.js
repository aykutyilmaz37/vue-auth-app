import Vue from "vue"
import App from "./App.vue"
import { router } from "./router"
import store from "./store"
import { BootstrapVue, IconsPlugin } from "bootstrap-vue"
import i18n from './plugins/i18n'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


new Vue({
    i18n,
    router,
    store,
    render: h => h(App),
}).$mount('#app')
