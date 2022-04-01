import { DateTime } from 'luxon'

const state = {
  selectedMonth: DateTime.now().startOf('month'),
}
const getters = {
  selectedMonth: (state) => state.selectedMonth,
}
const mutations = {
  setSelectedMonth(state, data) {
    state.selectedMonth = data
  },
}
const actions = {
  initSelectedMonth({ commit }) {
    commit('setSelectedMonth', DateTime.now().startOf('month'))
  },
  goToNextMonth({ commit, state, dispatch }) {
    if (!state.selectedMonth) {
      dispatch('initSelectedMonth')
    }
    let nextMonth = state.selectedMonth.plus({ months: 1 })
    commit('setSelectedMonth', nextMonth)
  },
  goToPreviousMonth({ commit, state, dispatch }) {
    if (!state.selectedMonth) {
      dispatch('initSelectedMonth')
    }
    let previousMonth = state.selectedMonth.minus({ months: 1 })
    commit('setSelectedMonth', previousMonth)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
