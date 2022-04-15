<template>
  <div>
    <div
      @click="viewDetails()"
      class="reminder-description text-sm md:text-base text-white rounded cursor-pointer mb-1"
      :class="currentReminder.color"
    >
      {{ currentReminder.description }}
    </div>
    <modal-dialog v-model="showDetails" title="Reminder Details" @close="closeDetails">
      <template v-slot:actions>
        <form-button
          v-if="!isEditing"
          id="btn-edit-reminder"
          color="gray"
          icon="fa-edit"
          size="1x"
          @click="editReminder()"
        ></form-button>
        <form-button
          v-if="!isEditing"
          id="btn-delete-reminder"
          color="gray"
          icon="fa-trash"
          size="1x"
          @click="deleteCurrentReminder()"
        ></form-button>
      </template>
      <template v-slot:footer>
        <div
          v-if="currentReminder.color && !isEditing"
          class="h-7 rounded-lg border"
          :class="currentReminder.color"
        ></div>
      </template>
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
              {{ `${getFullFormattedDate(currentReminder.dateTime)} - ${getFormattedTime(currentReminder.dateTime)}` }}
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
    </modal-dialog>
    <!-- <div
      v-if="showDetails"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      id="my-modal"
    >
      <div class="relative top-20 mx-auto w-1/4 shadow-lg rounded-md bg-white">
        <div class="p-4 divide-y">
          <div class="text-right">
            <form-button
              v-if="!isEditing"
              id="btn-edit-reminder"
              color="gray"
              icon="fa-edit"
              size="1x"
              @click="editReminder()"
            ></form-button>
            <form-button
              v-if="!isEditing"
              id="btn-delete-reminder"
              color="gray"
              icon="fa-trash"
              size="1x"
              @click="deleteCurrentReminder()"
            ></form-button>
            <form-button
              v-if="!isEditing"
              id="btn-close-dialog"
              color="gray"
              icon="fa-xmark"
              size="1x"
              @click="closeDetails()"
            ></form-button>
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
    </div> -->
  </div>
</template>

<script>
import ReminderForm from './ReminderForm.vue'
import ModalDialog from './ModalDialog.vue'
import FormButton from './forms/FormButton.vue'
import dateTimeMixins from '@/mixins/dateTimeMixins'
import { mapActions } from 'vuex'

export default {
  name: 'Reminder',
  components: {
    ReminderForm,
    ModalDialog,
    FormButton,
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
    ...mapActions(['deleteReminder']),
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
    async deleteCurrentReminder() {
      await this.deleteReminder(this.currentReminder)
      this.showDetails = false
      this.$destroy()
    },
  },
}
</script>

<style></style>
