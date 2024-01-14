export type AllTestsState = {
  testsData: TestsState;
  test?: TestState | null;
  error?: string | null;
  loading?: boolean;
  isReady?: boolean;
};

export type TestsState = {
  tests: TestState[];
  meta: { total_pages: number; total_count: number };
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
  position: number;
};

export type SearchState = {
  page: number;
  per: number;
  search: string;
  sort: string;
};
