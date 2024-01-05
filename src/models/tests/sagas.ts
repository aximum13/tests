import { all, delay, put, takeEvery } from 'redux-saga/effects';
import {
  addTestSuccess,
  isFailure,
  getTestsSuccess,
  clearError,
  NEW_TEST,
  GET_TESTS,
  EDIT_TEST,
  editTestSuccess,
  getTestSuccess,
  GET_TEST,
  getTestStart,
  addQuestionSuccess,
  NEW_QUESTION,
  NEW_ANSWER,
  addAnswerSuccess,
  EDIT_QUESTION,
  editQuestionSuccess,
  isLoading,
} from '.';
import {
  editQuestApi,
  editTestApi,
  getTestApi,
  getTestsApi,
  newAnswerApi,
  newQuestApi,
  newTestApi,
} from 'API/tests';
import { PayloadAction } from '@reduxjs/toolkit';
import { AnswerState, QuestState, TestState, TestsState } from './types';

function* newTestSaga(action: PayloadAction<string>) {
  try {
    const title = action.payload;
    const response: Response = yield newTestApi(title);

    // console.log(response);

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

    yield put(isFailure(errorMessage));
    yield delay(5000);
    yield put(clearError());
  }
}

function* watchNewTest() {
  yield takeEvery(NEW_TEST, newTestSaga);
}

function* getTestsSaga() {
  try {
    yield put(isLoading());
    const response: Response = yield getTestsApi();
    const isTest = localStorage.getItem('test');

    if (!response.ok) {
      const errorResponse: { error: string } = yield response.json();
      throw new Error(errorResponse.error || 'Ошибка запроса тестов');
    }

    const payload: TestsState = yield response.json();

    // console.log(payload, isTest);

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

    yield put(isFailure(errorMessage));
    yield delay(5000);
    yield put(clearError());
  }
}

function* watchGetTests() {
  yield takeEvery(GET_TESTS, getTestsSaga);
}

function* getTestSaga(action: PayloadAction<number>) {
  try {
    // yield put(getTestStart());
    yield put(isLoading());

    const id = action.payload;
    const response: Response = yield getTestApi(id);

    // console.log(response);
    if (!response.ok) {
      throw new Error(`Ошибка при открытии теста, статус: ${response.status}`);
    }

    const getTest: TestState = yield response.json();

    yield put(getTestSuccess(getTest));
  } catch (error: any) {
    console.error('Ошибка при получении теста:', error);

    let errorMessage = 'Ошибка при получении теста. Попробуйте еще раз';
    if (error.message === 'has already been taken') {
      errorMessage = 'Тест уже существует';
    } else if (error.message) {
      errorMessage = error.message;
    }

    yield put(isFailure(errorMessage));
    yield delay(5000);
    yield put(clearError());
  }
}

function* watchGetTest() {
  yield takeEvery(GET_TEST, getTestSaga);
}

function* editTestSaga(action: PayloadAction<TestState>) {
  try {
    const id = action.payload.id;
    const test = action.payload;
    const response: Response = yield editTestApi(id, test);

    if (!response.ok) {
      const errorResponse: { error: string } = yield response.json();
      throw new Error(
        errorResponse.error || 'Ошибка запроса при редактировании теста'
      );
    }

    const editTest: TestState = yield response.json();
    yield put(editTestSuccess(editTest));
  } catch (error: any) {
    console.error('Ошибка при редактировании теста:', error);

    let errorMessage = 'Ошибка при редактировании теста. Попробуйте еще раз';
    errorMessage = error.message;

    yield put(isFailure(errorMessage));
    yield delay(5000);
    yield put(clearError());
  }
}

function* watchEditTest() {
  yield takeEvery(EDIT_TEST, editTestSaga);
}

function* addQuestionSaga(
  action: PayloadAction<{
    title: string;
    question_type: string;
    answer: number;
    idTest: number;
  }>
) {
  try {
    yield put(isLoading());
    const { title, question_type, answer, idTest } = action.payload;

    const response: Response = yield newQuestApi(
      idTest,
      title,
      question_type,
      answer
    );

    // console.log(response);

    if (!response.ok) {
      const errorResponse: { error: string } = yield response.json();
      throw new Error(errorResponse.error || 'Ошибка при добавлении вопроса');
    }

    const payload: QuestState = yield response.json();

    // console.log(payload);

    yield put(addQuestionSuccess(payload));
  } catch (error: any) {
    console.error('Ошибка при добавлении вопроса:', error);

    let errorMessage = 'Ошибка при добавлении вопроса. Попробуйте еще раз';
    if (error.message === 'has already been taken') {
      errorMessage = 'Вопрос уже существует';
    } else if (error.message) {
      errorMessage = error.message;
    }

    yield put(isFailure(errorMessage));
    yield delay(5000);
    yield put(clearError());
  }
}

function* watchAddQuestion() {
  yield takeEvery(NEW_QUESTION, addQuestionSaga);
}

function* editQuestionSaga(action: PayloadAction<QuestState>) {
  try {
    const question = action.payload;
    const id = question.id;

    const response: Response = yield editQuestApi(id, question);
    // console.log({ id, question });

    if (!response.ok) {
      const errorResponse: { error: string } = yield response.json();
      throw new Error(
        errorResponse.error || 'Ошибка запроса при редактировании теста'
      );
    }

    const editQuestion: QuestState = yield response.json();
    yield put(editQuestionSuccess(editQuestion));
  } catch (error: any) {
    console.error('Ошибка при редактировании теста:', error);

    let errorMessage = 'Ошибка при редактировании теста. Попробуйте еще раз';
    errorMessage = error.message;

    yield put(isFailure(errorMessage));
    yield delay(5000);
    yield put(clearError());
  }
}

function* watchEditQuestion() {
  yield takeEvery(EDIT_QUESTION, editQuestionSaga);
}

function* addAnswerSaga(
  action: PayloadAction<{
    text: string;
    is_right: boolean;
    idQuestion: number;
    idTest: number;
  }>
) {
  try {
    yield put(isLoading());
    const { text, is_right, idQuestion, idTest } = action.payload;

    const response: Response = yield newAnswerApi(
      idQuestion,
      idTest,
      text,
      is_right
    );

    if (!response.ok) {
      const errorResponse: { error: string } = yield response.json();
      throw new Error(errorResponse.error || 'Ошибка при добавлении ответа');
    }

    const payload: AnswerState = yield response.json();

    // console.log(payload);

    yield put(addAnswerSuccess(payload));
  } catch (error: any) {
    console.error('Ошибка при добавлении ответа:', error);

    let errorMessage = 'Ошибка при добавлении ответа. Попробуйте еще раз';
    if (error.message === 'has already been taken') {
      errorMessage = 'Ответ уже существует';
    } else if (error.message) {
      errorMessage = error.message;
    }

    yield put(isFailure(errorMessage));
    yield delay(5000);
    yield put(clearError());
  }
}

function* watchAddAnswer() {
  yield takeEvery(NEW_ANSWER, addAnswerSaga);
}

export default function* usersSaga() {
  yield all([
    watchNewTest(),
    watchGetTests(),
    watchGetTest(),
    watchEditTest(),
    watchAddQuestion(),
    watchAddAnswer(),
    watchEditQuestion(),
  ]);
}
