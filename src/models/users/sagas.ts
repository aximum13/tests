import { all, delay, put, takeEvery } from 'redux-saga/effects';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  addUserSuccess,
  addUserFailure,
  SIGNUP,
  SIGNIN,
  clearError,
} from 'models/users';
import { signInApi, signUpApi } from 'API/users';
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
          : errorText
          ? errorText
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
          : errorText
          ? errorText
          : 'Ошибка при авторизации. Перезагрузите страницу или попробуйте позднее'
      )
    );
    yield delay(5000);
    yield put(clearError());
    console.log(error);
  }
}

function* watchSignUp() {
  yield takeEvery(SIGNUP, signUpSaga);
}

function* watchSignIn() {
  yield takeEvery(SIGNIN, signInSaga);
}

export default function* usersSaga() {
  yield all([watchSignUp(), watchSignIn()]);
}
