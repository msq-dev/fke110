<template>
  <div class="film-modal">
    <p class="close"><CloseCircle @click="$emit('close')"/></p>
    <p class="title">{{ film.title }} <span class="year">({{ film.year }})</span></p>
    <p>{{ film.director }} &middot; {{ countryToIso(JSON.parse(film.country)) }}</p>
    <p><Update /> {{ film.duration }}min</p>
    <p><CommentQuoteOutline /> {{ "THeME" }}</p>
    <p v-if="film.watched_on"><Theater /> {{ germanizedDate(film.watched_on) }}</p>
    <p><Account /> {{ "MEMbER" }}</p>
    
  </div>
</template>

<script>
import "vue-material-design-icons/styles.css"
import countries from "../assets/countries"
import CloseCircle from "icons/CloseCircle"
import Update from "icons/Update"
import CommentQuoteOutline from "icons/CommentQuoteOutline"
import Theater from "icons/Theater"
import Account from "icons/Account"


export default {
  name: "FilmModal",
  components: {
    CloseCircle,
    Update,
    CommentQuoteOutline,
    Theater,
    Account
  },
  props: {
    film: Object
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

<style scoped>
.film-modal {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  padding: 2rem;
  background: lightsalmon;
}

.close {
  text-align: right;
}

.title {
  font-size: 1.5rem;
  font-weight: var(--fw-bold);
  margin-bottom: 1rem;
}

.year {
  font-size: 80%;
}




</style>