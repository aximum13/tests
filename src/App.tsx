import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAppSelector } from 'hooks';
import { user as customer, isLoad } from 'models/users/selectors';
import { message } from 'antd';
import { error as errorText } from 'models/tests/selectors';

import AuthPage from 'pages/AuthPage';
import HomePage from 'pages/HomePage';
import NewTestPage from 'pages/NewTestPage';
import TestPage from 'pages/TestPage';
import EditTestPage from 'pages/EditTestPage';

import Spin from 'components/Spin';
import Container from 'components/Container';

import './styles/app.sass';

const App = () => {
  const loading = useAppSelector(isLoad);
  const user = useAppSelector(customer);

  const error = useAppSelector(errorText);

  useEffect(() => {
    error && message.error(error, 4);
  });

  if (loading) {
    return <Spin />;
  }

  return (
    <>
      <Routes>
        {user ? (
          <Route path="/" element={<Container />}>
            <Route index element={<HomePage />} />
            <Route path="signup" element={<Navigate to="/" />} />
            <Route path="new-test" element={<NewTestPage />} />
            <Route
              path="edit/:id"
              element={
                user?.is_admin ? <EditTestPage /> : <Navigate to="/" replace />
              }
            />
            <Route path="/:id" element={<TestPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        ) : (
          <>
            <Route path="signup" element={<Container />}>
              <Route index element={<AuthPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/signup" replace />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
