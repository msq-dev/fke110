<template>
  <div class="text-input">
    <label for="label">{{ label }}</label>
    <input
      id="label"
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >{{ unit }}
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    unit: String,
    value: String
  }
}
</script>

<style>
.text-input {
  margin-bottom: 0.5rem;
}

.text-input > label {
  display: block;
  font-size: 80%;
  margin-bottom: .15rem;
}

.text-input > input {
  width: 80%;
  display: inline-block;
  font-family: inherit;
  font-size: inherit;
  font-weight: var(--fw-normal);
  border: none;
  border-radius: 0.5rem;
  padding: 0.3rem 0.5rem;
  margin-right: 0.5rem;
}



</style>