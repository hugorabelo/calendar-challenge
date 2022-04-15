<template>
  <div class="autocomplete">
    <input
      :class="itemClass"
      class="w-full p-2.5"
      type="text"
      @input="onChange"
      v-model="search"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
    />
    <ul id="autocomplete-results" v-show="isOpen" class="autocomplete-results">
      <li class="loading" v-if="isLoading">Loading results...</li>
      <li
        v-else
        v-for="(result, i) in results"
        :key="i"
        @click="setResult(result)"
        class="autocomplete-result"
        :class="{ 'is-active': i === arrowCounter }"
      >
        {{ result }}
      </li>
    </ul>
  </div>
</template>

<script>
import * as cityApi from '@/services/cities'

export default {
  name: 'AutocompleteCities',
  props: {
    value: {
      type: String,
      default: '',
    },
    isAsync: {
      type: Boolean,
      required: false,
      default: false,
    },
    itemClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isOpen: false,
      items: [],
      results: [],
      search: '',
      isLoading: false,
      arrowCounter: -1,
    }
  },
  async mounted() {
    this.search = this.value
    document.addEventListener('click', this.handleClickOutside)
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    setResult(result) {
      this.search = result
      this.$emit('input', this.search)
      this.isOpen = false
    },
    filterResults() {
      this.results = this.items.filter((item) => {
        return item.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      })
    },
    async onChange() {
      if (this.search.length > 2) {
        let { data } = await cityApi.getCities(this.search)
        this.items = []
        data.forEach((item) => {
          this.items.push(item.city)
        })

        this.$emit('input', this.search)

        if (this.isAsync) {
          this.isLoading = true
        } else {
          this.filterResults()
          this.isOpen = true
        }
      }
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false
        this.arrowCounter = -1
      }
    },
    onArrowDown() {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1
      }
    },
    onEnter() {
      this.search = this.results[this.arrowCounter]
      this.isOpen = false
      this.arrowCounter = -1
    },
  },
}
</script>

<style>
.autocomplete {
  position: relative;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 120px;
  overflow: auto;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #1d4ed8;
  color: white;
}
</style>
