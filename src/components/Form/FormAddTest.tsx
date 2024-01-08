import classNames from 'classnames';
import { Field, Form, Formik, FormikHelpers } from 'formik';

import { useAppDispatch } from 'hooks';
import { testTitleValid } from 'utils/validation';

import { Button } from 'antd';
import { createTest } from 'models/tests';

import styles from './Form.module.sass';
import { useNavigate } from 'react-router-dom';

const FormAddTest = () => {
  const initialValues = {
    title: '',
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={testTitleValid}
      onSubmit={(
        values: {
          title: string;
        },
        {
          setSubmitting,
        }: FormikHelpers<{
          title: string;
        }>
      ) => {
        const title: string = values.title;

        dispatch(createTest(title));

        setSubmitting(false);

        navigate('/');
      }}
    >
      {({ errors, touched }) => (
        <Form className={classNames(styles.FormSignUp)}>
          <label className={classNames(styles.Label)}>
            <Field
              type="text"
              autoComplete="off"
              className={classNames(styles.Field)}
              name="title"
              placeholder="Название теста"
            />
            {errors.title && touched.title ? (
              <div className={classNames(styles.Error)}>{errors.title}</div>
            ) : null}
          </label>

          <Button
            className={classNames(styles.Button)}
            type="primary"
            htmlType="submit"
            size="large"
          >
            Создать
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormAddTest;
