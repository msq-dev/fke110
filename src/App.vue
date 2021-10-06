<template>
  <div id="app">
    <div class="navbar">
      <h1 class="app-title">FKE110</h1>
    </div>

    <main>
      <collapsible
        :open="showStats"
        title="Statistiken"
        @toggle="showStats = !showStats, showThemes = false, showMembers = false"
      >
        <transition name="slide">
          <Statistics v-if="showStats"
            :films="films"
            class="stats-section"
          />
        </transition>
      </collapsible>

      <collapsible
        :open="showThemes"
        sectionClass="themes-active"
        title="Themen"
        @toggle="showThemes = !showThemes, showStats = false, showMembers = false"
      >
        <transition name="slide">
          <SectionList
            v-if="showThemes"
            :list="themes"
            listName="themes"
            :itemId="themeId"
            listClass="themes-list"
          />
        </transition>
      </collapsible>

      <collapsible
        :open="showMembers"
        sectionClass="members-active"
        title="Mitglieder"
        @toggle="showMembers = !showMembers, showStats = false, showThemes = false"
      >
        <transition name="slide">
          <SectionList
            v-if="showMembers"
            :list="members"
            listName="members"
            :itemId="memberId"
            listClass="members-list"
          />
        </transition>
      </collapsible>
    </main>

  </div>
</template>

<script>
import Statistics from "./components/Statistics.vue"
import SectionList from "./components/SectionList.vue"
import Collapsible from "./components/Collapsible.vue"

export default {
  name: "App",
  components: {
    Statistics,
    SectionList,
    Collapsible
  },
  computed: {
    films() {
      return this.$store.state.films
    },
    themes() {
      return this.$store.state.themes
    },
    members() {
      return this.$store.state.members
    },
  },

  methods: {
    toggleMenu() {
      this.$refs.menuIcon.classList.toggle("active")
    }

  },

  data() {
    return {
      themeId: "theme_id", 
      memberId: "member_id", 
      showStats: false,
      showThemes: false,
      showMembers: false,
    }
  },
  mounted() {
    this.$store.dispatch("getData")
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,300;0,500;1,300;1,500&display=swap');

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  overflow-y: scroll;
}

main {
  width: 100%;
  padding-left: 1rem;
}

#app {
  --fw-normal: 300;
  --fw-bold: 500;

  --toggler-hue: 220;
  --toggler-saturation: 14%;
  --toggler-lightness: 96%;
  
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-family: "Karla", sans-serif;
  font-weight: var(--fw-normal);
}

.app-title {
  margin: 1rem 0;
}

.stats-section {
  margin-top: 1.5rem;
  height: 100vh;
}

.navbar {
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  padding: 0 1rem;
  box-shadow: 0 1px 7px 0 rgba(0, 0, 0, .5);
  margin-bottom: 2rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.slide-enter-active {
  transition: opacity 0.3s, max-height 0.5s;
}

.slide-leave-active {
  transition: opacity 0.05s, max-height 0.5s;  
}

.slide-enter, .slide-leave-to {
  max-height: 0;
  opacity: 0;
}

</style>
