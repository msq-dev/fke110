<template>
  <div class="members-section">
    <collapsible
      v-for="member in members"
      :open="isCurrentMember(member.id)"
      :title="member.name"
      :key="member.id"
      @toggle="handleToggle(member.id)"
    >
      <FilmList
        :open="isCurrentMember(member.id)"
        :filmList="getFilmsByMember(member.id)"
      />
    </collapsible>
  </div>
</template>

<script>
import Collapsible from "./Collapsible.vue"
import FilmList from "./FilmList.vue"

export default {
  components: { 
    Collapsible,
    FilmList
  },
  props: {
    films: Array,
    members: Array
  },
  data() {
    return {
      currentMember: "",
    }
  },
  methods: {
    getFilmsByMember(id) {
      return this.films.filter(f => f.member_id === id)
    },
    isCurrentMember(id) {
      return id === this.currentMember
    },
    handleToggle(id) {
      if (!this.currentMember) {
        this.currentMember = id
      }
      else if (this.currentMember === id) {
        this.currentMember = null
      } else {
        this.currentMember = id
      }
    }
  },
}
</script>

<style scoped>
.members-section {
  width: 100%;
}

</style>