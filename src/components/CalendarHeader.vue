<template>
  <div class="header flex items-center p-4">
    <button
      id="btn-today"
      class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      @click="goToToday()"
    >
      Today
    </button>
    <button id="btn-previous" class="rounded-full h-10 w-10 hover:bg-gray-200 mr-1" @click="goToPreviousMonth()">
      <font-awesome-icon icon="fa-solid fa-chevron-left" />
    </button>
    <button id="btn-next" class="rounded-full h-10 w-10 hover:bg-gray-200 mr-2 md:mr-8" @click="goToNextMonth()">
      <font-awesome-icon icon="fa-solid fa-chevron-right" />
    </button>
    <div class="text-3xl md:text-3xl hidden md:flex long-title">
      {{ headerLongTitle }}
    </div>
    <div class="md:text-3xl md:hidden short-title">
      {{ headerShortTitle }}
    </div>
    <button
      id="btn-add-reminder"
      class="hidden md:flex mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      @click="addReminder()"
    >
      Add New Reminder
    </button>
    <button
      type="button"
      class="mx-auto mr-0 md:hidden text-white border bg-blue-700 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
      @click="addReminder()"
    >
      <font-awesome-icon icon="fa-solid fa-plus" />
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CalendarHeader',
  computed: {
    ...mapGetters(['selectedMonth']),
    headerLongTitle() {
      return this.selectedMonth.toLocaleString({ month: 'long', year: 'numeric' })
    },
    headerShortTitle() {
      return this.selectedMonth.toLocaleString({ month: 'short', year: 'numeric' })
    },
  },
  methods: {
    goToToday() {
      this.$emit('today')
    },
    goToPreviousMonth() {
      this.$emit('previousMonth')
    },
    goToNextMonth() {
      this.$emit('nextMonth')
    },
    addReminder() {
      this.$emit('addReminder')
    },
  },
}
</script>

<style></style>
