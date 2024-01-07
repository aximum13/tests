import classNames from 'classnames';
import { Field, Form, Formik, FormikHelpers } from 'formik';

import { useAppDispatch } from 'hooks';
import { addTestValid } from 'utils/validation';

import { Button } from 'antd';
import { createAnswer, editQuestion } from 'models/tests';

import styles from './Form.module.sass';

interface Props {
  idQuestion: number;
  titleQuestion: string;
  question_type: string;
  answer: number;
}

const FormAddAnswer: React.FC<Props> = ({
  idQuestion,
  titleQuestion,
  question_type,
  answer,
}) => {
  const initialValues = {
    text: '',
    is_right: false,
  };

  const dispatch = useAppDispatch();

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
        dispatch(
          createAnswer({
            text: values.text,
            is_right: values.is_right,
            idQuestion,
          })
        );
        dispatch(
          editQuestion({
            id: idQuestion,
            title: titleQuestion,
            question_type,
            answer: answer + 1,
          })
        );
        setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <Form className={classNames(styles.FormAddAnswer)}>
          <label>
            {`Ответ #${answer + 1}`}
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
