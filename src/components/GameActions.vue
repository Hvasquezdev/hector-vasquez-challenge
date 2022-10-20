<script setup>
import BaseButton from "./BaseButton.vue";

const props = defineProps({
  hasPreviousPage: Boolean,
  hasNextPage: Boolean,
  isSubmitDisabled: Boolean,
});
const emit = defineEmits(["on-update-current-page", "on-submit-request"]);

const handlePrevPage = () => {
  if (props.hasPreviousPage) {
    emit("on-update-current-page", "prev");
  }
};

const handleNextPage = () => {
  if (props.hasNextPage) {
    emit("on-update-current-page", "next");
  }
};

const handleSubmitRequest = () => {
  emit("on-submit-request");
};
</script>

<template>
  <div class="game-actions">
    <base-button
      class="base-button"
      is-selected
      :is-disabled="!hasPreviousPage"
      @click="handlePrevPage"
      >Prev Question</base-button
    >
    <base-button
      v-if="hasNextPage"
      class="base-button"
      is-selected
      @click="handleNextPage"
      >Next Question</base-button
    >
    <base-button
      v-else
      class="base-button"
      is-selected
      :is-disabled="isSubmitDisabled"
      @click="handleSubmitRequest"
      >Submit Answers</base-button
    >
  </div>
</template>

<style>
.game-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
</style>
