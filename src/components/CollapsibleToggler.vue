<template>
  <div class="toggler" @click="$emit('toggle')">
    <slot></slot><span>{{ open ? "&minus;" : "+" }}</span>
  </div>
</template>

<script>
export default {
  name: "CollapsibleToggler",
  props: {
    open: Boolean
  }
}
</script>

<style scoped>
.toggler {
  display: flex;
  justify-content: space-between;
  padding: 1rem 1rem;
  margin-bottom: 0.2rem;
  background: #F3F4F6;
  cursor: pointer;
}
</style>