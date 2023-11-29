import { Spin } from 'antd';
import styles from './Spin.module.sass'
import classNames from 'classnames';

const Loader: React.FC = () => {
  return <Spin className={classNames(styles.Spin)} />;
};

export default Loader;
