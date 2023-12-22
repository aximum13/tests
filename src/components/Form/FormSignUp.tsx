import classNames from 'classnames';
import { Field, Form, Formik, FormikHelpers } from 'formik';

import { useAppDispatch } from 'hooks';
import { createUser } from 'models/users';
import { UserState } from 'models/users/types';
import { signUpValid } from 'utils/validation';

import { Button } from 'antd';

import styles from './Form.module.sass';

type Values = UserState;

const FormSignUp = () => {
  const initialValues: Values = {
    username: '',
    password: '',
    password_confirmation: '',
    is_admin: false,
  };

  const dispatch = useAppDispatch();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signUpValid}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        const username = values.username;
        const password = values.password;
        const password_confirmation = values.password_confirmation;
        const is_admin = false;

        dispatch(
          createUser({
            username,
            password,
            password_confirmation,
            is_admin,
          })
        );

        setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <Form className={classNames(styles.FormSignUp)}>
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

          <label className={classNames(styles.Label)}>
            <Field
              type="password"
              autoComplete="off"
              className={classNames(styles.Field)}
              name="password_confirmation"
              placeholder="Повторите пароль"
            />
            {errors.password_confirmation && touched.password_confirmation ? (
              <div className={classNames(styles.Error)}>
                {errors.password_confirmation}
              </div>
            ) : null}
          </label>

          <Button
            className={classNames(styles.Button)}
            type="primary"
            htmlType="submit"
            size="large"
          >
            Зарегистрироваться
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormSignUp;
