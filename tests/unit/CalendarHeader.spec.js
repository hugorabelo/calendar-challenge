import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import CalendarHeader from '@/components/CalendarHeader'
import { DateTime } from 'luxon'
import dateInfo from '@/store/modules/dateInfo'
import reminderStorage from '@/store/modules/reminderStorage'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons'

const localVue = createLocalVue()
localVue.use(Vuex)
library.add(faChevronLeft, faChevronRight, faPlus)
localVue.component('font-awesome-icon', FontAwesomeIcon)

describe('CalendarHeader', () => {
  const build = (options) => {
    return mount(CalendarHeader, {
      localVue,
      store: new Vuex.Store({
        modules: {
          dateInfo: { ...dateInfo },
          reminderStorage: { ...reminderStorage },
        },
      }),
      ...options,
    })
  }

  test('Is a Vue instance', () => {
    const { vm } = build()
    expect(vm).toBeTruthy()
  })

  test('Header title is working', () => {
    const wrapper = build()

    let currentMonth = DateTime.now().startOf('month')
    let longTitle = currentMonth.toLocaleString({ month: 'long', year: 'numeric' })
    let shortTitle = currentMonth.toLocaleString({ month: 'short', year: 'numeric' })

    expect(wrapper.vm.headerLongTitle).toBe(longTitle)

    expect(wrapper.vm.headerShortTitle).toBe(shortTitle)

    expect(wrapper.html()).toMatchSnapshot()

    const longLabel = wrapper.findComponent('.long-title')
    expect(longLabel.text()).toBe(longTitle)

    const shortLabel = wrapper.findComponent('.short-title')
    expect(shortLabel.text()).toBe(shortTitle)
  })

  test('Click buttons', async () => {
    const wrapper = build()

    expect(wrapper.html()).toMatchSnapshot()

    let btnToday = wrapper.findComponent('#btn-today')
    let btnPrevious = wrapper.findComponent('#btn-previous')
    let btnNext = wrapper.findComponent('#btn-next')

    await btnToday.trigger('click')
    expect(wrapper.emitted('today')).toBeTruthy()

    await btnPrevious.trigger('click')
    expect(wrapper.emitted('previousMonth')).toBeTruthy()

    await btnNext.trigger('click')
    expect(wrapper.emitted('nextMonth')).toBeTruthy()
  })
})
