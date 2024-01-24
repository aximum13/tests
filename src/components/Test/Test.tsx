import { memo } from 'react';
import { Link } from 'react-router-dom';

import styles from './Test.module.sass';
import { TestState } from 'models/tests/types';
import classNames from 'classnames';
import { validTest } from 'utils/validation';
import { formatDateTime } from 'utils/formatedDate';
import { UserState } from 'models/users/types';

interface Props {
  test: TestState;
  user: UserState;
  runTest: (id: number) => void;
}

const Test = ({ test, user, runTest }: Props) => {
  return (
    <div
      key={test.id}
      className={classNames(styles.TestItem, {
        [styles.TestItemUser]: !user.is_admin,
      })}
    >
      {validTest(test) ? (
        <button
          className={classNames(styles.TestTitle)}
          onClick={() => runTest(test.id)}
        >
          {test.title}
        </button>
      ) : (
        <p className={styles.noValidTest}>{test.title} - в разработке</p>
      )}
      <p className={classNames(styles.TestCreatedAt)}>
        {formatDateTime(test.created_at)}
      </p>
      {user?.is_admin && (
        <Link className={styles.TextDetail} to={`edit/${test.id}`}>
          Редактировать тест
        </Link>
      )}
    </div>
  );
};

export default memo(Test);
