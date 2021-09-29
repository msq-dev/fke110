<template>
  <div class="film-modal">
    <h1>{{ film.title }}</h1>
    <button @click="$emit('close')">Schließen</button>

  </div>
</template>

<script>
export default {
  name: "FilmItem",
  props: {
    film: Object
  }
}
</script>

<style>
.film-modal {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: lightskyblue;
}

</style>