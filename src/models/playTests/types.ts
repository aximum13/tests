export type TestState = {
  id: number;
  questions: QuestState[];
  title: string;
  userAnswers?: UserAnswersType[];
};

export type QuestState = {
  id: number;
  title: string;
  question_type: string;
  answers?: AnswerState[];
};

export type AnswerState = {
  text: string;
  is_right: boolean;
};

export type UserAnswersType = {
  questionId: number;
  answer: number | { id: number; value: number }[];
};
