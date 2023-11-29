import { RootState } from 'store';

export const isUser = (state: RootState) => state.user;
export const isError = (state: RootState) => state.error;
