import classNames from 'classnames';
import { Field, Form, Formik, FormikHelpers } from 'formik';

import { useAppDispatch } from 'hooks';
import { answerValid, editTestValid } from 'utils/validation';

import { Button } from 'antd';
import { editAnswer, editQuestion } from 'models/tests';

import styles from './Form.module.sass';
import { AnswerState, QuestState } from 'models/tests/types';
import { useState } from 'react';
import Checkbox from 'antd/es/checkbox/Checkbox';

interface Values {
  id: number;
  title: string;
  question_type: string;
  answer: number;
  answers?: AnswerState[] | undefined;
}

interface Props {
  countIsRight: number;
  setErrorText: React.Dispatch<React.SetStateAction<string>>;
}

const FormEditQuestions: React.FC<Values & Props> = ({
  id,
  title,
  question_type,
  answer,
  countIsRight,
  setErrorText,
}) => {
  const initialValues: Values = {
    id,
    title,
    question_type,
    answer: answer,
  };

  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(
        values: Values,
        { setSubmitting, setFieldValue }: FormikHelpers<Values>
      ) => {
        if (
          editTestValid(question_type, answer, countIsRight, setErrorText) ===
          true
        ) {
          //   setFieldValue('answer', answer);
          console.log(values.answer, answer);
          setErrorText('');
          dispatch(editQuestion({ answer, title, id, question_type }));
        }

        setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <Form className={classNames(styles.FormEditAnswer)}>
          <Button
            className={classNames(styles.ButtonEdit)}
            type="primary"
            htmlType="submit"
            size="large"
          >
            Изменить тест
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormEditQuestions;
