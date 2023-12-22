import { RootState } from 'store';

export const isUser = (state: RootState) => state.users.user;
export const isError = (state: RootState) => state.users.error;
export const isLoad = (state: RootState) => state.users.loading;
