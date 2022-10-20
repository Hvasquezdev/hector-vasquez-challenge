import { onMounted, ref, computed } from "vue";
import { QuestionsDataService } from "./../core/services/QuestionsData.service";

export const useGameManager = () => {
  const questions = ref([]);
  const questionsDataService = new QuestionsDataService();

  const getRandomQuestion = async () => {
    const data = await questionsDataService.getQuestionsData();
    questions.value = data;
  };

  onMounted(() => {
    getRandomQuestion();
  });

  const currentQuestionNum = ref(0);
  const currentQuestionObj = computed(() => {
    return questions.value[currentQuestionNum.value] || {};
  });
  const hasNextQuestion = computed(() => {
    return currentQuestionNum.value < questions.value.length - 1;
  });
  const hasPreviousQuestion = computed(() => {
    return currentQuestionNum.value > 0;
  });
  const updateCurrentQuestion = (to) => {
    if (to === "next" && hasNextQuestion.value) {
      currentQuestionNum.value++;
    }

    if (to === "prev" && hasPreviousQuestion.value) {
      currentQuestionNum.value--;
    }
  };

  const selectedAnswers = ref([]);
  const handleUpdateSelectedAnswers = (question, answer) => {
    selectedAnswers.value[currentQuestionNum.value] = {
      label: question,
      answer,
    };
  };
  const currentSelectedAnswer = computed(() => {
    return selectedAnswers.value[currentQuestionNum.value] || {};
  });
  const hasAllSelectedAnswers = computed(() => {
    return (
      questions.value.length &&
      selectedAnswers.value.length === questions.value.length
    );
  });

  const minCorrectAnswersToWin = computed(() =>
    Math.round(questions.value.length * 0.6)
  );
  const correctAnswersCount = ref(0);
  const isWinner = computed(
    () => correctAnswersCount.value >= minCorrectAnswersToWin.value
  );
  const handleSubmitAnswers = () => {
    correctAnswersCount.value = selectedAnswers.value.filter(
      (answer) => answer.answer.isCorrect
    ).length;
  };

  return {
    questions,
    currentQuestionNum,
    currentQuestionObj,
    hasNextQuestion,
    hasPreviousQuestion,
    updateCurrentQuestion,
    selectedAnswers,
    hasAllSelectedAnswers,
    handleUpdateSelectedAnswers,
    currentSelectedAnswer,
    handleSubmitAnswers,
    isWinner,
    minCorrectAnswersToWin,
    correctAnswersCount,
  };
};
