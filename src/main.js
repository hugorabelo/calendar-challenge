import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBan,
  faChevronLeft,
  faChevronRight,
  faXmark,
  faEdit,
  faTrash,
  faNoteSticky,
  faCalendar,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { Datetime } from 'vue-datetime'

import './assets/styles/tailwind.css'
import 'vue-datetime/dist/vue-datetime.css'

library.add(faBan, faChevronLeft, faChevronRight, faXmark, faEdit, faTrash, faNoteSticky, faCalendar, faLocationDot)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('datetime', Datetime)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
