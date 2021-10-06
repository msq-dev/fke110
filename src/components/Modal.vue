<template>
  <transition name="fade">
    <div v-if="open" :class="[uberModal ? 'uber-modal' : 'modal']">
      <div class="close-btn" @click="closeModal">
        <IconClose />
      </div>
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import IconClose from "icons/CloseCircle"

export default {
  components: {
    IconClose
  },
  props: {
    open: Boolean,
    uberModal: Boolean
  },
  methods: {
    closeModal() {
      this.$emit('close')
    }
  }
}
</script>

<style>
.modal,
.uber-modal {
  position: fixed;
  z-index: 10;
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem 0 1rem;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  overflow-y: scroll;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  font-size: 2rem;
  text-align: right;
  color: tomato;
}

.uber-modal {
  z-index: 20;
  background: rgb(240, 240, 240);
}

</style>