import classNames from 'classnames';
import { Field, Form, Formik, FormikHelpers } from 'formik';

import { useAppDispatch } from 'hooks';
import { addTestValid } from 'utils/validation';

import { Button } from 'antd';
import { editAnswer } from 'models/tests';

import styles from './Form.module.sass';
import { AnswerState } from 'models/tests/types';
import { useState } from 'react';

interface Values {
  id: number;
  text: string;
  is_right: boolean;
  position: number;
}

interface Props {
  answer?: number;
}

const FormEditAnswer: React.FC<Values & Props> = ({
  id,
  text,
  is_right,
  answer,
  position,
}) => {
  const [answers, setAnswers] = useState(answer);
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
      // validationSchema={editTestValid}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        const test: AnswerState = values;
        dispatch(editAnswer(test));
        setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <Form className={classNames(styles.FormEditAnswer)}>
          <label className={classNames(styles.EditAnswerText)}>
            {`Ответ #${answers ? answers + 1 : 1}`}
            <Field
              className={classNames(styles.EditAnswerText)}
              type="text"
              autoComplete="off"
              name="text"
              placeholder="Введите ответ"
            />
          </label>
          <Field
            className={classNames(styles.ButtonEditIsRight)}
            type="checkbox"
            name="is_right"
          />

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
