import classNames from 'classnames';

import { useAppDispatch } from 'hooks';
import { editAnswer } from 'models/tests';
import { answerValid } from 'utils/validation';
import { AnswerState } from 'models/tests/types';

import { Field, Form, Formik, FormikHelpers } from 'formik';
import { Button } from 'antd';
import Checkbox from 'antd/es/checkbox/Checkbox';

import styles from './Form.module.sass';
import React, { useState } from 'react';
import ResetForm from './ResetForm';

interface Values {
  id: number;
  text: string;
  is_right: boolean;
  position: number;
}

interface Props {
  question_type: string;
}

const FormEditAnswer: React.FC<Values & Props> = ({
  id,
  text,
  is_right,
  position,
  question_type,
}) => {
  const [initialValues, setInitialValues] = useState<Values>({
    id,
    text: text.trim(),
    is_right,
    position,
  });

  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useAppDispatch();

  const handleSubmit = (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    const answerEdit: AnswerState = values;

    dispatch(editAnswer(answerEdit));
    setInitialValues(values);
    setSubmitting(true);
    setIsSubmit(true);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={answerValid(question_type)}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ errors, touched, values }) => (
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
            Изменить
          </Button>
          <ResetForm isSubmit={isSubmit} setIsSubmit={setIsSubmit} />
        </Form>
      )}
    </Formik>
  );
};

export default FormEditAnswer;
