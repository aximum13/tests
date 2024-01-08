import { logOutUser } from 'models/users';
import { isUser } from 'models/users/selectors';
import { useAppDispatch, useAppSelector } from 'hooks';

import Title from 'components/Title';

import styles from './HomePage.module.sass';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { getTests } from 'models/tests';
import { allTests, isLoading } from 'models/tests/selectors';
import { useEffect, useState } from 'react';
import Spin from 'components/Spin';

const HomePage = () => {
  const [testsLoaded, setTestsLoaded] = useState(false);

  const user = useAppSelector(isUser);
  const tests = useAppSelector(allTests);

  const dispatch = useAppDispatch();

  useEffect(() => {
    !tests.tests.length && dispatch(getTests());
  }, [dispatch, tests]);

  useEffect(() => {
    tests.tests.length && setTestsLoaded(true);
  }, [tests]);

  const loading = useAppSelector(isLoading);

  const handleLogOut = () => dispatch(logOutUser());

  return (
    <>
      <div className={classNames(styles.Header)}>
        <Title className={styles.Title} title={`Привет,  ${user?.username}`} />
        <button onClick={handleLogOut}>Выйти </button>
      </div>

      <div className={classNames(styles.TableHead)}>
        {user?.is_admin && <Link to="/new-test">Добавить тест</Link>}
        <input type="text" placeholder="Название теста" />
      </div>

      {loading && <Spin />}
      <ul className={classNames(styles.TableTest)}>
        {testsLoaded &&
          tests.tests.map((test) => (
            <li key={test.id} className={classNames(styles.TestItem)}>
              <p className={classNames(styles.s)}>{test.title}</p>
              {user?.is_admin && (
                <Link className={styles.TextDetail} to={`edit/${test.id}`}>
                  Редактировать тест
                </Link>
              )}
            </li>
          ))}
      </ul>
    </>
  );
};

export default HomePage;
