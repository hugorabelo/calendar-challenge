<template>
  <div v-if="value" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" id="my-modal">
    <div class="relative top-20 mx-auto w-1/4 shadow-lg rounded-md bg-white">
      <div class="p-4 divide-y">
        <div class="flex items-center">
          <slot name="title">{{ title }}</slot>
          <div class="text-right mx-auto mr-0">
            <slot name="actions"></slot>
            <form-button
              id="btn-close-dialog"
              color="gray"
              icon="fa-xmark"
              size="1x"
              @click="closeDialog()"
            ></form-button>
          </div>
        </div>
        <div class="pt-4">
          <slot> </slot>
        </div>
      </div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import FormButton from './forms/FormButton.vue'
export default {
  name: 'FormModal',
  components: {
    FormButton,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },
  },
}
</script>

<style></style>
