import { RootState } from 'store';

export const isAllTests = (state: RootState) => state.tests.testsData.tests;
export const isPagination = (state: RootState) => state.tests.testsData.meta;
export const isTest = (state: RootState) => state.tests.test;
export const isLoading = (state: RootState) => state.tests.loading;
export const isError = (state: RootState) => state.tests.error;
export const isReady = (state: RootState) => state.tests.isReady;
