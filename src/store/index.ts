import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import userReducer from 'models/users';
import usersSaga from 'models/users/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: userReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(usersSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
