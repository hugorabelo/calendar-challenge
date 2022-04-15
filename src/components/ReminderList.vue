<template>
  <div>
    <div class="w-full flex flex-col">
      <reminder v-for="reminder of remindersForDay" :key="reminder.id" :reminderData="reminder"></reminder>
    </div>
    <span class="absolute top-0 right-0" v-if="showDeleteAll">
      <form-button color="danger" icon="fa-calendar-xmark" @click="deleteAllReminders()" size="sm"></form-button>
    </span>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import Reminder from './Reminder.vue'
import FormButton from './forms/FormButton.vue'
import dateTimeMixins from '@/mixins/dateTimeMixins'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ReminderList',
  components: {
    Reminder,
    FormButton,
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
    ...mapGetters(['reminders']),
    remindersForDay() {
      let remindersTemp = this.reminders.filter((reminder) => {
        let reminderDate = this.getObjectDateTime(reminder.dateTime).startOf('day')
        let currentDay = this.getObjectDateTime(this.date).startOf('day')
        return reminderDate.equals(currentDay)
      })
      remindersTemp.sort(this.compareTime)
      return remindersTemp
    },
    showDeleteAll() {
      return this.hovering && this.remindersForDay.length > 0
    },
  },
  methods: {
    ...mapActions(['deleteRemindersGroup']),
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
      this.deleteRemindersGroup(this.remindersForDay)
    },
  },
}
</script>

<style></style>
