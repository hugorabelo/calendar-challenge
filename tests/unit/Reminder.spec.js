import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Reminder from '@/components/Reminder'
import { DateTime } from 'luxon'
import dateInfo from '@/store/modules/dateInfo'
import reminderStorage from '@/store/modules/reminderStorage'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBan, faEdit, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'

const localVue = createLocalVue()
localVue.use(Vuex)
library.add(faBan, faEdit, faTrash, faXmark)
localVue.component('font-awesome-icon', FontAwesomeIcon)

describe('Reminder', () => {
  const spy = jest.fn()

  const reminder = {
    id: '123-456',
    description: 'Event 01',
    dateTime: DateTime.now(),
    city: 'Los Angeles',
    color: 'bg-red-600',
    weatherForecast: 'light rain',
    weatherIcon: '10n',
  }

  const build = (options) => {
    return mount(Reminder, {
      localVue,
      store: new Vuex.Store({
        modules: {
          dateInfo: { ...dateInfo },
          reminderStorage: { ...reminderStorage },
        },
      }),
      ...options,
      destroyed() {
        spy()
      },
    })
  }

  test('Is a Vue instance', () => {
    const { vm } = build({
      propsData: {
        reminderData: reminder,
      },
    })
    expect(vm).toBeTruthy()
  })

  test('Click Dialog Buttons', async () => {
    const wrapper = build()

    expect(wrapper.html()).toMatchSnapshot()

    let labelReminder = wrapper.findComponent('.reminder-description')
    await labelReminder.trigger('click')
    expect(wrapper.vm.showDetails).toBeTruthy()

    let btnClose = wrapper.findComponent('#btn-close-dialog')
    await btnClose.trigger('click')
    expect(wrapper.vm.showDetails).toBeFalsy()

    await labelReminder.trigger('click')

    let btnEdit = wrapper.findComponent('#btn-edit-reminder')
    await btnEdit.trigger('click')
    expect(wrapper.vm.isEditing).toBeTruthy()
  })

  test('Delete Reminder', async () => {
    const wrapper = build()

    const store = new Vuex.Store({
      modules: {
        reminderStorage: reminderStorage,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    let labelReminder = wrapper.findComponent('.reminder-description')
    await labelReminder.trigger('click')
    expect(wrapper.vm.showDetails).toBeTruthy()

    store.state.reminderStorage.reminders = [reminder]

    expect(store.state.reminderStorage.reminders.length).toBe(1)

    let btnDelete = wrapper.findComponent('#btn-delete-reminder')
    await btnDelete.trigger('click')
    expect(spy).toHaveBeenCalled()
  })
})
