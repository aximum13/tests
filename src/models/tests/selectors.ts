import { RootState } from 'store';

export const allTests = (state: RootState) => state.tests.testsData.tests;
export const pagination = (state: RootState) => state.tests.testsData.meta;
export const test = (state: RootState) => state.tests.test;

export const isLoading = (state: RootState) => state.tests.loading;
export const error = (state: RootState) => state.tests.error;
export const isReady = (state: RootState) => state.tests.isReady;
export const isOpenModal = (state: RootState) => state.tests.isOpenModal;
