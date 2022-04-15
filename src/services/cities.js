import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'

const API_CITY_KEY = process.env.VUE_APP_API_CITY_KEY

const http = axios.create({
  baseURL: 'https://andruxnet-world-cities-v1.p.rapidapi.com/',
  adapter: httpAdapter,
  headers: {
    'X-RapidAPI-Host': 'andruxnet-world-cities-v1.p.rapidapi.com',
    'X-RapidAPI-Key': API_CITY_KEY,
  },
})

export function getCities(partial) {
  return http.get(`?query=${partial}&searchby=city`)
}
