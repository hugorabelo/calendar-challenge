<template>
  <div v-if="value" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
    <div class="relative top-20 mx-auto w-1/4 shadow-lg rounded-md bg-white">
      <div class="p-4 divide-y">
        <div class="flex items-center">
          <slot name="title">{{ title }}</slot>
          <div class="text-right mx-auto mr-0">
            <slot name="actions"></slot>
            <button
              id="btn-close-dialog"
              class="rounded-full h-10 w-10 hover:bg-gray-200 text-gray-500"
              @click="closeDialog()"
            >
              <font-awesome-icon icon="fa-solid fa-xmark" />
            </button>
          </div>
        </div>
        <div class="pt-4">
          <slot> </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormModal',
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
