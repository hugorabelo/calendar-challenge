<template>
  <div>
    <div class="w-full flex flex-col">
      <reminder v-for="reminder of remindersForDay" :key="reminder.id" :reminderData="reminder"></reminder>
    </div>
    <span class="absolute top-0 right-0" v-if="showDeleteAll">
      <button
        type="button"
        class="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800"
        @click="deleteAllReminders()"
      >
        <font-awesome-icon icon="fa-solid fa-calendar-xmark " size="sm" />
      </button>
    </span>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import Reminder from './Reminder.vue'
import dateTimeMixins from '@/mixins/dateTimeMixins'
import * as reminderApi from '@/services/reminders'

export default {
  name: 'ReminderList',
  components: {
    Reminder,
  },
  mixins: [dateTimeMixins],
  props: {
    date: {
      type: Object,
      default: function () {
        return DateTime.now()
      },
    },
    hovering: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    remindersForDay() {
      let reminders = reminderApi.getReminders().filter((reminder) => {
        let reminderDate = this.getObjectDateTime(reminder.dateTime).startOf('day')
        let currentDay = this.getObjectDateTime(this.date).startOf('day')
        return reminderDate.equals(currentDay)
      })
      reminders.sort(this.compareTime)
      return reminders
    },
    showDeleteAll() {
      return this.hovering && this.remindersForDay.length > 0
    },
  },
  methods: {
    compareTime(a, b) {
      a = this.getObjectDateTime(a.dateTime)
      b = this.getObjectDateTime(b.dateTime)
      if (a.toMillis() < b.toMillis()) {
        return -1
      }
      if (a.toMillis() > b.toMillis()) {
        return 1
      }
      return 0
    },
    deleteAllReminders() {
      reminderApi.deleteRemindersGroup(this.remindersForDay)
    },
  },
}
</script>

<style></style>
