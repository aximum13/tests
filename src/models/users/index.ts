import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UsersState, UserState } from 'models/users/types';

const isUser = localStorage.getItem('user');

const user: UserState = isUser ? JSON.parse(isUser) : null;

const initialState: UsersState = {
  user: user || null,

  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUserSuccess: (state, action: PayloadAction<UserState>) => {
      const user = action.payload;
      state.user = user;
    },

    addUserFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },

    getUserSuccess: (state, action: PayloadAction<UserState>) => {
      const user = action.payload;
      state.user = user;
      state.loading = false;
      state.error = null;
    },

    getUserFailure: (state) => {
      state.loading = false;
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
      
    },
    isLoading: (state) => {
      state.loading = true;
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

export const GETUSER = 'users/getUser';
export const getUser = createAction(GETUSER);

export const LOGOUT = 'users/logOutUser';
export const logOutUser = createAction(LOGOUT);

const { actions, reducer } = usersSlice;

export const {
  addUserSuccess,
  addUserFailure,
  getUserSuccess,
  getUserFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
  isLoading,
} = actions;

export default reducer;
