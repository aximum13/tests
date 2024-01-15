import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks';
import { isReady as ready } from 'models/tests/selectors';
import { redirectToHome } from 'models/tests';

import { FormAddTest } from 'components/Form';
import Title from 'components/Title';
import LinkToHome from 'components/LinkToHome';

import styles from './NewTestPage.module.sass';

const NewTestPage = () => {
  const isReady = useAppSelector(ready);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isReady) {
      navigate('/');
      dispatch(redirectToHome());
    }
  }, [isReady, navigate, dispatch]);
  return (
    <>
      <LinkToHome />
      <Title className={styles.Title} title={'Добавить тест'} />
      <FormAddTest />
    </>
  );
};

export default NewTestPage;
