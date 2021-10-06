import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueApexCharts from 'vue-apexcharts'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)
Vue.component('v-select', vSelect)

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
  store,
  render: h => h(App)
}).$mount('#app')
