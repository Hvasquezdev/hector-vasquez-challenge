<script setup>
import BaseCard from "./BaseCard.vue";
import BaseTitle from "./BaseTitle.vue";
import ColumnChart from "./ColumnChart.vue";
import PieChar from "./PieChar.vue";

defineProps({
  correctAnswersCount: {
    type: Number,
    default: 0,
  },
  wrongAnswersCount: {
    type: Number,
    default: 0,
  },
  pieChartData: {
    type: Array,
    default: () => [],
  },
  columnChartData: {
    type: Array,
    default: () => [],
  },
  questionsCount: {
    type: Number,
    default: 0,
  },
  minCorrectAnswersToWin: {
    type: Number,
    default: 0,
  },
  isWinner: {
    type: Boolean,
  },
});
</script>

<template>
  <base-card>
    <base-title>
      Right answers {{ correctAnswersCount }} of {{ questionsCount }}
    </base-title>

    <p v-if="isWinner">Congrats! You pass the quiz game!</p>
    <p v-else>
      You need to answer at leats {{ minCorrectAnswersToWin }} to pass the quiz
    </p>

    <pie-char :data="pieChartData" />

    <column-chart :data="columnChartData" />
  </base-card>
</template>

<style></style>
