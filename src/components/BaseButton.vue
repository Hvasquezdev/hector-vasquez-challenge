<script setup>
import { computed } from "vue";

const props = defineProps({
  isSelected: Boolean,
  isDisabled: Boolean,
});

const classNames = computed(() => ({
  "is-selected": props.isSelected,
  "is-disabled": props.isDisabled,
}));
</script>

<template>
  <button class="base-button" :class="classNames">
    <slot />
  </button>
</template>

<style>
.base-button {
  width: 100%;
  border-radius: var(--button-border-radius);
  background-color: transparent;
  padding: 5px 19px;
  font-family: var(--ff-popins);
  font-size: var(--fs-s);
  font-weight: var(--fw-bold);
  color: var(--purple);
  border: 2px solid var(--purple-light);
  min-height: 56px;
  cursor: pointer;
  transition: all 0.25s;
}

.base-button.is-selected {
  background-color: var(--orange);
  color: var(--white);
  border-color: var(--orange);
}

.base-button.is-disabled {
  opacity: 0.6;
  pointer-events: none;
  user-select: none;
}
</style>
