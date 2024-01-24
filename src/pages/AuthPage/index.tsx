import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { useAppSelector } from 'hooks';
import { error as errorText } from 'models/users/selectors';

import Title from 'components/Title';
import { FormSignUp, FormSignIn } from 'components/Form';
import message from 'antd/es/message';

import styles from './AuthPage.module.sass';

const AuthPage = () => {
  const [signUp, setSignUp] = useState(false);

  const error = useAppSelector(errorText);

  useEffect(() => {
    error && message.error(error, 4);
  });

  const handleAuth = () => {
    setSignUp(!signUp);
  };

  return (
    <div className={classNames(styles.Layout)}>
      <Title title={signUp ? 'Регистрация' : 'Авторизация'} />
      {signUp ? <FormSignUp /> : <FormSignIn />}
      <p className={classNames(styles.LinkText)}>
        {signUp ? 'Уже зарегистрированы? ' : 'Нет аккаунта? '}
        <button
          className={classNames(styles.Link)}
          onClick={() => handleAuth()}
        >
          {signUp ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </p>
    </div>
  );
};

export default AuthPage;
