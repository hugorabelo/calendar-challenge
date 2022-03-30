<template>
  <div
    class="flex flex-col box-border border border-gray-300 md:p-4 p-1"
    :class="{ 'bg-blue-50': isWeekend, 'hover:border-blue-700': isAvailable }"
  >
    <div class="w-full justify-items-center">
      <div class="h-8 text-lg text-black font-medium label-day" :class="{ 'text-gray-300': !isAvailable }">
        {{ fullDate.toFormat('d') }}
      </div>
      <div class="w-full flex flex-col">
        <!-- Add Reminder List -->
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import { mapGetters } from 'vuex'

export default {
  name: 'Day',
  props: {
    fullDate: {
      type: Object,
      default: function () {
        return DateTime.now()
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['selectedMonth']),
    isAvailable() {
      return this.fullDate.toFormat('L') == this.selectedMonth.toFormat('L')
    },
    isWeekend() {
      return this.fullDate.toFormat('c') > 5
    },
  },
}
</script>

<style></style>
