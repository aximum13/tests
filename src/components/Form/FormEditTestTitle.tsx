import classNames from 'classnames';

import { useAppDispatch } from 'hooks';
import { testTitleValid } from 'utils/validation';
import { editTest } from 'models/tests';

import { Field, Form, Formik, FormikHelpers } from 'formik';
import { Button } from 'antd';

import styles from './Form.module.sass';

interface Props {
  id: number;
  title: string;
}

const FormEditTestTitle = ({ title, id }: Props) => {
  const dispatch = useAppDispatch();
  const initialValues = {
    id,
    title,
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={testTitleValid}
      onSubmit={(values: Props, { setSubmitting }: FormikHelpers<Props>) => {
        const test: Props = values;
        dispatch(editTest(test));
        setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <Form className={classNames(styles.FormEditTestTitle)}>
          <label
            className={classNames(styles.LabelEdit, styles.LabelTestTitle)}
          >
            Название теста
            <Field
              type="text"
              autoComplete="off"
              className={classNames(styles.FieldEditTestTitle, styles.Field)}
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

export default FormEditTestTitle;
