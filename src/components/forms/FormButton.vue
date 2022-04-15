<template>
  <button type="button" :class="getButtonClass" @click="buttonClick()">
    <font-awesome-icon v-if="icon" :icon="`fa-solid ${icon}`" :size="size" />
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'FormButton',
  props: {
    color: {
      type: String,
      default: 'primary',
    },
    icon: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: '1x',
    },
  },
  computed: {
    getButtonClass() {
      let defaultOptions =
        'border focus:ring-4 focus:outline-none font-medium text-sm text-center inline-flex items-center'

      if (this.icon) {
        defaultOptions = `${defaultOptions} rounded-full p-2.5`
      } else {
        defaultOptions = `${defaultOptions} rounded-lg px-5 py-2.5`
      }
      if (this.color == 'danger') {
        return `${defaultOptions} text-red-700 border-red-700 hover:bg-red-700 hover:text-white focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800`
      }
      if (this.color == 'secondary') {
        return `${defaultOptions} text-gray-900 border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-200 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-700`
      }
      if (this.color == 'gray') {
        return `rounded-full h-10 w-10 hover:bg-gray-200 text-gray-500`
      }
      return `${defaultOptions} text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`
    },
  },
  methods: {
    buttonClick() {
      this.$emit('click')
    },
  },
}
</script>

<style></style>
