import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UsersState, UserState } from 'models/users/types';

const isUser = localStorage.getItem('user');

const user: UserState = isUser ? JSON.parse(isUser) : null;

const initialState: UsersState = {
  users: [],
  user: user || null,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUserSuccess: (state, action: PayloadAction<UserState>) => {
      state.users.push(action.payload);
    },

    addUserFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    getUser: (state, action: PayloadAction<UserState>) => {
      const user = action.payload;
      state.user = user;
    },

    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<UserState>) => {
      state.loading = false;
      state.user = action.payload;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const SIGNUP = 'users/signUpUser';
export const createUser = createAction(SIGNUP, (payload: UserState) => ({
  payload,
}));

export const SIGNIN = 'users/signInUser';
export const signInUser = createAction(
  SIGNIN,
  (payload: Partial<UserState>) => ({
    payload,
  })
);

const { actions, reducer } = usersSlice;

export const {
  addUserSuccess,
  addUserFailure,
  getUser,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
} = actions;

export default reducer;
