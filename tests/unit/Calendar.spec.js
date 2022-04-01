import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Calendar from '@/components/Calendar'
import { DateTime } from 'luxon'
import dateInfo from '@/store/modules/dateInfo'
import reminderStorage from '@/store/modules/reminderStorage'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBan,
  faCalendar,
  faChevronLeft,
  faChevronRight,
  faEdit,
  faLocationDot,
  faNoteSticky,
  faPlus,
  faTrash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import flushPromisses from 'flush-promises'
import nock from 'nock'
import * as weatherApi from '@/services/openWeatherMap'
import weatherData from './fixtures/weatherData'
import cityData from './fixtures/cityData'

const localVue = createLocalVue()
localVue.use(Vuex)
library.add(
  faChevronLeft,
  faChevronRight,
  faPlus,
  faBan,
  faEdit,
  faTrash,
  faXmark,
  faNoteSticky,
  faCalendar,
  faLocationDot
)
localVue.component('font-awesome-icon', FontAwesomeIcon)

describe('Calendar', () => {
  const expectedDataCity = {
    q: 'London',
    APPID: '0d8aa4b5581a5331b53fe1c53c106c4f',
  }

  const expectedDataWeather = {
    lat: '51.5085',
    lon: '-0.1257',
    exclude: 'current,alerts,minutely,hourly',
    appid: '0d8aa4b5581a5331b53fe1c53c106c4f',
  }

  const reminder = {
    id: '123-456',
    description: 'Event 01',
    dateTime: DateTime.now().toISO(),
    city: 'London',
    color: 'bg-red-600',
    weatherForecast: 'light rain',
    weatherIcon: '10n',
  }

  const build = (options) => {
    return mount(Calendar, {
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

  test('Ability to add a new "reminder" for a user entered day and time. Also, include a city.', async () => {
    const wrapper = build()
    const requestCity = nock('https://api.openweathermap.org/data/2.5')
      .persist()
      .get('/weather')
      .query(expectedDataCity)
      .reply(200, cityData)

    const responseCity = await weatherApi.getCityGeoLocation(reminder.city)
    await flushPromisses()

    expect(responseCity.data).toEqual(cityData)
    expect(requestCity.isDone()).toBe(true)

    const requestWeather = nock('https://api.openweathermap.org/data/2.5')
      .persist()
      .get('/onecall')
      .query(expectedDataWeather)
      .reply(200, weatherData)

    const responseWeather = await weatherApi.getWeatherForecast(reminder.city)
    await flushPromisses()

    expect(responseWeather.data).toEqual(weatherData)
    expect(requestWeather.isDone()).toBe(true)

    expect(wrapper.html()).toMatchSnapshot()

    let btnAddReminder = wrapper.findComponent('#btn-add-reminder')
    await btnAddReminder.trigger('click')

    let btnCloseDialog = wrapper.findComponent('#btn-close-dialog')
    await btnCloseDialog.trigger('click')

    await btnAddReminder.trigger('click')

    let inputDescription = wrapper.findComponent('#input-description')
    let options = wrapper.findComponent('#input-city').findAll('option')
    // let reminderForm = wrapper.findComponent('reminder-form')
    let btnSave = wrapper.findComponent('#btn-save')

    await inputDescription.setValue(reminder.description)
    await options.at(-1).setSelected()

    await btnSave.trigger('click')
    expect(wrapper.emitted('save')).toBeTruthy()
  })
})
