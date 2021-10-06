<template>
  <div>
    <div class="film-item" @click="showFilmInfo = true">
      {{ film.title }}
    </div>

    <modal
      :key="'info-' + film.id"
      :open="showFilmInfo"
      @close="handleCloseInfo"
    >
      <FilmInfo :film="film"/>
    </modal>
  </div>
</template>

<script>
import FilmInfo from "./FilmInfo.vue"
import Modal from "./Modal.vue"

export default {
  name: "FilmItem",
  components: {
    FilmInfo,
    Modal
  },
  props: {
    film: Object
  },
  data() {
    return {
      showFilmInfo: false
    }
  },
  methods: {
    handleCloseInfo() {
      this.showFilmInfo = false
    }
  }
}
</script>

<style>
</style>