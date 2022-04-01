import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'

const API_KEY = '0d8aa4b5581a5331b53fe1c53c106c4f'

const http = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  adapter: httpAdapter,
})

export async function getWeatherForecast(city) {
  let excluded = 'current,alerts,minutely,hourly'
  return await http.get(`onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&exclude=${excluded}&appid=${API_KEY}`)
}

export function getWeatherForecastByGeoLocation(geoLocation) {
  let excluded = 'current,alerts,minutely,hourly'
  return http.get(`onecall?lat=${geoLocation.lat}&lon=${geoLocation.lon}&exclude=${excluded}&appid=${API_KEY}`)
}

export function getCityGeoLocation(city) {
  return http.get(`weather?q=${city}&APPID=${API_KEY}`)
}
