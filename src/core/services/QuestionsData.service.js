import { shuffleArrayOfObjects } from "./../utils/index";
import { QUESTIONS } from "./../constants/questions";

export class QuestionsDataService {
  _getRandomizeQuestions = () => {
    const randomizedQuestions = shuffleArrayOfObjects(QUESTIONS);

    return randomizedQuestions.map((question) => ({
      ...question,
      answers: shuffleArrayOfObjects(question.answers),
    }));
  };

  getQuestionsData = () => {
    return this._getRandomizeQuestions();
  };
}
