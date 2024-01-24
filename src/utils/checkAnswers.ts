import { QuestionState } from 'models/tests/types';

import { UserAnswersType } from 'models/tests/types';

export const checkAnswers = (
  userAnswers: UserAnswersType[],
  questions: QuestionState[]
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
      question.question_type === 'multiple'
    ) {
      const selectedAnswers = userAnswer.answer.map(
        (index) => question.answers && question.answers[index]
      );

      const isCountUserRightAnswer = selectedAnswers.every(
        (selectedAnswer) => selectedAnswer && selectedAnswer.is_right === true
      );

      const isCountRightAnswer = question.answers?.filter(
        (answer) => answer && answer.is_right === true
      );

      const isRightAnswer =
        isCountUserRightAnswer &&
        selectedAnswers.length === isCountRightAnswer?.length
          ? true
          : false;

      console.log(
        question.answers?.filter(
          (answer) => answer && answer.is_right === true
        ),
        selectedAnswers.filter(
          (selectedAnswer) => selectedAnswer && selectedAnswer.is_right === true
        )
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
    console.log(results);
  });

  const correctAnswersCount = Object.values(results).filter(
    (value) => value === true
  ).length;

  return correctAnswersCount;
};
