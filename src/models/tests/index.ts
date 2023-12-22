import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AllTestsState, TestsState, TestState } from './types';

const isTest = localStorage.getItem('test');

const isTests = localStorage.getItem('tests');

const tests: TestsState = isTests ? JSON.parse(isTests) : null;

console.log(isTests);

const test: string = isTest ? JSON.parse(isTest) : null;

const initialState: AllTestsState = {
  testsData: tests || { tests: [], meta: {} },
  test: test || null,
  loading: false,
  error: null,
};

const testsSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    addTestSuccess: (state, action: PayloadAction<TestState>) => {
      state.testsData.tests.push(action.payload);
    },

    addTestFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    getTestsStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    getTestsSuccess: (state, action) => {
      state.loading = false;
      state.testsData.tests = action.payload.tests;
      state.testsData.meta = action.payload.meta;
    },

    getTestsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    editTestSuccess: (state, action: PayloadAction<TestState>) => {
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

    editTestsFailure: (state, action) => {
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

export const EDIT_TEST = 'tests/editTest';
export const editTest = createAction(EDIT_TEST, (payload: TestState) => ({
  payload,
}));

const { actions, reducer } = testsSlice;

export const {
  addTestSuccess,
  addTestFailure,
  getTestsStart,
  getTestsSuccess,
  getTestsFailure,
  editTestSuccess,
  clearError,
} = actions;

export default reducer;
