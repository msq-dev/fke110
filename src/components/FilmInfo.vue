<template>
  <div class="film-info">
    <div class="title">
      {{ film.title }}
      <span v-if="film.year" class="year">({{ film.year }})</span>
    </div>
    <div v-if="film.director" class="director">
      {{ film.director }} 
      <span v-if="film.country">&middot; {{ countryToIso(JSON.parse(film.country)) }}</span>
    </div>

    <div class="infos-w-icon">
      <div v-if="film.duration">
        <IconDuration class="info-icon"/>
        {{ film.duration }}min
      </div>

      <div>
        <IconTheme class="info-icon"/>
        {{ theme }}
      </div>

      <div v-if="film.watched_on">
        <IconWatching class="info-icon"/>
        {{ germanizedDate(film.watched_on) }}
      </div>

      <div>
        <IconMember class="info-icon"/>
        {{ member }}
      </div>
    </div>

    <div class="btn-edit" @click="showFilmEdit = true">
      <IconMovieEdit/> Bearbeiten               
    </div>

    <modal
      :key="'edit-' + film.id"
      :open="showFilmEdit"
      :uberModal="true"
      @close="handleCloseEdit"
    >
      <FilmEdit @close="handleCloseEdit" :film="film"/>
    </modal>

  </div>
</template>

<script>
import Modal from "./Modal.vue"
import FilmEdit from "./FilmEdit.vue"
import IconDuration from "icons/Update"
import IconTheme from "icons/CommentQuoteOutline"
import IconWatching from "icons/Theater"
import IconMember from "icons/Account"
import IconMovieEdit from "icons/MovieOpenEdit"
import countries from "@/assets/countries"
import 'vue-material-design-icons/styles.css'

export default {
  components: {
    Modal,
    FilmEdit,
    IconDuration,
    IconTheme,
    IconWatching,
    IconMember,
    IconMovieEdit,
  },
  props: {
    film: Object
  },
  data() {
    return {
      showFilmEdit: false,
    }
  },
  computed: {
    theme() {
      return this.$store.getters.getCurrentFilmTheme(this.film.id)
    },
    member() {
      return this.$store.getters.getCurrentFilmMember(this.film.id)
    },
  },
  methods: {
    handleCloseEdit() {
      this.showFilmEdit = false
    },
    countryToIso(country) { // "Deutschland" -> "DE" etc.
      let isoList = country.map(c => countries[c])
      return isoList.join("/")
    },

    germanizedDate(dateWatchedOn) {
      let date = new Date(dateWatchedOn)
      const options = { 
          weekday: "short",
          day: "numeric",
          month: "long",
          year: "numeric"
       }
      return date.toLocaleDateString("de-DE", options)
    }
  },
}
</script>

<style>
.film-info {
  /* padding: 0 1rem; */
}

.film-info .title {
  font-size: 1.7rem;
  font-weight: var(--fw-bold);
  margin: 1.75rem 0 1rem 0;
}

.year {
  font-size: 80%;
}

.director {
  margin-bottom: 1rem;
}

.infos-w-icon > div {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.info-icon {
  font-size: 130%;
  display: inline-block;
  transform: translateY(-15%);
  margin-right: 0.5rem;
}

.btn-edit {
  display: inline-block;
  color: #fff;
  background: cornflowerblue;
  border-radius: 100vw;
  padding: 0.5rem 1rem;
  margin-top: 2rem;
}

</style>