import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { logOutUser } from 'models/users';

import { user as loggedInUser } from 'models/users/selectors';
import { useAppDispatch, useAppSelector } from 'hooks';

import ReactPaginate from 'react-paginate';
import LogoutOutlined from '@ant-design/icons/lib/icons/LogoutOutlined';
import Title from 'components/Title';
import Spin from 'components/Spin';

import styles from './HomePage.module.sass';
import ModalChoice from 'components/ModalChoice';
import Test from 'components/Test';
import { useTestsData } from 'hooks/useTests';

const HomePage = () => {
  const {
    currentPage,
    pagination,
    searchValue,
    sortDirection,
    sortedTests,
    isLoad,
    handleToggleSortDirection,
    handleSearchChange,
    handleSearchBlur,
    handlePageChange,
  } = useTestsData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idTest, setIdTest] = useState(0);

  const user = useAppSelector(loggedInUser)!;

  const pageCount = pagination.total_pages;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => dispatch(logOutUser());

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const runTest = (id: number) => {
    setIdTest(id);
    handleModalToggle();
  };

  const handleTestTake = () => {
    navigate(`/${idTest}`);
  };

  return (
    <>
      <div className={classNames(styles.Header)}>
        <Title className={styles.Title} title={`Привет,  ${user.username}`} />
        <button className={styles.BtnLogout} onClick={handleLogOut}>
          <LogoutOutlined />
          Выйти
        </button>
      </div>

      {user.is_admin && (
        <Link className={classNames(styles.BtnAddTest)} to="/new-test">
          Добавить тест
        </Link>
      )}
      <div className={classNames(styles.TableContainer)}>
        <div className={classNames(styles.TableHead)}>
          <button
            className={classNames(styles.BtnSortTests)}
            onClick={handleToggleSortDirection}
          >
            Сортировать по дате (
            {sortDirection === 'created_at_asc' ? '↑' : '↓'})
          </button>
          <input
            className={styles.Filter}
            type="text"
            placeholder="Название теста"
            value={searchValue}
            onBlur={handleSearchBlur}
            onChange={handleSearchChange}
          />
        </div>

        {isLoad && <Spin />}

        <div className={classNames(styles.TableTest)}>
          {!isLoad &&
            sortedTests.map((test) => (
              <Test test={test} user={user} runTest={runTest} key={test.id} />
            ))}
        </div>

        <ReactPaginate
          previousLabel="←"
          nextLabel="→"
          pageCount={pageCount}
          forcePage={currentPage}
          breakClassName={styles.Break}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={classNames(styles.Pagination, {
            [styles.isLoading]: isLoad,
          })}
          activeClassName={styles.Active}
        />
        <ModalChoice
          width={560}
          title="Начать прохождение теста?"
          isOpen={isModalOpen}
          handleCancel={() => handleModalToggle()}
          handleOk={handleTestTake}
        />
      </div>
    </>
  );
};

export default HomePage;
