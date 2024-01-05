import classNames from 'classnames';
import { Field, Form, Formik, FormikHelpers } from 'formik';

import { useAppDispatch } from 'hooks';
import { addTestValid } from 'utils/validation';

import { Button } from 'antd';
import { createAnswer } from 'models/tests';

import styles from './Form.module.sass';

interface Props {
  answers: number;
  idQuestion: number;
  idTest: number;
}

const FormAddAnswer: React.FC<Props> = ({ answers, idQuestion, idTest }) => {
  const initialValues = {
    text: '',
    is_right: false,
  };

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={editTestValid}
      onSubmit={(
        values: {
          text: string;
          is_right: boolean;
        },
        {
          setSubmitting,
        }: FormikHelpers<{
          text: string;
          is_right: boolean;
        }>
      ) => {
        createAnswer({
          text: values.text,
          is_right: values.is_right,
        });
        setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <Form className={classNames(styles.FormEdit)}>
          <label>
            {`Ответ #${answers + 1}`}
            <Field
              type="text"
              autoComplete="off"
              name="text"
              placeholder="Введите ответ"
            />
          </label>
          <Field type="checkbox" name="is_right" />

          <Button
            className={classNames(styles.ButtonEdit)}
            type="primary"
            htmlType="submit"
            size="large"
          >
            Добавить
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormAddAnswer;
