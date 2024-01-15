import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TestState, UserAnswersType } from './types';

const initialState: TestState & {
  questionId: number;
} = {
  userAnswers: [],
  questionId: 0,
};

const playTestSlice = createSlice({
  name: 'playTest',
  initialState,
  reducers: {
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

    clearAnswers: (state) => {
      state.userAnswers = [];
    },
  },
});

const { actions, reducer } = playTestSlice;

export const { setAnswer, getQuestion, clearAnswers } = actions;

export default reducer;
