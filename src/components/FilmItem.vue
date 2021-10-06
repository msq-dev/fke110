<template>
  <div>
    <div class="film-item" @click="showModal = true">
      {{ film.title }}
    </div>

    <transition name="fade">
      <modal v-if="showModal"
        @close="showModal = false"
      >
        <FilmInfo :film="film"/>
      </modal>
    </transition>
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
      showModal: false
    }
  }
}
</script>

<style>
</style>