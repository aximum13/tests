import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  AllTestsState,
  AnswerState,
  QuestState,
  SearchState,
  TestsState,
  TestState,
} from './types';

const initialState: AllTestsState = {
  testsData: {
    tests: [],
    meta: {
      total_pages: 1,
      total_count: 5,
    },
  },
  test: null,
  loading: false,
  error: null,
  isReady: false,
  isOpenModal: false,
};

const testsSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    // Новый тест

    addTestSuccess: (state, action: PayloadAction<TestState>) => {
      state.loading = false;
      state.testsData.tests.push(action.payload);
      state.isReady = true;
    },

    // Все тесты

    getTestsSuccess: (state, action: PayloadAction<TestsState>) => {
      state.loading = false;
      state.testsData.tests = action.payload.tests;
      state.testsData.meta = action.payload.meta;
    },

    // Запрос на тест по id

    getTestStart: (state) => {
      state.loading = true;
      state.test = null;
      state.error = null;
    },

    // Получение теста по id

    getTestSuccess: (state, action: PayloadAction<TestState>) => {
      state.loading = false;
      state.test = action.payload;
    },

    // Редактирование теста

    editTestSuccess: (state, action: PayloadAction<TestState>) => {
      state.loading = false;

      const { id, questions, title } = action.payload;

      state.testsData.tests = state.testsData.tests.map((test: TestState) =>
        test.id === id
          ? {
              ...test,
              title,
              questions,
            }
          : test
      );
    },

    deleteTestSuccess: (state, action: PayloadAction<number>) => {
      if (state.test) {
        const testId = action.payload;
        state.testsData.tests = state.testsData.tests.filter(
          (test) => test.id !== testId
        );
        state.isReady = true;
      }
    },

    // Новый вопрос

    addQuestionSuccess: (state, action: PayloadAction<QuestState>) => {
      state.loading = false;
      state.test?.questions.push(action.payload);
    },

    // Редактирование вопроса

    editQuestionSuccess: (state, action: PayloadAction<QuestState>) => {
      const { id, title, question_type, answer } = action.payload;
      if (state.test) {
        state.test.questions = state.test.questions.map(
          (question: QuestState) =>
            question.id === id
              ? { ...question, title, question_type, answer }
              : question
        );
      }
      state.loading = false;
    },

    // Удаление вопроса

    deleteQuestionSuccess: (state, action: PayloadAction<number>) => {
      if (state.test) {
        const idQuestion = action.payload;
        state.test.questions = state.test.questions.filter(
          (question) => question.id !== idQuestion
        );
      }
    },

    // Новый ответ

    addAnswerSuccess: (
      state,
      action: PayloadAction<AnswerState & { idQuestion: number }>
    ) => {
      state.loading = false;
      const questions = state.test?.questions;

      if (state.test && questions) {
        const questionIndex = questions.findIndex(
          (question) => question.id === action.payload.idQuestion
        );

        if (questionIndex !== -1) {
          questions[questionIndex].answers?.push(action.payload);
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

    // Перемещение ответа

    reorderedAnswerSuccess: (
      state,
      action: PayloadAction<Partial<AnswerState>>
    ) => {
      const { id, position } = action.payload;

      if (state.test) {
        const question = state.test.questions.find((question) =>
          question.answers?.some((answer) => answer.id === id)
        );

        if (question) {
          const answers = question.answers || [];
          const movedAnswer = answers.find((answer) => answer.id === id);

          if (
            movedAnswer !== undefined &&
            position !== undefined &&
            position >= 0
          ) {
            const filteredAnswers = answers.filter(
              (answer) => answer.id !== id
            );
            filteredAnswers.splice(position, 0, movedAnswer);
            question.answers = filteredAnswers;
          }
        }
      }
    },

    // Удаление ответа

    deleteAnswerSuccess: (
      state,
      action: PayloadAction<{ idQuestion: number; idAnswer: number }>
    ) => {
      if (state.test) {
        const { idQuestion, idAnswer } = action.payload;
        const question = state.test.questions.find(
          (question) => question.id === idQuestion
        );
        if (question && question.answers) {
          question.answers = question.answers.filter(
            (answer) => answer.id !== idAnswer
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

    redirectToHome: (state) => {
      state.isReady = false;
      state.test = null;
    },

    clearError: (state) => {
      state.error = null;
    },

    toggleModal: (state) => {
      state.isOpenModal = !state.isOpenModal;
    },
  },
});

export const NEW_TEST = 'tests/newTest';
export const createTest = createAction(NEW_TEST, (payload: string) => ({
  payload,
}));

export const GET_TESTS = 'tests/getTests';
export const getTests = createAction(GET_TESTS, (payload: SearchState) => ({
  payload,
}));

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
  (payload: {
    title: string;
    question_type: string;
    answer: number;
    idTest: number;
  }) => ({
    payload,
  })
);

export const EDIT_QUESTION = 'tests/editQuestion';
export const editQuestion = createAction(
  EDIT_QUESTION,
  (payload: Partial<QuestState>) => ({
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
  (payload: { text: string; is_right: boolean; idQuestion: number }) => ({
    payload,
  })
);

export const EDIT_ANSWER = 'tests/editAnswer';
export const editAnswer = createAction(EDIT_ANSWER, (payload: AnswerState) => ({
  payload,
}));

export const REORDER_ANSWER = 'tests/reorderAnswer';
export const reorderAnswer = createAction(
  REORDER_ANSWER,
  (payload: { id: number; position: number }) => ({
    payload,
  })
);

export const DELETE_ANSWER = 'tests/deleteAnswer';
export const deleteAnswer = createAction(
  DELETE_ANSWER,
  (payload: { idQuestion: number; idAnswer: number }) => ({
    payload,
  })
);

const { actions, reducer } = testsSlice;

export const {
  addTestSuccess,
  getTestsSuccess,
  getTestStart,
  getTestSuccess,
  editTestSuccess,
  deleteTestSuccess,
  addQuestionSuccess,
  editQuestionSuccess,
  deleteQuestionSuccess,
  addAnswerSuccess,
  editAnswerSuccess,
  reorderedAnswerSuccess,
  deleteAnswerSuccess,
  isLoading,
  isFailure,
  clearError,
  toggleModal,
  redirectToHome,
} = actions;

export default reducer;
