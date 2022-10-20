<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
});
const emit = defineEmits(["update:modelValue"]);

const handleInput = (e) => {
  emit("update:modelValue", e.target.value);
};
</script>

<template>
  <input
    class="base-input"
    :type="props.type"
    :placeholder="props.placeholder"
    :value="modelValue"
    @input="handleInput"
  />
</template>

<style>
.base-input {
  font-size: 18px;
  border-radius: var(--button-border-radius);
  padding: 5px 19px;
  font-family: var(--ff-popins);
  font-size: var(--fs-s);
  font-weight: var(--fw-bold);
  border: 2px solid var(--dark-purple);
  color: var(--dark-purple);
  min-height: 56px;
  outline: none;
  width: 100%;
}
</style>
