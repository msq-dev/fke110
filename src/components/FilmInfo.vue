<template>
  <div class="film-info">
    <div class="title">
      {{ film.title }}
      <span v-if="film.year" class="year">({{ film.year }})</span>
    </div>
    <div class="director">
      {{ film.director }} 
      <span v-if="film.country">&middot; {{ countryToIso(JSON.parse(film.country)) }}</span>
    </div>

    <div class="infos-w-icon">
      <div>
        <Update class="info-icon"/>
        {{ film.duration }}min
      </div>

      <div>
        <CommentQuoteOutline class="info-icon"/>
        {{ theme }}
      </div>

      <div v-if="film.watched_on">
        <Theater class="info-icon"/>
        {{ germanizedDate(film.watched_on) }}
      </div>

      <div>
        <Account class="info-icon"/>
        {{ member }}
      </div>
    </div>

    <div class="edit">
      
    </div>

    
  </div>
</template>

<script>
import countries from "../assets/countries"
import Update from "icons/Update"
import CommentQuoteOutline from "icons/CommentQuoteOutline"
import Theater from "icons/Theater"
import Account from "icons/Account"
import 'vue-material-design-icons/styles.css'

export default {
  components: {
    Update,
    CommentQuoteOutline,
    Theater,
    Account
  },
  props: {
    film: Object
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
  padding-left: 1rem;
}

.film-info .title {
  font-size: 1.7rem;
  font-weight: var(--fw-bold);
  margin: 2rem 0 1rem 0;
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
</style>