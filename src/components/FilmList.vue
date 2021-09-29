<template>
  <div class="film-list" v-if="open">
    <div
      v-for="film in filmList"
      :key="film.id"      
      class="film-item"
      @click="showFilmItem = true"
    >
      {{ film.title }}
      
      <!-- <FilmItem v-if="showFilmItem" :film="film" @close="showFilmItem = false"/> -->
    </div>
    <div>
      <strong>
        Gesamtlaufzeit: {{ filmList | totalDuration }}
      </strong>
    </div>
  </div>
</template>

<script>
// import FilmItem from "./FilmItem.vue";

export default {
  name: "FilmList",
  components: {
    // FilmItem
  },
  props: {
    open: Boolean,
    filmList: Array
  },
  data() {
    return {
      showFilmItem: false
    }
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