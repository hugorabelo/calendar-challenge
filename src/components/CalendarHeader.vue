<template>
  <div class="header flex items-center p-4">
    <button
      id="btn-today"
      class="border rounded-md h-10 border-color-gray-200 hover:bg-gray-200 p-2 mr-6"
      @click="goToToday()"
    >
      Today
    </button>
    <button id="btn-previous" class="rounded-full h-10 w-10 hover:bg-gray-200 mr-1" @click="goToPreviousMonth()">
      <font-awesome-icon icon="fa-solid fa-chevron-left" />
    </button>
    <button id="btn-next" class="rounded-full h-10 w-10 hover:bg-gray-200 mr-8" @click="goToNextMonth()">
      <font-awesome-icon icon="fa-solid fa-chevron-right" />
    </button>
    <div class="text-3xl md:text-3xl hidden md:flex long-title">
      {{ headerLongTitle }}
    </div>
    <div class="text-lg md:text-3xl md:hidden short-title">
      {{ headerShortTitle }}
    </div>
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
  },
}
</script>

<style></style>
