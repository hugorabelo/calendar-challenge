import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import flushPromisses from 'flush-promises'
import nock from 'nock'
import * as weatherApi from '@/services/openWeatherMap'
import ReminderForm from '@/components/ReminderForm'
import { DateTime } from 'luxon'
import dateInfo from '@/store/modules/dateInfo'
import reminderStorage from '@/store/modules/reminderStorage'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBan,
  faEdit,
  faTrash,
  faXmark,
  faNoteSticky,
  faCalendar,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons'
import weatherData from './fixtures/weatherData'
import cityData from './fixtures/cityData'

const localVue = createLocalVue()
localVue.use(Vuex)
library.add(faBan, faEdit, faTrash, faXmark, faNoteSticky, faCalendar, faLocationDot)
localVue.component('font-awesome-icon', FontAwesomeIcon)

describe('ReminderForm', () => {
  const spy = jest.fn()

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
    return mount(ReminderForm, {
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

  test('Save new reminder', async () => {
    const wrapper = build({
      propsData: { dateTimeISO: reminder.dateTime },
    })

    const requestCity = nock('https://api.openweathermap.org/data/2.5')
      .persist()
      .get('/weather')
      .query(expectedDataCity)
      .reply(200, cityData)

    const requestWeather = nock('https://api.openweathermap.org/data/2.5')
      .persist()
      .get('/onecall')
      .query(expectedDataWeather)
      .reply(200, weatherData)

    const responseCity = await weatherApi.getCityGeoLocation(reminder.city)
    await flushPromisses()

    const responseWeather = await weatherApi.getWeatherForecast(cityData)
    await flushPromisses()

    expect(responseCity.data).toEqual(cityData)
    expect(requestCity.isDone()).toBe(true)

    expect(responseWeather.data).toEqual(weatherData)
    expect(requestWeather.isDone()).toBe(true)

    expect(wrapper.html()).toMatchSnapshot()

    let inputDescription = wrapper.findComponent('#input-description')
    let options = wrapper.findComponent('#input-city').findAll('option')
    let btnSave = wrapper.findComponent('#btn-save')

    await inputDescription.setValue(reminder.description)
    await options.at(-1).setSelected()

    await btnSave.trigger('click')
    expect(wrapper.emitted('save')).toBeTruthy()
  })
})
