import { QuestState } from 'models/tests/types';

type UserAnswersType = {
  questionId: number;
  answer: number | { id: number; value: number }[];
};

export const checkAnswers = (
  userAnswers: UserAnswersType[],
  questions: QuestState[]
) => {
  const results: { [key: number]: boolean } = {};

  questions.forEach((question) => {
    const userAnswer = userAnswers.find(
      (answer) => answer.questionId === question.id
    );

    if (
      userAnswer &&
      typeof userAnswer.answer === 'number' &&
      question.answers &&
      question.question_type === 'single'
    ) {
      const selectedAnswer = question.answers[userAnswer.answer];

      results[question.id] = selectedAnswer.is_right;
    } else if (
      userAnswer &&
      Array.isArray(userAnswer.answer) &&
      question.answers &&
      question.question_type === 'multiple'
    ) {
      const selectedAnswers = userAnswer.answer.map(
        (index) => question.answers && question.answers[index.value]
      );

      const isRightAnswer = selectedAnswers.every(
        (selectedAnswer) => selectedAnswer && selectedAnswer.is_right
      );

      results[question.id] = isRightAnswer;
    } else if (
      userAnswer &&
      question.answers &&
      question.question_type === 'number'
    ) {
      const enteredAnswer = question.answers[0].text;

      const isRightAnswer = +enteredAnswer === userAnswer.answer;

      results[question.id] = isRightAnswer;
    } else {
      results[question.id] = false;
    }
  });

  const correctAnswersCount = Object.values(results).filter(
    (value) => value === true
  ).length;

  return correctAnswersCount;
};
