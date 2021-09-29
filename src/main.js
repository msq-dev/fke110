import Vue from 'vue'
import App from './App.vue'
import VueApexCharts from 'vue-apexcharts'

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false

Vue.filter('totalDuration', function(filmsList) {
    let total = 0
    for (let i = 0; i < filmsList.length; i++) {
      const duration = parseInt(filmsList[i].duration ? filmsList[i].duration : "0")
      total += duration
    }

    return `${ Math.floor(total / 60) }h ${ total % 60 }min`
})

new Vue({
  render: h => h(App),
}).$mount('#app')
