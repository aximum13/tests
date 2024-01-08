import classNames from 'classnames';
import { Field, Form, Formik, FormikHelpers } from 'formik';

import { useAppDispatch } from 'hooks';
import { testTitleValid } from 'utils/validation';

import { Button } from 'antd';
import { createTest, editTest } from 'models/tests';

import styles from './Form.module.sass';
import { QuestState, TestState } from 'models/tests/types';
import { createAnswer } from '../../models/tests';

const FormEditTitle: React.FC<TestState> = ({
  title,
  created_at,
  id,
  questions,
}) => {
  const dispatch = useAppDispatch();
  const initialValues = {
    title,
    created_at,
    id,
    questions,
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={testTitleValid}
      onSubmit={(
        values: TestState,
        { setSubmitting }: FormikHelpers<TestState>
      ) => {
        const test: TestState = values;
        dispatch(editTest(test));
        setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <Form className={classNames(styles.FormEditTitleTest)}>
          <label className={classNames(styles.LabelEdit)}>
            Изменить название теста
            <Field
              type="text"
              autoComplete="off"
              className={classNames(styles.FieldEdit, styles.Field)}
              name="title"
              placeholder="Название теста"
            />
            {errors.title && touched.title ? (
              <div className={classNames(styles.Error)}>{errors.title}</div>
            ) : null}
          </label>

          <Button
            className={classNames(styles.ButtonEdit)}
            type="primary"
            htmlType="submit"
            size="large"
          >
            Изменить
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormEditTitle;
