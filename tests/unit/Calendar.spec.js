import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Calendar from '@/components/Calendar'
import { DateTime } from 'luxon'
import dateInfo from '@/store/modules/dateInfo'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSun, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const localVue = createLocalVue()
localVue.use(Vuex)
library.add(faSun, faChevronLeft, faChevronRight)
localVue.component('font-awesome-icon', FontAwesomeIcon)

describe('Calendar', () => {
  const build = (options) => {
    return mount(Calendar, {
      localVue,
      store: new Vuex.Store({
        modules: {
          dateInfo: { ...dateInfo },
        },
      }),
      ...options,
    })
  }

  test('Is a Vue instance and have days', () => {
    const { vm } = build()
    expect(vm).toBeTruthy()

    expect(vm.days.length).toBeGreaterThan(0)
  })

  test('Navigate by months', async () => {
    const wrapper = build()

    const store = new Vuex.Store({
      modules: {
        dateInfo: dateInfo,
      },
    })

    let currentMonth = DateTime.now().startOf('month')
    let nextMonth = currentMonth.plus({ months: 1 })
    let previousMonth = currentMonth.minus({ months: 1 })

    expect(wrapper.html()).toMatchSnapshot()

    let btnToday = wrapper.findComponent('#btn-today')
    let btnPrevious = wrapper.findComponent('#btn-previous')
    let btnNext = wrapper.findComponent('#btn-next')

    await btnToday.trigger('click')
    expect(currentMonth).toEqual(store.state.dateInfo.selectedMonth)

    await btnPrevious.trigger('click')
    expect(previousMonth).toEqual(store.state.dateInfo.selectedMonth)

    await btnNext.trigger('click')
    expect(currentMonth).toEqual(store.state.dateInfo.selectedMonth)

    await btnNext.trigger('click')
    expect(nextMonth).toEqual(store.state.dateInfo.selectedMonth)
  })

  test('First day of the month is Sunday', async () => {
    const store = new Vuex.Store({
      modules: {
        dateInfo: dateInfo,
      },
    })

    let currentMonth = DateTime.fromISO('2022-05-01')
    store.state.dateInfo.selectedMonth = currentMonth

    const { vm } = build()

    expect(vm.days.length).toBe(35)
  })
})
