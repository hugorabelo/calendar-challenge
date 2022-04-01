import store from '@/store'

export function getReminders() {
  return store.getters.reminders
}

export function getReminderById(id) {
  let selectedReminder = store.getters.reminders.filter((rem) => rem.id == id)
  return selectedReminder.length > 0 ? selectedReminder[0] : null
}

export function addReminder(data) {
  store.dispatch('addReminder', data)
}

export function updateReminder(data) {
  store.dispatch('updateReminder', data)
}

export function deleteReminder(data) {
  store.dispatch('deleteReminder', data)
}

export function deleteRemindersGroup(data) {
  store.dispatch('deleteRemindersGroup', data)
}
