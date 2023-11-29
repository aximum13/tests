import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'hooks';
import { signInUser } from 'models/users';
import { UserState } from 'models/users/types';
import { signInValid } from 'utils/validation';

import styles from './Form.module.sass';
import classNames from 'classnames';
import { Button } from 'antd';

type Values = Partial<UserState>;

const FormSignIn = () => {
  const navigate = useNavigate();

  const initialValues: Values = {
    username: '',
    password: '',
  };

  const dispatch = useAppDispatch();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInValid}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        const username = values.username;
        const password = values.password;

        dispatch(
          signInUser({
            username,
            password,
          })
        );

        navigate('/');
        setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <Form className={classNames(styles.FormSignIn)}>
          <label className={classNames(styles.Label)}>
            <Field
              type="text"
              autoComplete="off"
              className={classNames(styles.Field)}
              name="username"
              placeholder="Введите ваше имя"
            />
            {errors.username && touched.username ? (
              <div className={classNames(styles.Error)}>{errors.username}</div>
            ) : null}
          </label>
          <label className={classNames(styles.Label)}>
            <Field
              type="password"
              autoComplete="off"
              className={classNames(styles.Field)}
              name="password"
              placeholder="Введите пароль"
            />
            {errors.password && touched.password ? (
              <div className={classNames(styles.Error)}>{errors.password}</div>
            ) : null}
          </label>

          <Button
            className={classNames(styles.Button)}
            type="primary"
            htmlType="submit"
            size="large"
          >
            Войти
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormSignIn;
