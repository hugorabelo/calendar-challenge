<template>
  <div class="flex">
    <div
      v-for="(color, index) of colors"
      :key="index"
      class="flex h-8 w-8 mr-2 rounded cursor-pointer"
      :class="color"
      @click="setColor(color)"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'ColorPicker',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      colors: ['bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500'],
    }
  },
  methods: {
    setColor(color) {
      this.$emit('input', color)
    },
  },
}
</script>

<style></style>
