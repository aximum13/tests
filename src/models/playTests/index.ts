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

      const selectedAnswerIndex = state.userAnswers?.findIndex(
        (userAnswer) => userAnswer.questionId === questionId
      );

      if (state.userAnswers) {
        if (selectedAnswerIndex !== undefined && selectedAnswerIndex === -1) {
          state.userAnswers?.push({ questionId, answer });
        }
        state.userAnswers = state.userAnswers.map(
          (selectedAnswer: UserAnswersType) =>
            selectedAnswer.questionId === questionId
              ? { ...selectedAnswer, answer }
              : selectedAnswer
        );
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
