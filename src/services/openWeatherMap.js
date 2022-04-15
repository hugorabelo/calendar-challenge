import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'

const API_KEY = process.env.VUE_APP_API_KEY

const http = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  adapter: httpAdapter,
})

export function getWeatherForecastByGeoLocation(geoLocation) {
  let excluded = 'current,alerts,minutely,hourly'
  return http.get(`onecall?lat=${geoLocation.lat}&lon=${geoLocation.lon}&exclude=${excluded}&appid=${API_KEY}`)
}

export function getCityGeoLocation(city) {
  return http.get(`weather?q=${city}&APPID=${API_KEY}`)
}
