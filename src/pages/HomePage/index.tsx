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
import { TestState } from 'models/tests/types';
import { formatDateTime } from 'utils/formatedFate';

const HomePage = () => {
  const [sortDirection, setSortDirection] = useState('asc');

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTests, setFilteredTests] = useState<TestState[]>([]);

  const user = useAppSelector(isUser);
  const tests = useAppSelector(allTests);

  const dispatch = useAppDispatch();

  useEffect(() => {
    !tests.tests.length && dispatch(getTests());
  }, [dispatch, tests]);

  const loading = useAppSelector(isLoading);

  const handleLogOut = () => dispatch(logOutUser());

  const sortedTests = filteredTests.slice().sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();

    if (sortDirection === 'asc') {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });

  const toggleSortDirection = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);
  };

  useEffect(() => {
    const filtered = tests.tests.filter((test) =>
      test.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTests(filtered);
  }, [searchTerm, tests.tests]);

  return (
    <>
      <div className={classNames(styles.Header)}>
        <Title className={styles.Title} title={`Привет,  ${user?.username}`} />
        <button onClick={handleLogOut}>Выйти </button>
      </div>

      <div className={classNames(styles.TableHead)}>
        {user?.is_admin && <Link to="/new-test">Добавить тест</Link>}
        <button onClick={toggleSortDirection}>
          Сортировать по дате ({sortDirection === 'asc' ? 'возр' : 'убыв'})
        </button>
        <input
          type="text"
          placeholder="Название теста"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading && <Spin />}
      <ul className={classNames(styles.TableTest)}>
        {!loading &&
          sortedTests.map((test) => (
            <li key={test.id} className={classNames(styles.TestItem)}>
              <p className={classNames(styles.s)}>{test.title}</p>
              <p className={classNames(styles.s)}>
                {formatDateTime(test.created_at)}
              </p>
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
