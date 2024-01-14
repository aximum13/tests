import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TestState, UserAnswersType } from './types';

const initialState: TestState & {
  questionId: number;
} = {
  id: 0,
  questions: [],
  title: '',
  userAnswers: [],
  questionId: 0,
};

const playTestSlice = createSlice({
  name: 'playTest',
  initialState,
  reducers: {
    getQuestions: (state, action: PayloadAction<TestState>) => {
      const { id, questions, title } = action.payload;
      state.id = id;
      state.questions = questions;
      state.title = title;
    },

    getQuestion: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.questionId = id;
    },

    setAnswer: (state, action: PayloadAction<UserAnswersType>) => {
      const { questionId, answer } = action.payload;
      const existingAnswerIndex = state.userAnswers?.findIndex(
        (userAnswer) => userAnswer.questionId === questionId
      );

      if (
        existingAnswerIndex !== -1 &&
        state.userAnswers &&
        existingAnswerIndex
      ) {
        state.userAnswers[existingAnswerIndex] = { questionId, answer };
      } else {
        state.userAnswers?.push({ questionId, answer });
      }
    },

    // Редактирование теста

    clearAnswers: (state) => {
      state.userAnswers = [];
    },
  },
});

const { actions, reducer } = playTestSlice;

export const { getQuestions, setAnswer, getQuestion, clearAnswers } = actions;

export default reducer;
