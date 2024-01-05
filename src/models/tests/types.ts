export type AllTestsState = {
  testsData: TestsState;
  test?: TestState | null;
  error?: string | null;
  loading?: boolean;
};

export type TestsState = {
  tests: TestState[];
  meta: Object;
};

export type TestState = {
  id: number;
  created_at: string;
  questions: QuestState[];
  title: string;
};

export type QuestState = {
  id: number;
  title: string;
  question_type: string;
  answer: number;
  answers?: AnswerState[];
};

export type AnswerState = {
  id: number;
  text: string;
  is_right: boolean;
};
