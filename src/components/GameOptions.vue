<script setup>
import BaseButton from "./BaseButton.vue";

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  currentSelectedOption: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["on-select-option"]);

const handleOptionClick = (option) => {
  emit("on-select-option", option);
};

const isSelectedOption = (option) => {
  if (!props.currentSelectedOption) return false;
  return option === props.currentSelectedOption;
};
</script>

<template>
  <div class="game-options">
    <base-button
      v-for="(option, key) in options"
      :key="key"
      class="base-button"
      :is-selected="isSelectedOption(option.label)"
      @click="handleOptionClick(option)"
      >{{ option.label }}</base-button
    >
  </div>
</template>

<style>
.game-options {
  display: grid;
  gap: 16px;
  margin-bottom: 24px;
  margin-top: 18px;
}
</style>
