import { RootState } from 'store';

export const user = (state: RootState) => state.users.user;
export const error = (state: RootState) => state.users.error;
export const isLoad = (state: RootState) => state.users.loading;
