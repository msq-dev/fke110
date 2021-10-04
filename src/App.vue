<template>
  <div id="app">
    <h1 class="app-title">FKE110</h1>

    <collapsible
      :open="showStats"
      title="Statistiken"
      @toggle="showStats = !showStats"
    >
      <SectionStatistics v-if="showStats"/>
    </collapsible>    

    <collapsible
      :open="showThemes"
      sectionClass="themes-active"
      title="Themen"
      @toggle="showThemes = !showThemes"
    >
      <SectionList
        v-if="showThemes"
        :list="themes"
        :itemId="themeId"
        listClass="themes-list"
      />
    </collapsible>    

    <collapsible
      :open="showMembers"
      sectionClass="members-active"
      title="Mitglieder"
      @toggle="showMembers = !showMembers"
    >
      <SectionList
        v-if="showMembers"
        :list="members"
        :itemId="memberId"
        listClass="members-list"
      />
    </collapsible>    

  </div>
</template>

<script>
import SectionStatistics from "./components/SectionStatistics.vue"
import SectionList from "./components/SectionList.vue"
import Collapsible from "./components/Collapsible.vue"

export default {
  name: "App",
  components: {
    SectionStatistics,
    SectionList,
    Collapsible
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
  padding-left: 1rem;
}

.app-title {
  margin: 1.5rem 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
