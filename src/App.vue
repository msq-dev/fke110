<template>
  <div id="app">
    <h1>FKE110</h1>

    <collapsible
      :open="showStats"
      title="Statistiken"
      @toggle="showStats = !showStats"
    >
      <SectionStatistics v-if="showStats" :films="films"/>

      
    </collapsible>    

    <collapsible
      :open="showThemes"
      title="Themen"
      @toggle="showThemes = !showThemes"
    >
      <SectionThemes v-if="showThemes" :films="films" :themes="themes"/>
    </collapsible>    

    <collapsible
      :open="showMembers"
      title="Mitglieder"
      @toggle="showMembers = !showMembers"
    >
      <SectionMembers v-if="showMembers" :films="films" :members="members"/>
    </collapsible>    

  </div>
</template>

<script>
import axios from "axios"
import SectionStatistics from "./components/SectionStatistics.vue"
import SectionMembers from "./components/SectionMembers.vue"
import SectionThemes from "./components/SectionThemes.vue"
import Collapsible from "./components/Collapsible.vue"

const getFilms = axios.get(process.env.VUE_APP_API_ROOT + process.env.VUE_APP_FKE110_GET_ALL_FILMS)
const getThemes = axios.get(process.env.VUE_APP_API_ROOT + process.env.VUE_APP_FKE110_GET_ALL_THEMES)
const getMembers = axios.get(process.env.VUE_APP_API_ROOT + process.env.VUE_APP_FKE110_GET_ALL_MEMBERS)

export default {
  name: "App",
  components: {
    SectionStatistics,
    SectionMembers,
    SectionThemes,
    Collapsible
  },
  data() {
    return {
      films: [],
      themes: [],
      members: [],
      showStats: false,
      showThemes: false,
      showMembers: false,
    }
  },
  mounted() {
    axios
      .all([getFilms, getThemes, getMembers])
      .then(axios.spread((...res) => {
        this.films = res[0].data
        this.themes = res[1].data
        this.members = res[2].data
      }))
      .catch((err) => {
        console.error(err);
      })
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,300;0,500;1,300;1,500&display=swap');

*,
*::before,
*::after {
  box-sizing: border-box;
}
#app {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-family: "Karla", sans-serif;
  font-weight: 300;
  padding-left: 1rem;
}
</style>
