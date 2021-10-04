import axios from "axios"
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const getFilms = axios.get(process.env.VUE_APP_API_ROOT + process.env.VUE_APP_FKE110_GET_ALL_FILMS)
const getThemes = axios.get(process.env.VUE_APP_API_ROOT + process.env.VUE_APP_FKE110_GET_ALL_THEMES)
const getMembers = axios.get(process.env.VUE_APP_API_ROOT + process.env.VUE_APP_FKE110_GET_ALL_MEMBERS)

export default new Vuex.Store({
  state: {
    films: [],
    themes: [],
    members: [],
  },
  mutations: {
    setFilms(state, films) {
      state.films = films
    },
    setThemes(state, themes) {
      state.themes = themes
    },
    setMembers(state, members) {
      state.members = members
    },
  },
  getters: {
    getCurrentFilmThemeName: (state) => (filmId) => {
      const currentFilmThemeId = state.films.find(f => f.id === filmId).theme_id
      return state.themes.find(t => t.id === currentFilmThemeId).name
    },
    getCurrentFilmMemberName: (state) => (filmId) => {
      const currentFilmMemberId = state.films.find(f => f.id === filmId).member_id
      return state.members.find(t => t.id === currentFilmMemberId).name
    }
  },
  actions: {
    getData({ commit }) {
      axios
      .all([getFilms, getThemes, getMembers])
      .then(axios.spread((...res) => {
        commit("setFilms", res[0].data)
        commit("setThemes", res[1].data)
        commit("setMembers", res[2].data)
      }))
      .catch((err) => {
        console.error(err);
      })
    },


  },
  modules: {
  }
})
