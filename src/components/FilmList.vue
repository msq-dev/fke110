<template>
  <transition name="slide">
    <div v-if="open" class="film-list">
      <div
        v-for="film in filmList"
        :key="film.id"      
        class="film-item"
      >
        <FilmItem :film="film" />
      </div>

      <div class="stats-btn" @click="showFilmStats = true">
        <IconStats />
      </div>

      <modal :open="showFilmStats" @close="showFilmStats = false">
        <div class="title">{{ title }}</div>
        <Statistics :films="filmList" />
      </modal>

    </div>
  </transition>
</template>

<script>
import FilmItem from "./FilmItem.vue"
import Statistics from "./Statistics.vue"
import Modal from "./Modal.vue"
import IconStats from "icons/ChartBar"

export default {
  name: "FilmList",
  components: {
    FilmItem,
    Statistics,
    Modal,
    IconStats
  },
  props: {
    open: Boolean,
    filmList: Array,
    listId: String,
    listName: String
  },
  computed: {
    title() {
      return this.$store.getters.getListName(this.listId, this.listName)
    }
  },
  data() {
    return {
      showFilmStats: false,
    }
  },
}
</script>

<style scoped>
.film-list {
  position: relative;
  margin: 1rem 0 0 1rem;
}

.title {
  align-self: center;
  font-size: 1.7rem;
  font-weight: var(--fw-bold);
  margin: 2rem 0 1rem 0;
}

.film-item {
  margin-bottom: 1rem;
  cursor: pointer;
}

.stats-btn {
  --font-size: 1.6rem;

  position: absolute;
  display: grid;
  place-content: center;
  bottom: 0;
  right: 0;
  cursor: pointer;
  color: darkmagenta;
  font-size: 1.6rem;
}
</style>