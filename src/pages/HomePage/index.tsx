import { logout } from 'models/users';
import { isUser } from 'models/users/selectors';
import { useAppDispatch, useAppSelector } from 'hooks';

import Title from 'components/Title';

const HomePage = () => {
  const user = useAppSelector(isUser);
  const dispatch = useAppDispatch();
  const handleLogOut = () => dispatch(logout());

  return (
    <>
      <Title title={`Привет,  ${user?.username}`} />

      <p>{user?.username}</p>

      <button onClick={handleLogOut}>Выйти </button>
    </>
  );
};

export default HomePage;
