const state = {
  reminders: localStorage.getItem('reminders') != null ? JSON.parse(localStorage.getItem('reminders')) : [],
}
const getters = {
  reminders: (state) => state.reminders,
}
const mutations = {
  setReminders(state, data) {
    state.reminders = data
    localStorage.setItem('reminders', JSON.stringify(state.reminders))
  },
}
const actions = {
  addReminder({ commit, state }, data) {
    if (state.reminders.filter((rem) => rem.id == data.id).length == 0) {
      state.reminders.push(data)
    }
    commit('setReminders', state.reminders)
  },
  updateReminder({ commit, state }, data) {
    for (var i = 0; i < state.reminders.length; i++) {
      if (state.reminders[i].id == data.id) {
        state.reminders[i] = data
      }
    }
    commit('setReminders', state.reminders)
  },
  deleteReminder({ commit, state }, data) {
    for (var i = 0; i < state.reminders.length; i++) {
      if (state.reminders[i].id == data.id) {
        state.reminders.splice(i, 1)
      }
    }
    commit('setReminders', state.reminders)
  },
  deleteRemindersGroup({ dispatch }, data) {
    for (var i = 0; i < data.length; i++) {
      dispatch('deleteReminder', { id: data[i].id })
    }
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
