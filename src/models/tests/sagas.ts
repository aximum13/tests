import { all, delay, put, takeEvery } from 'redux-saga/effects';
import {
  addTestSuccess,
  addTestFailure,
  getTestsSuccess,
  getTestsFailure,
  clearError,
  NEW_TEST,
  GET_TESTS,
  EDIT_TEST,
  getTestsStart,
  editTestSuccess,
} from '.';
import { editTestApi, getTestsApi, newTestApi } from 'API/tests';
import { PayloadAction } from '@reduxjs/toolkit';
import { TestState, TestsState } from './types';

function* newTestSaga(action: PayloadAction<string>) {
  try {
    const title = action.payload;
    const response: Response = yield newTestApi(title);

    console.log(response);

    if (!response.ok) {
      const errorResponse: { error: string } = yield response.json();
      throw new Error(
        errorResponse.error || 'Ошибка запроса при добавлении теста'
      );
    }

    const test: TestState = yield response.json();

    yield put(addTestSuccess(test));
  } catch (error: any) {
    console.error('Ошибка при добавлении теста:', error);

    let errorMessage = 'Ошибка при добавлении теста. Попробуйте еще раз';
    errorMessage = error.message;

    yield put(addTestFailure(errorMessage));
    yield delay(5000);
    yield put(clearError());
  }
}

function* watchNewTest() {
  yield takeEvery(NEW_TEST, newTestSaga);
}

function* getTestsSaga() {
  try {
    yield put(getTestsStart());
    const response: Response = yield getTestsApi();
    const isTest = localStorage.getItem('test');

    if (!response.ok) {
      const errorResponse: { error: string } = yield response.json();
      throw new Error(errorResponse.error || 'Ошибка запроса тестов');
    }

    const payload: TestsState = yield response.json();

    console.log(payload, isTest);

    yield put(getTestsSuccess({ tests: payload.tests, meta: payload.meta }));

    isTest === null &&
      localStorage.setItem(
        'tests',
        JSON.stringify({ tests: payload.tests, meta: payload.meta })
      );
  } catch (error: any) {
    console.error('Ошибка при получении тестов:', error);

    let errorMessage = 'Ошибка при получении тестов. Попробуйте еще раз';
    if (error.message === 'has already been taken') {
      errorMessage = 'Тест уже существует';
    } else if (error.message) {
      errorMessage = error.message;
    }

    yield put(getTestsFailure(errorMessage));
    yield delay(5000);
    yield put(clearError());
  }
}

function* watchGetTests() {
  yield takeEvery(GET_TESTS, getTestsSaga);
}

function* editTestSaga(action: PayloadAction<TestState>) {
  try {
    const id = action.payload.id;
    const tets = action.payload;
    const response: Response = yield editTestApi(id, tets);

    if (!response.ok) {
      const errorResponse: { error: string } = yield response.json();
      throw new Error(
        errorResponse.error || 'Ошибка запроса при редактировании теста'
      );
    }

    const editSong: TestState = yield response.json();
    yield put(editTestSuccess(editSong));
  } catch (error: any) {
    console.error('Ошибка при редактировании теста:', error);

    let errorMessage = 'Ошибка при редактировании теста. Попробуйте еще раз';
    errorMessage = error.message;

    yield put(addTestFailure(errorMessage));
    yield delay(5000);
    yield put(clearError());
  }
}

function* watchEditTest() {
  yield takeEvery(EDIT_TEST, editTestSaga);
}

export default function* usersSaga() {
  yield all([watchNewTest(), watchGetTests(), watchEditTest()]);
}
