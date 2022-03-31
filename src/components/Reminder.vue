<template>
  <div>
    <div
      @click="viewDetails()"
      class="reminder-description text-sm md:text-base text-white rounded cursor-pointer mb-1"
      :class="currentReminder.color"
    >
      {{ currentReminder.description }}
    </div>
    <div v-if="showDetails" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div class="relative top-20 mx-auto w-1/4 shadow-lg rounded-md bg-white">
        <div class="p-4 divide-y">
          <div class="text-right">
            <button
              v-if="!isEditing"
              id="btn-edit-reminder"
              class="rounded-full h-10 w-10 hover:bg-gray-200 text-gray-500"
              @click="editReminder()"
            >
              <font-awesome-icon icon="fa-solid fa-edit" />
            </button>
            <button
              v-if="!isEditing"
              id="btn-delete-reminder"
              class="rounded-full h-10 w-10 hover:bg-gray-200 text-gray-500"
              @click="deleteReminder()"
            >
              <font-awesome-icon icon="fa-solid fa-trash" />
            </button>
            <button
              id="btn-close-dialog"
              class="rounded-full h-10 w-10 hover:bg-gray-200 text-gray-500"
              @click="closeDetails()"
            >
              <font-awesome-icon icon="fa-solid fa-xmark" />
            </button>
          </div>
          <div v-if="isEditing" class="mt-1 pt-3">
            <reminder-form :editing-reminder="currentReminder" @save="saveEdit" @cancel="cancelEdit"></reminder-form>
          </div>
          <div v-else class="grid grid-cols-3 mt-1 pt-2">
            <div class="col-span-2 text-left">
              <div class="flex">
                <h3 class="text-lg leading-6 font-medium text-gray-900 py-1">
                  {{ currentReminder.description }}
                </h3>
              </div>
              <div class="mt-3">
                <p class="text-sm text-gray-900">
                  {{
                    `${getFullFormattedDate(currentReminder.dateTime)} - ${getFormattedTime(currentReminder.dateTime)}`
                  }}
                </p>
                <p class="text-sm text-gray-900">
                  {{ currentReminder.city }}
                </p>
              </div>
            </div>
            <div class="flex mt-3 items-center">
              <div class="flex flex-col float-right mx-auto mr-0">
                <div
                  class="flex w-16 h-16 rounded-full bg-opacity-40 justify-center items-center mx-auto"
                  :class="currentReminder.color"
                >
                  <img
                    v-if="currentReminder.weatherIcon"
                    :src="`http://openweathermap.org/img/wn/${currentReminder.weatherIcon}@2x.png`"
                  />
                  <font-awesome-icon v-else icon="fa-solid fa-ban" class="text-gray-500" size="2x" />
                </div>
                <div class="text-sm text-gray-900">{{ currentReminder.weatherForecast }}</div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="currentReminder.color && !isEditing"
          class="h-7 rounded-lg border"
          :class="currentReminder.color"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import ReminderForm from './ReminderForm.vue'
import dateTimeMixins from '@/mixins/dateTimeMixins'
import * as reminderApi from '@/services/reminders'

export default {
  name: 'Reminder',
  components: {
    ReminderForm,
  },
  mixins: [dateTimeMixins],
  props: {
    reminderData: {
      type: Object,
      default: function () {
        return {
          id: null,
          description: null,
          dateTime: null,
          city: null,
          color: null,
          weatherForecast: null,
          weatherIcon: null,
        }
      },
    },
  },
  data() {
    return {
      currentReminder: {
        ...this.reminderData,
        dateTime: this.getObjectDateTime(this.reminderData.dateTime),
      },
      showDetails: false,
      isEditing: false,
    }
  },
  methods: {
    async viewDetails() {
      this.isEditing = false
      this.showDetails = true
    },
    closeDetails() {
      this.showDetails = false
    },
    editReminder() {
      this.isEditing = true
    },
    cancelEdit() {
      this.isEditing = false
    },
    async saveEdit(newReminder) {
      this.currentReminder = newReminder
      this.isEditing = false
    },
    async deleteReminder() {
      await reminderApi.deleteReminder(this.currentReminder)
      this.showDetails = false
      this.$destroy()
    },
  },
}
</script>

<style></style>
