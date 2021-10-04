<template>
  <div
    class="toggler"
    @click="$emit('toggle')"
  >
    <slot></slot><span>{{ open ? "&minus;" : "+" }}</span>
  </div>
</template>

<script>
export default {
  name: "CollapsibleToggler",
  props: {
    open: Boolean,
  },
}
</script>

<style>
.toggler {
  display: flex;
  justify-content: space-between;
  padding: 1rem 1rem;
  margin-bottom: 0.2rem;
  background: hsl(var(--toggler-hue), var(--toggler-saturation), var(--toggler-lightness));
  cursor: pointer;
}

.toggler:hover,
.active {
  --toggler-lightness: 80%;
}

.themes-active,
.themes-list.toggler {
  --toggler-hue: 0;
  --toggler-saturation: 70%;
}

.members-active,
.members-list.toggler {
  --toggler-hue: 240;
  --toggler-saturation: 70%;
}
</style>