<template>
  <div class="container mx-auto">
    <calendar-header
      @today="today()"
      @previousMonth="previousMonth()"
      @nextMonth="nextMonth()"
      @addReminder="addReminder()"
    ></calendar-header>
    <div class="grid grid-cols-7 border border-gray-300 h-screen-adjust">
      <day v-for="(day, index) in days" :fullDate="day" :key="index"></day>
    </div>
    <modal-dialog v-model="showDialogAddReminder" title="Add New Reminder" @close="closeDialogAddReminder">
      <reminder-form @save="saveNewReminder()" @cancel="closeDialogAddReminder"></reminder-form>
    </modal-dialog>
  </div>
</template>

<script>
import { Interval } from 'luxon'
import CalendarHeader from './CalendarHeader'
import Day from './Day'
import { mapActions, mapGetters } from 'vuex'
import ModalDialog from './ModalDialog.vue'
import ReminderForm from './ReminderForm.vue'

export default {
  name: 'Calendar',
  components: {
    CalendarHeader,
    Day,
    ModalDialog,
    ReminderForm,
  },
  data() {
    return {
      days: [],
      showDialogAddReminder: false,
    }
  },
  computed: {
    ...mapGetters(['selectedMonth']),
  },
  mounted() {
    this.fetchDaysOfSelectedMonth()
  },
  methods: {
    ...mapActions(['initSelectedMonth', 'goToNextMonth', 'goToPreviousMonth']),
    fetchDaysOfSelectedMonth() {
      this.days = []
      let firstDayOfMonth = this.selectedMonth.startOf('month')
      let lastDayOfMonth = this.selectedMonth.endOf('month')
      let dayOfWeek = firstDayOfMonth.toFormat('c')
      var currentDay

      if (dayOfWeek != 7) {
        for (var i = dayOfWeek; i > 0; i--) {
          currentDay = firstDayOfMonth.minus({ days: i })
          this.days.push(currentDay)
        }
      }

      currentDay = firstDayOfMonth
      while (Interval.fromDateTimes(currentDay, lastDayOfMonth).length('days') > 0) {
        this.days.push(currentDay)
        currentDay = currentDay.plus({ days: 1 })
      }
      dayOfWeek = currentDay.toFormat('c')
      if (dayOfWeek != 7) {
        for (var j = 0; j < 7 - dayOfWeek; j++) {
          this.days.push(currentDay)
          currentDay = currentDay.plus({ days: 1 })
        }
      }
    },
    today() {
      this.initSelectedMonth()
      this.fetchDaysOfSelectedMonth()
    },
    previousMonth() {
      this.goToPreviousMonth()
      this.fetchDaysOfSelectedMonth()
    },
    nextMonth() {
      this.goToNextMonth()
      this.fetchDaysOfSelectedMonth()
    },
    addReminder() {
      this.showDialogAddReminder = true
    },
    closeDialogAddReminder() {
      this.showDialogAddReminder = false
    },
    saveNewReminder() {
      this.closeDialogAddReminder()
      this.fetchDaysOfSelectedMonth()
    },
  },
}
</script>

<style scoped></style>
