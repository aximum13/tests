import classNames from 'classnames';
import { Field, Form, Formik, FormikHelpers } from 'formik';

import { useAppDispatch } from 'hooks';
import { answerValid, editQuestionValid } from 'utils/validation';

import { Button } from 'antd';
import { editAnswer } from 'models/tests';

import styles from './Form.module.sass';
import { AnswerState } from 'models/tests/types';
import { useState } from 'react';
import Checkbox from 'antd/es/checkbox/Checkbox';

interface Values {
  id: number;
  text: string;
  is_right: boolean;
  position: number;
}

interface Props {
  answer: number;
  question_type: string;
  setErrorText: React.Dispatch<React.SetStateAction<string>>;
  countIsRight: number;
}

const FormEditAnswer: React.FC<Values & Props> = ({
  id,
  text,
  is_right,
  answer,
  position,
  question_type,
  setErrorText,
  countIsRight,
}) => {
  const initialValues: Values = {
    id,
    text,
    is_right,
    position,
  };

  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={answerValid(question_type)}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        const answerEdit: AnswerState = values;
        dispatch(editAnswer(answerEdit));
        setSubmitting(false);
        // editQuestionValid(question_type, answer, countIsRight, setErrorText);
      }}
    >
      {({ errors, touched }) => (
        <Form className={classNames(styles.FormEditAnswer)}>
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
            Изменить
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormEditAnswer;
