import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AllTestsState, AnswerState, QuestState, TestState } from './types';

const initialState: AllTestsState = {
  testsData: { tests: [], meta: {} },
  test: null,
  loading: false,
  error: null,
};

const testsSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    // Новый тест

    addTestSuccess: (state, action: PayloadAction<TestState>) => {
      state.loading = false;
      state.testsData.tests.push(action.payload);
    },

    // Все тесты

    getTestsSuccess: (state, action) => {
      state.loading = false;
      state.testsData.tests = action.payload.tests;
      state.testsData.meta = action.payload.meta;
    },

    // Запрос на тест по id

    getTestStart: (state) => {
      state.loading = true;
      // state.test = null;
      state.error = null;
    },

    // Получение теста по id

    getTestSuccess: (state, action) => {
      state.loading = false;
      state.test = action.payload;
    },

    // Редактирование теста

    editTestSuccess: (state, action: PayloadAction<TestState>) => {
      state.loading = false;

      const { id, questions, title } = action.payload;

      state.testsData.tests = state.testsData.tests.map((test: TestState) => {
        if (test.id === id) {
          return {
            ...test,
            title,
            questions,
          };
        }
        return test;
      });
    },

    // Новый вопрос

    addQuestionSuccess: (state, action: PayloadAction<QuestState>) => {
      state.loading = false;
      state.test?.questions.push(action.payload);
    },

    // Редактирование вопроса

    editQuestionSuccess: (state, action: PayloadAction<QuestState>) => {
      state.loading = false;
      const { id, title, question_type, answer } = action.payload;
      if (state.test) {
        state.test.questions = state.test.questions.map(
          (question: QuestState) =>
            question.id === id
              ? { ...question, title, question_type, answer }
              : question
        );
      }
    },

    // Удаление вопроса

    deleteQuestionSuccess: (state, action: PayloadAction<number>) => {
      if (state.test) {
        const questionId = action.payload;
        state.test.questions = state.test.questions.filter(
          (question) => question.id !== questionId
        );
      }
    },

    // Новый ответ

    addAnswerSuccess: (state, action: PayloadAction<AnswerState>) => {
      state.loading = false;
      if (state.test) {
        const questionIndex = state.test.questions.findIndex(
          (question) => question.id === action.payload.id
        );

        if (questionIndex !== -1) {
          state.test.questions[questionIndex].answers?.push(action.payload);
        }
      }
    },

    // Редактирование ответа

    editAnswerSuccess: (state, action: PayloadAction<AnswerState>) => {
      if (state.test) {
        if (state.test) {
          const { id, text, is_right } = action.payload;
          const question = state.test.questions.find((question) =>
            question.answers?.some((answer) => answer.id === id)
          );

          if (question) {
            question.answers = question.answers?.map((answer) =>
              answer.id === id ? { ...answer, text, is_right } : answer
            );
          }
        }
      }
    },

    // Удаление ответа

    deleteAnswerSuccess: (
      state,
      action: PayloadAction<{ questionId: number; answerId: number }>
    ) => {
      if (state.test) {
        const { questionId, answerId } = action.payload;
        const question = state.test.questions.find(
          (question) => question.id === questionId
        );
        if (question && question.answers) {
          question.answers = question.answers.filter(
            (answer) => answer.id !== answerId
          );
        }
      }
    },

    isLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    isFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const NEW_TEST = 'tests/newTest';
export const createTest = createAction(NEW_TEST, (payload: string) => ({
  payload,
}));

export const GET_TESTS = 'tests/getTests';
export const getTests = createAction(GET_TESTS);

export const GET_TEST = 'tests/getTest';
export const getTest = createAction(GET_TEST, (payload: number) => ({
  payload,
}));

export const EDIT_TEST = 'tests/editTest';
export const editTest = createAction(EDIT_TEST, (payload: TestState) => ({
  payload,
}));

export const DELETE_TEST = 'tests/deleteTest';
export const deleteTest = createAction(DELETE_TEST, (payload: number) => ({
  payload,
}));

export const NEW_QUESTION = 'tests/newQuestion';
export const createQuestion = createAction(
  NEW_QUESTION,
  (payload: { title: string; question_type: string; answer: number }) => ({
    payload,
  })
);

export const EDIT_QUESTION = 'tests/editQuestion';
export const editQuestion = createAction(
  EDIT_QUESTION,
  (payload: QuestState) => ({
    payload,
  })
);

export const DELETE_QUESTION = 'tests/deleteQuestion';
export const deleteQuestion = createAction(
  DELETE_QUESTION,
  (payload: number) => ({
    payload,
  })
);

export const NEW_ANSWER = 'tests/newAnswer';
export const createAnswer = createAction(
  NEW_ANSWER,
  (payload: { text: string; is_right: boolean }) => ({
    payload,
  })
);

export const EDIT_ANSWER = 'tests/editAnswer';
export const editAnswer = createAction(EDIT_ANSWER, (payload: AnswerState) => ({
  payload,
}));
const { actions, reducer } = testsSlice;

export const DELETE_ANSWER = 'tests/deleteAnswer';
export const deleteAnswer = createAction(
  DELETE_ANSWER,
  (payload: { questionId: number; answerId: number }) => ({
    payload,
  })
);

export const {
  addTestSuccess,
  getTestsSuccess,
  getTestStart,
  getTestSuccess,
  editTestSuccess,
  addQuestionSuccess,
  editQuestionSuccess,
  deleteQuestionSuccess,
  addAnswerSuccess,
  editAnswerSuccess,
  deleteAnswerSuccess,
  isLoading,
  isFailure,
  clearError,
} = actions;

export default reducer;
