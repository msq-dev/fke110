<template>
  <div class="film-list" v-if="open">
    <div
      v-for="film in filmList"
      :key="film.id"      
      class="film-item"
    >
      <FilmItem :film="film" />
    </div>
    <div>
      <strong>
        Gesamtlaufzeit: {{ filmList | totalDuration }}
      </strong>
    </div>
  </div>
</template>

<script>
import FilmItem from "./FilmItem.vue";

export default {
  name: "FilmList",
  components: {
    FilmItem
  },
  props: {
    open: Boolean,
    filmList: Array
  }
}
</script>

<style scoped>
.film-list {
  margin-left: 1rem;
}

.film-item {
  margin-bottom: 1rem;
  cursor: pointer;
}

</style>