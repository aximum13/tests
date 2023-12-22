import { Navigate, Route, Routes } from 'react-router-dom';

import { useAppSelector } from 'hooks';
import { isUser as user, isLoad } from 'models/users/selectors';

import AuthPage from 'pages/AuthPage';
import HomePage from 'pages/HomePage';
import NewTestPage from 'pages/NewTestPage';

import Spin from 'components/Spin';
import Container from 'components/Container';

import './styles/app.sass';

const App = () => {
  const loading = useAppSelector(isLoad);
  const isUser = useAppSelector(user);

  if (loading) {
    return <Spin />;
  }

  return (
    <>
      <Routes>
        {isUser ? (
          <Route path="/" element={<Container />}>
            <Route index element={<HomePage />} />
            <Route path="/signup" element={<Navigate to="/" />} />
            <Route path="new-test" element={<NewTestPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        ) : (
          <>
            <Route path="/signup" element={<Container />}>
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
