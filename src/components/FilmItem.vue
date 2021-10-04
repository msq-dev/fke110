<template>
  <div>
    <div class="film-item" @click="showModal = true">
      {{ film.title }}
    </div>
    <transition name="fade">
      <FilmModal v-if="showModal" :film="film" @close="showModal = false"/>
    </transition>
  </div>
</template>

<script>
import FilmModal from "./FilmModal.vue"

export default {
  name: "FilmItem",
  components: {
    FilmModal
  },
  props: {
    film: Object
  },
  data() {
    return {
      showModal: false
    }
  }
}
</script>

<style>

</style>