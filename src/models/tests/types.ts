export type AllTestsState = {
  testsData: TestsState;
  test: TestState | null;
  error?: string | null;
  loading?: boolean;
  isReady?: boolean;
  isOpenModal?: boolean;
};

export type TestsState = {
  tests: TestState[];
  meta: { total_pages: number; total_count: number };
};

export type TestState = {
  id: number;
  created_at: string;
  questions: QuestionState[];
  title: string;
};

export type QuestionState = {
  id: number;
  title: string;
  question_type: string;
  answer: number;
  answers: AnswerState[];
};

export type NewQuestionState = Omit<QuestionState, 'answers'>;

export type AnswerState = {
  id: number;
  text: string;
  is_right: boolean;
  position: number;
};

export type SearchState = {
  page: number;
  per: number;
  search: string;
  sort: string;
};

export type UserAnswersType = {
  questionId: number;
  answer: number | number[];
};
