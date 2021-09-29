<template>
  <div class="member area">
    <button
      v-for="member in members"
      :key="member.id"
      @click="showFilmsByMember(member.id)"
    >
      {{ member.name }}
    </button>

    <div v-if="showMemberFilmList">
      <ul>
        <li v-for="film in memberFilmList" :key="film.id">
          {{ film.title }}
        </li>
      </ul>
      <div>
        <strong>
          Gesamtlaufzeit:<br>{{ memberFilmList | totalDuration }}
        </strong>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    films: Array,
    members: Array
  },
  data() {
    return {
      memberFilmList: [],
      showMemberFilmList: false
    }    
  },
  methods: {
    getFilmsByMember(id) {
      return this.films.filter(f => f.member_id === id)
    },
    showFilmsByMember(id) {
      this.memberFilmList = this.films.filter(f => f.member_id === id)
      this.showMemberFilmList = true
    },
  }

}
</script>

<style>

</style>