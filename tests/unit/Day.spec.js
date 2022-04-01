import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Day from '@/components/Day'
import { DateTime } from 'luxon'
import dateInfo from '@/store/modules/dateInfo'
import reminderStorage from '@/store/modules/reminderStorage'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Day', () => {
  const build = (options) => {
    return mount(Day, {
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

  test('Is a Vue instance and valid date', () => {
    const { vm } = build()
    expect(vm).toBeTruthy()

    expect(DateTime.isDateTime(vm.fullDate)).toBeTruthy()
    expect(vm.fullDate.isValid).toBeTruthy()

    const dayOne = build({
      propsData: {
        fullDate: DateTime.fromISO('2022-13-03T00:00:00'),
      },
    })
    expect(DateTime.isDateTime(dayOne.vm.fullDate)).toBeTruthy()
    expect(dayOne.vm.fullDate.isValid).toBeFalsy()
  })

  test('Is day available', () => {
    const dayOne = build()
    expect(dayOne.vm.isAvailable).toBeTruthy()

    const dayTwo = build({
      propsData: {
        fullDate: DateTime.now().plus({ months: 1 }),
      },
    })
    expect(dayTwo.vm.isAvailable).toBeFalsy()
  })

  test('Is weekend', () => {
    const dayOne = build({
      propsData: {
        fullDate: DateTime.fromISO('2022-04-03T00:00:00'),
      },
    })
    expect(dayOne.vm.isWeekend).toBeTruthy()

    const dayTwo = build({
      propsData: {
        fullDate: DateTime.fromISO('2022-04-01T00:00:00'),
      },
    })
    expect(dayTwo.vm.isWeekend).toBeFalsy()
  })

  test('Get day label', () => {
    const dayOne = build()
    expect(dayOne.html()).toMatchSnapshot()

    const labelOne = dayOne.findComponent('.label-day')
    expect(labelOne.text()).toBe(dayOne.vm.fullDate.toFormat('d'))

    const dayTwo = build({
      propsData: {
        fullDate: DateTime.fromISO('2022-04-17T00:00:00'),
      },
    })
    const labelTwo = dayTwo.findComponent('.label-day')
    expect(labelTwo.text()).toBe('17')
  })
})
