import { Link } from 'react-router-dom';

import styles from './LinkToHome.module.sass';

const LinkToHome: React.FC = () => {
  return (
    <Link className={styles.LinkToHome} to={'/'}>
      Вернуться на главную
    </Link>
  );
};

export default LinkToHome;
