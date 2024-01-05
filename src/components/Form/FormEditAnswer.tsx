import classNames from 'classnames';
import { Field, FieldArray, Form, Formik, FormikHelpers } from 'formik';

import { useAppDispatch } from 'hooks';
import { addTestValid } from 'utils/validation';

import { Button } from 'antd';
import {
  createAnswer,
  createQuestion,
  createTest,
  editTest,
} from 'models/tests';

import styles from './Form.module.sass';
import { AnswerState, QuestState, TestState } from 'models/tests/types';
import { useState } from 'react';

type Values = AnswerState & { answer: number };

const FormEditAnswer: React.FC<Values> = ({ id, text, is_right, answer }) => {
  const [answers, setAnswers] = useState(answer);
  const initialValues: Values = {
    id,
    answer: answers,
    text,
    is_right,
  };

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={editTestValid}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        const test: AnswerState = values;
        // createAnswer(test);
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
              name="answer"
              placeholder="Введите ответ"
            />
          </label>
          <Field type="radio" id={`answers.${answers}`} name="answers" />

          <Button
            className={classNames(styles.ButtonEdit)}
            type="primary"
            htmlType="submit"
            size="large"
          >
            Сохранить
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormEditAnswer;
