import classNames from 'classnames';
import { Outlet } from 'react-router-dom';

import styles from './Container.module.sass';
const Container: React.FC = () => {
  return (
    <div className={classNames(styles.Container)}>
      <Outlet />
    </div>
  );
};

export default Container;
