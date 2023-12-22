import { RootState } from 'store';

export const allTests = (state: RootState) => state.tests.testsData;
export const isLoadTests = (state: RootState) => state.tests.loading;
