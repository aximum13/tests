import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import userReducer from 'models/users';
import testsReducer from 'models/tests';
import playTestsReducer from 'models/playTests';

import usersSaga from 'models/users/sagas';
import testsSaga from 'models/tests/sagas';

const rootReducer = combineReducers({
  users: userReducer,
  tests: testsReducer,
  playTest: playTestsReducer,
});

function* rootSaga() {
  yield all([usersSaga(), testsSaga()]);
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
