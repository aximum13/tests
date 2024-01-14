import { RootState } from 'store';

export const isQuestions = (state: RootState) => state.playTest.questions;
export const isUserAnswers = (state: RootState) => state.playTest.userAnswers;
export const isTestId = (state: RootState) => state.playTest.id;
export const isTestTitle = (state: RootState) => state.playTest.title;
export const isQuestionId = (state: RootState) => state.playTest.questionId;
