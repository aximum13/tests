export type TestState = {
  userAnswers?: UserAnswersType[];
};

export type UserAnswersType = {
  questionId: number;
  answer: number | { id: number; value: number }[];
};
