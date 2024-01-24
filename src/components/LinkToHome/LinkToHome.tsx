import { memo } from 'react';
import { Link } from 'react-router-dom';

import styles from './LinkToHome.module.sass';

const LinkToHome = () => {
  return (
    <Link className={styles.LinkToHome} to={'/'}>
      Вернуться на главную
    </Link>
  );
};

export default memo(LinkToHome);
