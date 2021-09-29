<template>
  <div id="app">
    <h1>FKE110</h1>

    <collapsible
      :open="showStats"
      title="Statistiken"
      @toggle="showStats = !showStats"
    >

      <div v-if="showStats" class="statistics">
        <div class="running-time">
          Gesamtlaufzeit: <b>{{ films | totalDuration }}</b>
        </div>
        <div class="chart-container">
          <apexchart :options="chartOptions" :series="countryValues"></apexchart>
        </div>
      </div>
    </collapsible>    

    <collapsible
      :open="showThemes"
      title="Themen"
      @toggle="showThemes = !showThemes"
    >
      <ThemesArea v-if="showThemes" :films="films" :themes="themes"/>
    </collapsible>    

    <collapsible
      :open="showMembers"
      title="Mitglieder"
      @toggle="showMembers = !showMembers"
    >
      <MemberArea v-if="showMembers" :films="films" :members="members"/>
    </collapsible>    

  </div>
</template>

<script>
import axios from "axios"
import MemberArea from "./components/MemberArea.vue"
import ThemesArea from "./components/ThemesArea.vue"
import Collapsible from "./components/Collapsible.vue"

const getFilms = axios.get(process.env.VUE_APP_API_ROOT + process.env.VUE_APP_FKE110_GET_ALL_FILMS)
const getThemes = axios.get(process.env.VUE_APP_API_ROOT + process.env.VUE_APP_FKE110_GET_ALL_THEMES)
const getMembers = axios.get(process.env.VUE_APP_API_ROOT + process.env.VUE_APP_FKE110_GET_ALL_MEMBERS)

const chartColors = [
  "#005f73ff", 
  "#bb3e03ff",
  "#ee9b00ff", 
  "#0a9396ff",
  "#14d2bdff", 
  "#ae2012ff", 
  "#ca6702ff", 
  "#001219ff",
  "#09d8a6ff", 
  "#9b2226ff"
]


export default {
  name: "App",
  components: {
    MemberArea,
    ThemesArea,
    Collapsible
  },
  data() {
    return {
      films: [],
      themes: [],
      members: [],
      countries: [],
      countryValues: [],
      showStats: false,
      showThemes: false,
      showMembers: false,

      chartOptions: {
        chart: {
          type: "pie",
          fontFamily: "Avenir, sans-serif",
          animations: {
            speed: 300
          }
        },
          labels: [],
          legend: {
            position: "bottom",
            horizontalAlign: "left",
            formatter: function(label, opts) {
              return label + ": " + opts.w.globals.series[opts.seriesIndex]
            },
            labels: {
              useSeriesColors: true,
            },
            markers :{
              width: 0,
              height: 0
            }
          },
        responsive: [{
          breakpoint: 450,
          options: {
            chart: {
              width: "100%",
              height: "100%"
            },
          }
        }],
        colors: chartColors,
        stroke: {
          width: 0.5
        }
      },
    }
  },
  methods: {
    handleToggle(name, value) {
      this.name = value
      console.log(this.$data.name);
    },
    countCountries(films) {
      let countries = []

      for (let i = 0; i < films.length; i++) {
        const filmCountries = JSON.parse(films[i].country)
        
        for (let j = 0; j < filmCountries.length; j++) {
          const country = filmCountries[j]
          countries.push(country)  
        }
      }

      const uniqueCountries = countries.filter(onlyUnique)
      let countedCountries = []

      for (let k = 0; k < uniqueCountries.length; k++) {
        const country = uniqueCountries[k]
        const count = countries.filter(c => c === country).length

        countedCountries.push([country.replace("Vereinigtes Königreich", "UK"), count])
      }

      return countedCountries


      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }
    }
  },

  mounted() {
    axios
      .all([getFilms, getThemes, getMembers])
      .then(axios.spread((...res) => {
        this.films = res[0].data
        this.themes = res[1].data
        this.members = res[2].data
        this.countCountries(this.films).forEach((c) => {
          this.chartOptions.labels.push(c[0])
          this.countryValues.push(c[1])
        })
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

.toggle-collapsible {
  display: flex;
  justify-content: space-between;
  width: 90%;
  padding: 1rem 1rem;
  margin-bottom: 0.2rem;
  background: #F3F4F6;
  cursor: pointer;
}

.chart-container {
  width: 90vw;
  height: 70vh;
}

.running-time {
  text-align: center;
  margin: 1rem 0;
}
</style>
