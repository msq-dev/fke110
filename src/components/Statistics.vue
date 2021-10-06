<template>
  <div class="statistics">
    <div class="running-time">
      Gesamtlaufzeit: <b>{{ films | totalDuration }}</b>
    </div>
    <div class="chart">
      <apexchart :options="chartOptions" :series="countryValues"></apexchart>
    </div>
  </div>
</template>

<script>
const chartColors = [
  "#005f73ff", 
  "#bb3e03ff",
  "#ee9b00ff", 
  "#0a9396ff",
  "#14d2bdff", 
  "#ae2012ff", 
  "#ca6702ff", 
  "#00ab19ff",
  "darkmagenta", 
  "#FF6347",
]

export default {
  name: "Statistics",
  props: {
    films: Array
  },
  data() {
    return {
      countries: [],
      countryValues: [],
      chartOptions: {
        chart: {
          type: "pie",
          fontFamily: "sans-serif",
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

        countedCountries.push([country, count])
      }

      return countedCountries


      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }
    }
  },

  mounted() {
    this.countCountries(this.films).forEach((c) => {
      this.chartOptions.labels.push(c[0])
      this.countryValues.push(c[1])
    })
  }

}
</script>

<style>
.statistics {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}

.running-time b {
  font-weight: var(--fw-bold);
  text-align: center;
}

.chart {
  width: 90%;
  height: 70%;
  margin-top: 1rem;
}

</style>