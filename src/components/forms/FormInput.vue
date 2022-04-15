<template>
  <div>
    <label
      :for="inputId"
      class="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      :class="errorClassText"
      >{{ label }}</label
    >
    <div class="relative">
      <div v-if="icon" class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <font-awesome-icon
          v-if="icon"
          :icon="`fa-solid ${icon}`"
          class="w-5 h-5 text-gray-500"
          :class="errorClassText"
        />
      </div>
      <input
        v-if="type == 'text'"
        :id="inputId"
        class="w-full pl-10 p-2.5"
        :class="classInput"
        :value="value"
        @input="changeValue"
        maxlength="30"
      />

      <div v-if="type == 'dateTime'" :class="classInput">
        <vue-date-time
          input-id="input-datetime"
          input-class="bg-transparent w-full pl-10 p-2.5 cursor-pointer"
          :value="value"
          @input="changeValue"
          use12-hour
          type="datetime"
        ></vue-date-time>
      </div>

      <autocomplete-cities
        v-if="type == 'autocomplete'"
        :item-class="classInput"
        :value="value"
        @input="changeValue"
      ></autocomplete-cities>

      <color-picker v-if="type == 'colorPicker'" id="input-color" :value="value" @input="changeValue"></color-picker>
    </div>
    <div class="text-left text-sm mt-1" :class="errorClassText" v-if="isInvalid">{{ label }} is required</div>
  </div>
</template>

<script>
import { Datetime as VueDateTime } from 'vue-datetime'
import ColorPicker from '../ColorPicker.vue'
import AutocompleteCities from './AutocompleteCities.vue'

export default {
  name: 'FormInput',
  components: {
    ColorPicker,
    VueDateTime,
    AutocompleteCities,
  },
  props: {
    value: {
      type: String,
    },
    type: {
      type: String,
      default: 'text',
    },
    inputId: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    isInvalid: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    errorClassInput() {
      return this.isInvalid
        ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500'
        : ''
    },
    errorClassText() {
      return this.isInvalid ? 'text-red-600' : ''
    },
    classInput() {
      return `${this.errorClassInput} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`
    },
  },
  methods: {
    changeValue(event) {
      switch (this.type) {
        case 'text':
          this.$emit('input', event.target.value)
          break
        default:
          this.$emit('input', event)
          break
      }
    },
  },
}
</script>

<style></style>
