<template>
  <div
    class="flex flex-col box-border border border-gray-300 md:p-4 p-1 day-cell"
    :class="{ 'bg-blue-50': isWeekend, 'hover:border-blue-700': isAvailable }"
    @mouseover="upHere = true"
    @mouseleave="upHere = false"
  >
    <div class="relative w-full justify-items-center">
      <div class="relative h-8 text-lg text-black font-medium label-day" :class="{ 'text-gray-300': !isAvailable }">
        {{ dayLabel }}
      </div>
      <div class="w-full flex flex-col">
        <reminder-list :date="fullDate" :hovering="upHere"></reminder-list>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import { mapGetters } from 'vuex'
import ReminderList from './ReminderList.vue'

export default {
  name: 'Day',
  components: {
    ReminderList,
  },
  props: {
    fullDate: {
      type: Object,
      default: function () {
        return DateTime.now()
      },
    },
  },
  data() {
    return {
      upHere: false,
    }
  },
  computed: {
    ...mapGetters(['selectedMonth', 'reminders']),
    dayLabel() {
      return this.fullDate ? this.fullDate.toFormat('d') : ''
    },
    isAvailable() {
      return this.fullDate ? this.fullDate.toFormat('L') == this.selectedMonth.toFormat('L') : false
    },
    isWeekend() {
      return this.fullDate ? this.fullDate.toFormat('c') > 5 : false
    },
  },
}
</script>

<style>
.day-cell {
  height: calc((100vh - 100px) / 6) !important;
  overflow: hidden;
}
</style>
