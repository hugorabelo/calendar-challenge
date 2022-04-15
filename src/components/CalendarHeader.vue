<template>
  <div class="header flex items-center p-4">
    <form-button id="btn-today" class="mr-2" color="secondary" @click="goToToday()">Today</form-button>
    <form-button
      id="btn-previous"
      color="gray"
      icon="fa-chevron-left"
      size="1x"
      @click="goToPreviousMonth()"
    ></form-button>
    <form-button
      id="btn-previous"
      color="gray"
      icon="fa-chevron-right"
      size="1x"
      @click="goToNextMonth()"
    ></form-button>
    <div class="text-3xl md:text-3xl hidden md:flex long-title">
      {{ headerLongTitle }}
    </div>
    <div class="md:text-3xl md:hidden short-title">
      {{ headerShortTitle }}
    </div>
    <form-button class="hidden md:flex mx-auto mr-0" color="primary" @click="addReminder()" size="sm"
      >Add New Reminder</form-button
    >
    <form-button
      class="md:hidden mx-auto mr-0"
      color="primary"
      @click="addReminder()"
      icon="fa-plus"
      size="1x"
    ></form-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FormButton from './forms/FormButton.vue'

export default {
  components: { FormButton },
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
