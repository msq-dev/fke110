<template>
  <div class="list-section">
    <collapsible
      v-for="item in list"
      :open="isCurrentItem(item.id)"
      :title="item.name"
      :key="item.id"
      @toggle="handleToggle(item.id)"
    >
      <FilmList
        :open="isCurrentItem(item.id)"
        :filmList="getFilmsByItemId(item.id)"
      />
    </collapsible>
  </div>
</template>

<script>
import Collapsible from "./Collapsible.vue"
import FilmList from "./FilmList.vue"

export default {
  components: { 
    Collapsible,
    FilmList
  },
  props: {
    films: Array,
    list: Array,
    itemId: String
  },
  data() {
    return {
      currentItem: null,
    }
  },
  methods: {
    getFilmsByItemId(id) {
      return this.films.filter(f => f[this.itemId] === id)
    },
    isCurrentItem(id) {
      return id === this.currentItem
    },
    handleToggle(id) {
      if (!this.currentItem) {
        this.currentItem = id
      }
      else if (this.currentItem === id) {
        this.currentItem = null
      } else {
        this.currentItem = id
      }
    }
  },
}
</script>

<style scoped>
.list-section {
  width: 100%;
}

</style>