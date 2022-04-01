<template>
  <div class="">
    <div class="mb-6">
      <label for="input-description" class="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >What?</label
      >
      <div class="relative">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <font-awesome-icon icon="fa-solid fa-note-sticky" class="w-5 h-5 text-gray-500" />
        </div>
        <input
          id="input-description"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="formData.description"
          maxlength="30"
        />
      </div>
    </div>
    <div class="mb-6">
      <label for="input-datetime" class="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >When?</label
      >
      <div class="relative">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <font-awesome-icon icon="fa-solid fa-calendar" class="w-5 h-5 text-gray-500" />
        </div>
        <div
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <vue-date-time input-id="input-datetime" v-model="dateTimeISO" use12-hour type="datetime"></vue-date-time>
        </div>
      </div>
    </div>
    <div class="mb-6">
      <label for="input-city" class="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Where?</label
      >
      <div class="relative">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <font-awesome-icon icon="fa-solid fa-location-dot" class="w-5 h-5 text-gray-500" />
        </div>
        <select
          id="input-city"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="formData.city"
        >
          <option v-for="(city, index) of cities" :key="index">{{ city }}</option>
        </select>
      </div>
    </div>
    <div class="mb-3 space-y-2 w-full text-xs">
      <label for="input-color" class="flex font-semibold text-gray-800 text-left">Please select a color</label>
      <color-picker id="input-color" v-model="formData.color"></color-picker>
    </div>
    <div class="flex justify-right">
      <button
        id="btn-cancel"
        class="mx-auto py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        @click="cancelEdit()"
      >
        Cancel
      </button>
      <button
        id="btn-save"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        @click="save()"
      >
        Save
      </button>
    </div>
    <div v-if="formData.color" class="mt-2 h-7 rounded-lg border" :class="formData.color"></div>
  </div>
</template>

<script>
import ColorPicker from './ColorPicker.vue'
import * as reminderApi from '@/services/reminders'
import * as weatherApi from '@/services/openWeatherMap'
import dateTimeMixins from '@/mixins/dateTimeMixins'
import { Datetime as VueDateTime } from 'vue-datetime'

export default {
  name: 'ReminderForm',
  components: {
    ColorPicker,
    VueDateTime,
  },
  mixins: [dateTimeMixins],
  props: {
    editingReminder: {
      type: Object,
      default: function () {
        return {
          id: null,
          description: null,
          dateTime: null,
          city: null,
          color: null,
          weatherForecast: null,
          weatherIcon: null,
        }
      },
    },
  },
  data() {
    return {
      formData: {
        ...this.editingReminder,
      },
      dateTimeISO: this.getISODateTime(this.editingReminder.dateTime),
      cities: [
        'Tokyo',
        'Jakarta',
        'Delhi',
        'Seoul',
        'Shanghai',
        'Beijing',
        'New York',
        'Sao Paulo',
        'Mexico City',
        'Los Angeles',
        'Buenos Aires',
        'Istanbul',
        'Rio de Janeiro',
        'Paris',
        'London',
      ],
    }
  },
  computed: {
    isEdit() {
      return this.formData.id !== null
    },
  },
  methods: {
    async save() {
      let { data } = await weatherApi.getWeatherForecast(this.formData.city)
      this.formData.weatherForecast = ''
      this.formData.weatherIcon = ''
      let countDays = await this.countDaysFromNow(this.dateTimeISO)
      if (countDays <= data.daily.length) {
        this.formData.weatherForecast = data.daily[countDays].weather[0].description
        this.formData.weatherIcon = data.daily[countDays].weather[0].icon
      }
      this.formData.dateTime = this.dateTimeISO
      if (this.formData.description.length > 30) {
        this.formData.description = this.formData.description.substring(0, 30)
      }
      if (this.isEdit) {
        await reminderApi.updateReminder(this.formData)
      } else {
        this.formData.id = this.guid()
        await reminderApi.addReminder(this.formData)
      }
      let currentReminder = {
        ...this.formData,
        dateTime: this.getObjectDateTime(this.formData.dateTime),
      }
      this.$emit('save', currentReminder)
    },
    async cancelEdit() {
      this.$emit('cancel')
    },
    guid() {
      return (
        this.s4() +
        this.s4() +
        '-' +
        this.s4() +
        '-' +
        this.s4() +
        '-' +
        this.s4() +
        '-' +
        this.s4() +
        this.s4() +
        this.s4()
      )
    },
    s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    },
  },
}
</script>

<style></style>
