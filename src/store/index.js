import Vue from 'vue'
import Vuex from 'vuex'

import dateInfo from './modules/dateInfo'
import reminderStorage from './modules/reminderStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    dateInfo,
    reminderStorage,
  },
})
