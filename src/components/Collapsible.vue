<template>
  <div class="collapsible">
    <collapsible-toggler :open="open" v-on="$listeners">
      {{ togglerTitle }}
    </collapsible-toggler>

    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import CollapsibleToggler from "./CollapsibleToggler.vue"

export default {
  name: "Collapsible",
  components: {
    CollapsibleToggler
  },
  props: {
    open: Boolean,
    title: String
  },
  data() {
    return {
      togglerTitle: this.title
    }
  }
}
</script>

<style scoped>
.collapsible {
  width: 90%;
}
</style>