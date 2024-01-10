import { all, delay, put, takeEvery } from 'redux-saga/effects';
import {
  addUserSuccess,
  addUserFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  getUserSuccess,
  getUserFailure,
  logout,
  clearError,
  SIGNUP,
  SIGNIN,
  GETUSER,
  LOGOUT,
} from 'models/users';
import { signInApi, signUpApi, getUserApi, logOutApi } from 'API/users';
import { UserState } from './types';
import { PayloadAction } from '@reduxjs/toolkit';

function* signUpSaga(action: PayloadAction<UserState>) {
  let errorText = '';
  try {
    const newUser = action.payload;
    const response: Response = yield signUpApi(newUser);

    if (!response.ok) {
      const errorResponse: { username: string[] } = yield response.json();
      errorText = errorResponse.username[0];
      throw new Error();
    }

    const user: UserState = yield response.json();

    yield put(addUserSuccess(user));
  } catch (error: any) {
    console.error('Ошибка при регистрации нового пользователя:', error);

    yield put(
      addUserFailure(
        errorText === 'has already been taken'
          ? 'Имя пользователя занято'
          : 'Ошибка при регистрации. Перезагрузите страницу или попробуйте позднее'
      )
    );
    yield delay(5000);
    yield put(clearError());
  }
}

function* signInSaga(action: PayloadAction<UserState>) {
  let errorText = '';
  try {
    yield put(loginStart());
    const { username, password } = action.payload;
    const response: Response = yield signInApi(username, password);

    if (!response.ok) {
      const errorResponse: { error: string } = yield response.json();
      errorText = errorResponse.error;
      throw new Error();
    }

    const user: UserState = yield response.json();

    yield put(loginSuccess(user));
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    yield put(
      loginFailure(
        errorText === 'username or password is invalid'
          ? 'Неверное имя пользователя или пароль'
          : 'Ошибка при авторизации. Перезагрузите страницу или попробуйте позднее'
      )
    );
    yield delay(5000);
    yield put(clearError());
  }
}

function* getUserSaga(action: PayloadAction<number>) {
  try {
    const response: Response = yield getUserApi();

    if (!response.ok) {
      throw new Error();
    }

    const user: UserState = yield response.json();

    yield put(getUserSuccess(user));
  } catch (error: any) {
    console.error(
      'Ошибка при авторизации. Перезагрузите страницу или попробуйте позднее: ',
      error
    );
    yield put(getUserFailure());
  }
}

function* logOutSaga(action: PayloadAction<number>) {
  try {
    const response: Response = yield logOutApi();

    if (!response.ok) {
      throw new Error();
    }

    yield put(logout());
    localStorage.removeItem('user');
  } catch (error: any) {
    console.error('Ошибка при выходе из системы: ', error);
  }
}

function* watchSignUp() {
  yield takeEvery(SIGNUP, signUpSaga);
}

function* watchSignIn() {
  yield takeEvery(SIGNIN, signInSaga);
}

function* watchGetUser() {
  yield takeEvery(GETUSER, getUserSaga);
}

function* watchLogOut() {
  yield takeEvery(LOGOUT, logOutSaga);
}

export default function* usersSaga() {
  yield all([watchSignUp(), watchSignIn(), watchGetUser(), watchLogOut()]);
}
