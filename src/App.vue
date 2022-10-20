<script setup>
import BaseButton from "./components/BaseButton.vue";
import BaseInput from "./components/BaseInput.vue";
import BaseCard from "./components/BaseCard.vue";
import BaseTitle from "./components/BaseTitle.vue";
import GameOptions from "./components/GameOptions.vue";
import GameActions from "./components/GameActions.vue";

import { ref, computed } from "vue";
import { useGameManager } from "./composables/useGameManager";

const userName = ref("");
const currentView = ref("home");
const {
  questions,
  currentQuestionObj,
  updateCurrentQuestion,
  hasPreviousQuestion,
  hasNextQuestion,
  hasAllSelectedAnswers,
  handleUpdateSelectedAnswers,
  currentSelectedAnswer,
  handleSubmitAnswers,
  correctAnswersCount,
  isWinner,
  minCorrectAnswersToWin,
} = useGameManager();

const handleUpdateCurrentView = (view) => {
  currentView.value = view;
};

const handleStartGame = () => {
  if (userName.value) handleUpdateCurrentView("playing");
};

const handleEndGame = () => {
  handleSubmitAnswers();
  handleUpdateCurrentView("results");
};

const selectedAnswerLabel = computed(() => {
  return currentSelectedAnswer.value?.answer?.label || "";
});
</script>

<template>
  <div class="app">
    <base-card v-if="currentView === 'home'">
      <base-title class="title-text">Quiz Game</base-title>
      <base-input
        type="text"
        placeholder="Full name"
        :value="userName"
        @input="($event) => (userName = $event)"
      />
      <base-button
        class="base-button"
        is-selected
        :is-disabled="!userName"
        @click="handleStartGame"
        >Start Quiz</base-button
      >
    </base-card>

    <base-card v-if="currentView === 'playing'">
      <base-title class="title-text">{{ currentQuestionObj.label }}</base-title>

      <game-options
        :options="currentQuestionObj.answers"
        :current-selected-option="selectedAnswerLabel"
        @on-select-option="
          handleUpdateSelectedAnswers(currentQuestionObj.label, $event)
        "
      />

      <game-actions
        :has-previous-page="hasPreviousQuestion"
        :has-next-page="hasNextQuestion"
        :is-submit-disabled="!hasAllSelectedAnswers"
        @on-update-current-page="updateCurrentQuestion"
        @on-submit-request="handleEndGame"
      />
    </base-card>

    <base-card v-if="currentView === 'results'" class="game-board">
      <base-title class="title-text">
        Right answers {{ correctAnswersCount }} of {{ questions.length }}
      </base-title>

      <p v-if="isWinner">Congrats! You pass the quiz game!</p>
      <p v-else>
        You need to answer at leats {{ minCorrectAnswersToWin }} to pass the
        quiz
      </p>
    </base-card>
  </div>
</template>

<style>
.app {
  width: 100%;
  height: 100vh;
  background-color: var(--black-secondary);
  display: grid;
  place-items: center;
}

.base-input {
  margin: 18px 0 24px 0;
}
</style>
