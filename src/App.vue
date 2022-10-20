<script setup>
import { ref, computed, defineAsyncComponent } from "vue";
import { useGameManager } from "./composables/useGameManager";

import BaseButton from "./components/BaseButton.vue";
import BaseInput from "./components/BaseInput.vue";
import BaseCard from "./components/BaseCard.vue";
import BaseTitle from "./components/BaseTitle.vue";
import GameOptions from "./components/GameOptions.vue";
import GameActions from "./components/GameActions.vue";

const GameResults = defineAsyncComponent(() =>
  import("./components/GameResults.vue")
);

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
  wrongAnswersCount,
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
      <base-input type="text" placeholder="Full name" v-model.trim="userName" />
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

    <game-results
      v-if="currentView === 'results'"
      :correct-answers-count="correctAnswersCount"
      :wrong-answers-count="wrongAnswersCount"
      :questions-count="questions.length"
      :min-correct-answers-to-win="minCorrectAnswersToWin"
      :is-winner="isWinner"
      :pie-chart-data="[
        { label: 'Correct', value: correctAnswersCount },
        { label: 'Wrong', value: wrongAnswersCount },
      ]"
      :column-chart-data="[
        { user: userName, value: correctAnswersCount },
        { user: 'Hector', value: 5 },
        { user: 'Luis', value: 2 },
        { user: 'Jose', value: 4 },
      ]"
    />
  </div>
</template>

<style>
.app {
  width: 100%;
  height: 100vh;
  background-color: var(--dark-purple);
  display: grid;
  place-items: center;
  padding: 16px;
}

.base-input {
  margin: 18px 0 24px 0;
}
</style>
