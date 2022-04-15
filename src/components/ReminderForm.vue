<template>
  <div class="">
    <div class="mb-6">
      <form-input
        v-model="formData.description"
        input-id="input-description"
        label="What?"
        icon="fa-note-sticky"
        :is-invalid="$v.formData.description.$error"
      ></form-input>
    </div>
    <div class="mb-6">
      <form-input
        v-model="dateTimeISO"
        type="dateTime"
        input-id="input-datetime"
        label="When?"
        icon="fa-calendar"
        :is-invalid="$v.dateTimeISO.$error"
      ></form-input>
    </div>
    <div class="mb-6">
      <form-input
        v-model="formData.city"
        type="autocomplete"
        input-id="input-city"
        label="Where?"
        :is-invalid="$v.formData.city.$error"
      ></form-input>
    </div>
    <div class="mb-3 space-y-2 w-full">
      <form-input
        v-model="formData.color"
        type="colorPicker"
        input-id="input-color"
        label="Color"
        :is-invalid="$v.formData.color.$error"
      ></form-input>
    </div>
    <div class="flex justify-right">
      <form-button class="ml-auto mr-2 mb-2" color="secondary" @click="cancelEdit()" size="sm">Cancel</form-button>
      <form-button class="mr-2 mb-2" color="primary" @click="save()" size="sm">Save</form-button>
    </div>
    <div v-if="formData.color" class="mt-2 h-7 rounded-lg border" :class="formData.color"></div>
  </div>
</template>

<script>
import * as weatherApi from '@/services/openWeatherMap'
import dateTimeMixins from '@/mixins/dateTimeMixins'
import utilMixins from '@/mixins/utilMixins'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import FormButton from './forms/FormButton.vue'
import FormInput from './forms/FormInput.vue'

export default {
  name: 'ReminderForm',
  components: {
    FormButton,
    FormInput,
  },
  mixins: [dateTimeMixins, utilMixins, validationMixin],
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
  validations: {
    formData: {
      description: {
        required,
      },
      city: {
        required,
      },
      color: {
        required,
      },
    },
    dateTimeISO: {
      required,
    },
  },
  methods: {
    ...mapActions(['updateReminder', 'addReminder']),
    async save() {
      this.$v.$touch()
      if (!this.$v.formData.$invalid && !this.$v.dateTimeISO.$invalid) {
        let { data } = await weatherApi.getCityGeoLocation(this.formData.city)

        let weatherDetails = await weatherApi.getWeatherForecastByGeoLocation(data.coord)
        weatherDetails = weatherDetails.data

        this.formData.weatherForecast = ''
        this.formData.weatherIcon = ''
        let countDays = await this.countDaysFromNow(this.dateTimeISO)
        if (countDays <= weatherDetails.daily.length) {
          this.formData.weatherForecast = weatherDetails.daily[countDays].weather[0].description
          this.formData.weatherIcon = weatherDetails.daily[countDays].weather[0].icon
        }
        this.formData.dateTime = this.dateTimeISO
        if (this.formData.description.length > 30) {
          this.formData.description = this.formData.description.substring(0, 30)
        }
        if (this.isEdit) {
          await this.updateReminder(this.formData)
        } else {
          this.formData.id = this.guid()
          await this.addReminder(this.formData)
        }
        let currentReminder = {
          ...this.formData,
          dateTime: this.getObjectDateTime(this.formData.dateTime),
        }
        this.$emit('save', currentReminder)
      }
    },
    async cancelEdit() {
      this.$emit('cancel')
    },
    errorClassInput(condition) {
      return condition
        ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500'
        : ''
    },
    errorClassText(condition) {
      return condition ? 'text-red-600' : ''
    },
  },
}
</script>

<style></style>
