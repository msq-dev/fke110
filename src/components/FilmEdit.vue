<template>
  <div class="film-edit-form">
    <div class="edit-form-title">
      {{ filmTitle }}
      <!-- <span>(in Bearbeitung)</span> -->
    </div>
    <div class="input-form">
      <InputText 
        label="Titel"
        v-model="filmTitle"
      />
      <InputText 
        label="Jahr"
        v-model="filmYear"
      />
      <InputText 
        label="Länge"
        unit="min"
        v-model="filmDuration"
      />
      <InputText 
        label="Regisseur*in"
        v-model="filmDirector"
      />

      <v-select
        multiple
        :options="countryList"
        v-model="filmCountry"
      >
        <template #header>
          <div class="input-label">Land</div>
        </template>
      </v-select>
      
      <v-select
        :clearable="false"
        :options="themes"
        label="name"
        v-model="filmTheme"
        :reduce="theme => theme.id"
      >
        <template #header>
          <div class="input-label">Thema</div>
        </template>
      </v-select>

      <v-select
        :clearable="false"
        :options="members"
        label="name"
        v-model="filmMember"
        :reduce="member => member.id"
      >
        <template #header>
          <div class="input-label">Mitglied</div>
        </template>
      </v-select>

      <label class="input-label" for="watched_on">Datum</label>
      <div class="date-input-container">
        <div class="date-display">{{ germanizedDate(filmWatchedOn) }}</div>
        <span class="datepicker-toggle">
          <IconCalendar class="calendar-icon"/>
          <input class="datepicker-input" type="date" id="watched_on" v-model="filmWatchedOn">
        </span>
      </div>

      <div class="button-container">
        <div class="btn-edit btn-save" @click="$emit('close')"><IconMovieSave/> Speichern</div>
        <div class="btn-edit btn-delete" @click="$emit('close')"><IconMovieDelete/> Löschen</div>
      </div>

    </div>


  </div>
</template>

<script>
import InputText from "./InputText.vue"
import countries from "@/assets/countries.js"
import IconCalendar from "icons/CalendarHeart.vue"
import IconMovieSave from "icons/MovieOpenCheck.vue"
import IconMovieDelete from "icons/MovieOpenRemove.vue"

export default {
  components: {
    InputText,
    IconCalendar,
    IconMovieSave,
    IconMovieDelete
  },
  props: {
    film: Object
  },
  computed: {
    themes() {
      return this.$store.state.themes
    },
    members() {
      return this.$store.state.members
    },
  },
  data() {
    return {
      countryList: Object.keys(countries),
      filmTitle: this.film.title || null,
      filmYear: this.film.year || null,
      filmDuration: this.film.duration || null,
      filmDirector: this.film.director || null,
      filmCountry: JSON.parse(this.film.country) || [],
      filmTheme: this.film.theme_id || null,
      filmMember: this.film.member_id || null,
      filmWatchedOn: this.film.watched_on || null
    }
  },
  methods: {
    germanizedDate(dateWatchedOn) {
      if (!dateWatchedOn) return ""
      let date = new Date(dateWatchedOn)
      const options = { 
          weekday: "short",
          day: "numeric",
          month: "long",
          year: "numeric"
       }
      return date.toLocaleDateString("de-DE", options)
    }
  }
}
</script>

<style>
.film-edit-form {
  width: 90%;
}

/* .v-select .vs__search::placeholder, */
/* .v-select .vs__dropdown-menu, */
.v-select .vs__dropdown-toggle {
  color: #000;
  background: #fff;
  border: none;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
}

.input-label {
  display: block;
  font-size: 80%;
  margin-bottom: .15rem;
}

.date-input-container {
  display: grid;
  grid-template-columns: auto 3rem;
  align-items: end;
  gap: 0.5rem;
}

.date-display {
  display: inline-block;
  font-family: inherit;
  font-size: inherit;
  font-weight: var(--fw-normal);
  border: none;
  border-radius: 0.5rem;
  padding: 0.3rem 0.5rem;
  background: #fff;
  min-height: 2rem;
}

.datepicker-toggle {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.calendar-icon {
  position: absolute;
  display: inline-block;
  transform: translateY(-10%);
  font-size: 2rem;
  color: #444;
}

.datepicker-input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
}

input[type="date"]::-webkit-clear-button {
  display: none;
}


.edit-form-title {
  font-size: 1.7rem;
  font-weight: var(--fw-bold);
  color: #888;
  margin: 1.75rem 0 1rem 0;
}

/* .edit-form-title > span{
  font-size: 70%;
  display: block;
  font-weight: var(--fw-normal);
} */

.button-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5rem;
}

.button-container > .btn-save {
  background: mediumseagreen;
}

.button-container > .btn-delete {
  background: crimson;
}


</style>