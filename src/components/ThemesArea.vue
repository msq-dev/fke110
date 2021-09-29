<template>
  <div class="themes-area">
    <collapsible
      v-for="theme in themes"
      :open="isCurrentTheme(theme.id)"
      :title="theme.name"
      :key="theme.id"
      @toggle="handleToggle(theme.id)"
    >
      <FilmList
        :open="isCurrentTheme(theme.id)"
        :filmList="getFilmsByTheme(theme.id)"
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
    themes: Array
  },
  data() {
    return {
      currentTheme: "64",
    }
  },
  methods: {
    getFilmsByTheme(id) {
      return this.films.filter(f => f.theme_id === id)
    },
    isCurrentTheme(id) {
      return id === this.currentTheme
    },
    handleToggle(id) {
      if (!this.currentTheme) {
        this.currentTheme = id
      }
      else if (this.currentTheme === id) {
        this.currentTheme = null
      } else {
        this.currentTheme = id
      }
    }
  },
}
</script>

<style scoped>
.themes-area {
  width: 100%;
}

</style>