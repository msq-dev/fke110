<template>
  <div class="modal">
    <div class="close-btn">
      <CloseCircle @click="$emit('close')"/>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import CloseCircle from "icons/CloseCircle"

export default {
  components: {
    CloseCircle
  }
}
</script>

<style>
.modal {
  position: fixed;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 2rem;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  font-size: 2rem;
  text-align: right;
  color: tomato;
}
</style>