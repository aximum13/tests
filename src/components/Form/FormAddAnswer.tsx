import classNames from 'classnames';
import { Field, Form, Formik, FormikHelpers } from 'formik';

import { useAppDispatch } from 'hooks';
import { answerValid } from 'utils/validation';

import { Button } from 'antd';
import { createAnswer, editQuestion } from 'models/tests';

import styles from './Form.module.sass';
import Checkbox from 'antd/es/checkbox/Checkbox';

interface Props {
  idQuestion: number;
  question_type: string;
  title: string;
  setShowFormAddAnswer: React.Dispatch<React.SetStateAction<boolean>>;
  answer: number;
}

const FormAddAnswer = ({
  idQuestion,
  question_type,
  setShowFormAddAnswer,
  answer,
  title,
}: Props) => {
  const initialValues = {
    text: '',
    is_right: false,
  };

  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={answerValid(question_type)}
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
        if (question_type !== 'number') {
          dispatch(
            createAnswer({
              text: values.text,
              is_right: values.is_right,
              idQuestion,
            })
          );
        } else
          dispatch(
            createAnswer({
              text: values.text,
              is_right: true,
              idQuestion,
            })
          );

        dispatch(
          editQuestion({
            id: idQuestion,
            answer: answer + 1,
            title,
            question_type,
          })
        );

        setShowFormAddAnswer(false);
        setSubmitting(false);
      }}
    >
      {({ errors, touched, values }) => (
        <Form className={classNames(styles.FormAddAnswer)}>
          {question_type !== 'number' ? (
            <>
              <label className={classNames(styles.LabelAddAnswer)}>
                <Field
                  type="text"
                  autoComplete="off"
                  name="text"
                  placeholder="Введите ответ"
                  className={styles.InputAddAnswer}
                />
                {errors.text && touched.text ? (
                  <div className={classNames(styles.Error)}>{errors.text}</div>
                ) : null}
              </label>
              <label className={classNames(styles.LabelEditIsRight)}>
                {values.is_right ? 'Верно' : 'Неверно'}

                <Field type="checkbox" name="is_right" as={Checkbox} />
              </label>
            </>
          ) : (
            <>
              <label className={classNames(styles.LabelAddAnswer)}>
                <Field
                  type="text"
                  autoComplete="off"
                  name="text"
                  placeholder="Введите ответ"
                  className={styles.InputAddAnswer}
                />
                {errors.text && touched.text ? (
                  <div className={classNames(styles.Error)}>{errors.text}</div>
                ) : null}
              </label>
            </>
          )}

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
