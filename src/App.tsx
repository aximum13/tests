import { useAppSelector } from 'hooks';
import AuthPage from 'pages/AuthPage';
import HomePage from 'pages/HomePage';
import { Navigate, Route, Routes } from 'react-router-dom';

import './styles/app.sass';
import { isUser as user } from 'models/users/selectors';
import Spin from 'components/Spin';
import Container from 'components/Container';

const App = () => {
  const isUser = useAppSelector(user);
  const loading = useAppSelector((state) => state.loading);

  if (loading) {
    return <Spin />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Container />}>
          <Route
            index
            element={isUser ? <HomePage /> : <Navigate to="signup" />}
          />
          <Route
            path="signup"
            element={!isUser ? <AuthPage /> : <Navigate to="/" />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
