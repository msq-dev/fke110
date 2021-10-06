<template>
  <div class="collapsible">
    <collapsible-toggler
      :open="open"
      :class="[togglerClasses, listClasses]"
      v-on="$listeners"
    >
      {{ title }}
    </collapsible-toggler>
    
    <div class="content" ref="collapsibleContent">
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
    title: String,
    sectionClass: String,
    listClass: String
  },
  computed: {
    togglerClasses() {
      return {
        active: this.open,
        "themes-active": this.open && this.sectionClass === "themes-active",
        "members-active": this.open && this.sectionClass === "members-active"
      }
    },
    listClasses() {
      return {
        "themes-list": this.listClass === "themes-list",
        "members-list": this.listClass === "members-list",
      }
    }
  },
}
</script>

<style scoped>
.collapsible {
  width: 90%;
}
</style>