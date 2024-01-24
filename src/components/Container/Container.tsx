import { memo } from 'react';
import classNames from 'classnames';
import { Outlet } from 'react-router-dom';

import styles from './Container.module.sass';
const Container = () => {
  return (
    <div className={classNames(styles.Container)}>
      <Outlet />
    </div>
  );
};

export default memo(Container);
