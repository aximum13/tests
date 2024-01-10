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
  titleQuestion: string;
  question_type: string;
  answer: number;
  setShowFormAddAnswer: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormAddAnswer: React.FC<Props> = ({
  idQuestion,
  titleQuestion,
  question_type,
  answer,
  setShowFormAddAnswer,
}) => {
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
        dispatch(
          createAnswer({
            text: values.text,
            is_right: values.is_right,
            idQuestion,
          })
        );

        setShowFormAddAnswer(false);
        setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
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
              <Field
                className={styles.ButtonAddIsRight}
                type="checkbox"
                name="is_right"
                as={Checkbox}
              />
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
