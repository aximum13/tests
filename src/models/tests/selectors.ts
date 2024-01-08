import { RootState } from 'store';

export const allTests = (state: RootState) => state.tests.testsData;
export const isTest = (state: RootState) => state.tests.test;
export const isLoading = (state: RootState) => state.tests.loading;
