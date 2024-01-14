import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { isAllTests, isLoading, isPagination } from 'models/tests/selectors';
import { logOutUser } from 'models/users';

import { isUser } from 'models/users/selectors';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getTests } from 'models/tests';
import { TestState } from 'models/tests/types';

import { sorted } from 'utils/sorted';
import { filterTests } from 'utils/filter';
import { formatDateTime } from 'utils/formatedDate';

import ReactPaginate from 'react-paginate';
import LogoutOutlined from '@ant-design/icons/lib/icons/LogoutOutlined';
import Title from 'components/Title';
import Spin from 'components/Spin';

import styles from './HomePage.module.sass';

const HomePage = () => {
  const [sortDirection, setSortDirection] = useState('');
  const [filteredTests, setFilteredTests] = useState<TestState[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('search') || '';

  const [searchValue, setSearchValue] = useState(searchQuery);
  const [searchTerm, setSearchTerm] = useState(searchQuery);

  const user = useAppSelector(isUser);
  const tests = useAppSelector(isAllTests);
  const pagination = useAppSelector(isPagination);
  const loading = useAppSelector(isLoading);

  const itemsPerPage = 5;
  const pageCount = pagination.total_pages;

  const testsPerPage = filteredTests.slice(0, itemsPerPage);
  const sortedTests = sorted(testsPerPage, sortDirection);

  const dispatch = useAppDispatch();

  const handleLogOut = () => dispatch(logOutUser());

  const toggleSortDirection = () => {
    if (!sortDirection) {
      setSortDirection('created_at_asc');
      searchParams.set('sort', 'created_at_asc');
      setSearchParams(searchParams);
    } else {
      const newDirection =
        sortDirection === 'created_at_desc'
          ? 'created_at_asc'
          : 'created_at_desc';
      setSortDirection(newDirection);
      searchParams.set('sort', newDirection);
      setSearchParams(searchParams);
    }
  };

  const handleSearchBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery: string = e.target.value;

    if (searchQuery.length) {
      searchParams.set('search', searchQuery);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
    setSearchTerm(searchQuery);
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
    console.log(selectedItem.selected, selectedItem, currentPage);
  };

  useEffect(() => {
    const filtered = filterTests(tests, searchTerm);
    setFilteredTests(filtered);
  }, [searchTerm, tests, currentPage]);

  useEffect(() => {
    if (!sortDirection) {
      searchParams.delete('sort');
      setSearchParams(searchParams);
    }

    dispatch(
      getTests({
        per: itemsPerPage,
        page: currentPage + 1,
        search: searchTerm,
        sort: sortDirection,
      })
    );
  }, [
    searchTerm,
    currentPage,
    sortDirection,
    dispatch,
    searchParams,
    setSearchParams,
  ]);

  return (
    <>
      <div className={classNames(styles.Header)}>
        <Title className={styles.Title} title={`Привет,  ${user?.username}`} />
        <button className={styles.BtnLogout} onClick={handleLogOut}>
          <LogoutOutlined />
          Выйти
        </button>
      </div>

      {user?.is_admin && (
        <Link className={classNames(styles.BtnAddTest)} to="/new-test">
          Добавить тест
        </Link>
      )}
      <div className={classNames(styles.TableContainer)}>
        <div className={classNames(styles.TableHead)}>
          <button
            className={classNames(styles.BtnSortTests)}
            onClick={toggleSortDirection}
          >
            Сортировать по дате (
            {sortDirection === 'created_at_desc' ? '↑' : '↓'})
          </button>
          <input
            className={styles.Filter}
            type="text"
            placeholder="Название теста"
            value={searchValue}
            onBlur={handleSearchBlur}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        {loading && <Spin />}

        <div className={classNames(styles.TableTest)}>
          {!loading &&
            sortedTests.map((test) => (
              <div
                key={test.id}
                className={classNames(styles.TestItem, {
                  [styles.TestItemUser]: !user?.is_admin,
                })}
              >
                <Link
                  // className={classNames(styles.BtnAddTest)}
                  to={`/${test.id}`}
                >
                  {test.title}
                </Link>
                {/* <p className={classNames(styles.TestTitle)}>{test.title}</p> */}
                <p className={classNames(styles.TestCreatedAt)}>
                  {formatDateTime(test.created_at)}
                </p>
                {user?.is_admin && (
                  <Link className={styles.TextDetail} to={`edit/${test.id}`}>
                    Редактировать тест
                  </Link>
                )}
              </div>
            ))}
        </div>

        <ReactPaginate
          previousLabel={'←'}
          nextLabel={'→'}
          pageCount={pageCount}
          breakClassName={styles.Break}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={classNames(styles.Pagination, {
            [styles.isLoading]: loading,
          })}
          activeClassName={styles.Active}
        />
      </div>
    </>
  );
};

export default HomePage;
