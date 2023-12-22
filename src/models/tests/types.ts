export type AllTestsState = {
  testsData: TestsState;
  test?: string | null;
  error?: string | null;
  loading?: boolean;
};

export type TestsState = {
  tests: TestState[];
  meta: Object;
};

export type TestState = {
  created_at: string;
  id: number;
  questions: [];
  title: string;
};

export type QuestState = {
  title: string;
  question_type: string;
  answer: number;
};

export type AnswerState = {
  text: string;
  is_right: boolean;
};
