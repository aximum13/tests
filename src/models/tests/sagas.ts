import { all, delay, put, takeEvery } from 'redux-saga/effects';
import {
  NEW_TEST,
  GET_TESTS,
  GET_TEST,
  EDIT_TEST,
  DELETE_TEST,
  NEW_QUESTION,
  EDIT_QUESTION,
  DELETE_QUESTION,
  NEW_ANSWER,
  EDIT_ANSWER,
  DELETE_ANSWER,
  //Test
  addTestSuccess,
  getTestsSuccess,
  getTestSuccess,
  editTestSuccess,
  deleteTestSuccess,
  //Question
  addQuestionSuccess,
  editQuestionSuccess,
  deleteQuestionSuccess,
  //Answer
  addAnswerSuccess,
  editAnswerSuccess,
  deleteAnswerSuccess,
  isLoading,
  isFailure,
  clearError,
  REORDER_ANSWER,
  reorderedAnswerSuccess,
} from '.';
import {
  newTestApi,
  getTestsApi,
  getTestApi,
  editTestApi,
  deleteTestApi,
  newQuestApi,
  editQuestApi,
  deleteQuestApi,
  newAnswerApi,
  editAnswerApi,
  deleteAnswerApi,
  reorderAnswerApi,
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

function* deleteTestSaga(action: PayloadAction<number>) {
  try {
    const testId = action.payload;

    const response: Response = yield deleteTestApi(testId);

    if (!response.ok) {
      const errorResponse: { error: string } = yield response.json();
      throw new Error(
        errorResponse.error || 'Ошибка запроса при удалении теста'
      );
    }

    yield put(deleteTestSuccess(testId));
  } catch (error: any) {
    console.error('Ошибка при удалении теста:', error);

    let errorMessage = 'Ошибка при удалении теста. Попробуйте еще раз';
    errorMessage = error.message;

    yield put(isFailure(errorMessage));
    yield delay(5000);
    yield put(clearError());
  }
}

function* watchDeleteTest() {
  yield takeEvery(DELETE_TEST, deleteTestSaga);
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
    const { title, question_type, idTest, answer } = action.payload;

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

function* editQuestionSaga(action: PayloadAction<Partial<QuestState>>) {
  try {
    // yield put(isLoading());
    const question = action.payload;
    const id = question.id;

    if (id) {
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
    }
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

function* deleteQuestionSaga(action: PayloadAction<number>) {
  try {
    const idQuestion = action.payload;

    const response: Response = yield deleteQuestApi(idQuestion);

    if (!response.ok) {
      const errorResponse: { error: string } = yield response.json();
      throw new Error(
        errorResponse.error || 'Ошибка запроса при удалении вопроса'
      );
    }

    yield put(deleteQuestionSuccess(idQuestion));
  } catch (error: any) {
    console.error('Ошибка при удалении вопроса:', error);

    let errorMessage = 'Ошибка при удалении вопроса. Попробуйте еще раз';
    errorMessage = error.message;

    yield put(isFailure(errorMessage));
    yield delay(5000);
    yield put(clearError());
  }
}

function* watchDeleteQuestion() {
  yield takeEvery(DELETE_QUESTION, deleteQuestionSaga);
}

function* addAnswerSaga(
  action: PayloadAction<{
    text: string;
    is_right: boolean;
    idQuestion: number;
  }>
) {
  try {
    yield put(isLoading());
    const { text, is_right, idQuestion } = action.payload;

    const response: Response = yield newAnswerApi(idQuestion, text, is_right);

    if (!response.ok) {
      const errorResponse: { error: string } = yield response.json();
      throw new Error(errorResponse.error || 'Ошибка при добавлении ответа');
    }

    const payload: AnswerState = yield response.json();

    // console.log(payload);

    yield put(
      addAnswerSuccess({
        idQuestion,
        id: payload.id,
        text: payload.text,
        is_right: payload.is_right,
        position: 1,
      })
    );
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

function* editAnswerSaga(action: PayloadAction<AnswerState>) {
  try {
    const answer = action.payload;
    const id = answer.id;

    const response: Response = yield editAnswerApi(id, answer);

    if (!response.ok) {
      const errorResponse: { error: string } = yield response.json();
      throw new Error(
        errorResponse.error || 'Ошибка запроса при редактировании ответа'
      );
    }

    const editAnswer: AnswerState = yield response.json();
    yield put(editAnswerSuccess(editAnswer));
  } catch (error: any) {
    console.error('Ошибка при редактировании ответа:', error);

    let errorMessage = 'Ошибка при редактировании теста. Попробуйте еще раз';
    errorMessage = error.message;

    yield put(isFailure(errorMessage));
    yield delay(5000);
    yield put(clearError());
  }
}

function* watchEditAnswer() {
  yield takeEvery(EDIT_ANSWER, editAnswerSaga);
}

function* handleUpdateAnswerOrder(
  action: PayloadAction<{ id: number; position: number }>
) {
  try {
    const { id, position } = action.payload;

    yield put(reorderedAnswerSuccess({ id, position }));

    const response: Response = yield reorderAnswerApi(id, position);

    if (!response.ok) {
      const errorResponse: { error: string } = yield response.json();
      throw new Error(
        errorResponse.error ||
          'Ошибка запроса при редактировании позиции ответа'
      );
    }
  } catch (error: any) {
    console.error('Ошибка при редактировании позиции ответа:', error);

    let errorMessage =
      'Ошибка при редактировании позиции теста. Попробуйте еще раз';
    errorMessage = error.message;

    yield put(isFailure(errorMessage));
    yield delay(5000);
    yield put(clearError());
  }
}

function* watchReorderAnswer() {
  yield takeEvery(REORDER_ANSWER, handleUpdateAnswerOrder);
}

function* deleteAnswerSaga(
  action: PayloadAction<{ idQuestion: number; idAnswer: number }>
) {
  try {
    const { idQuestion, idAnswer } = action.payload;

    const response: Response = yield deleteAnswerApi(idAnswer);

    if (!response.ok) {
      const errorResponse: { error: string } = yield response.json();
      throw new Error(
        errorResponse.error || 'Ошибка запроса при удалении ответа'
      );
    }

    yield put(deleteAnswerSuccess({ idQuestion, idAnswer }));
  } catch (error: any) {
    console.error('Ошибка при удалении ответа:', error);

    let errorMessage = 'Ошибка при удалении вопроса. Попробуйте еще раз';
    errorMessage = error.message;

    yield put(isFailure(errorMessage));
    yield delay(5000);
    yield put(clearError());
  }
}

function* watchDeleteAnswer() {
  yield takeEvery(DELETE_ANSWER, deleteAnswerSaga);
}

export default function* usersSaga() {
  yield all([
    watchNewTest(),
    watchGetTests(),
    watchGetTest(),
    watchEditTest(),
    watchDeleteTest(),
    watchAddQuestion(),
    watchEditQuestion(),
    watchDeleteQuestion(),
    watchAddAnswer(),
    watchEditAnswer(),
    watchReorderAnswer(),
    watchDeleteAnswer(),
  ]);
}
