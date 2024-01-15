import { RootState } from 'store';

export const isUserAnswers = (state: RootState) => state.playTest.userAnswers;
export const isQuestionId = (state: RootState) => state.playTest.questionId;
