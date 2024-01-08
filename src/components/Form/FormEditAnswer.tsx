import classNames from 'classnames';
import { Field, Form, Formik, FormikHelpers } from 'formik';

import { useAppDispatch } from 'hooks';
import { addTestValid, editAnswerValid } from 'utils/validation';

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
  answer?: number;
  question_type: string;
}

const FormEditAnswer: React.FC<Values & Props> = ({
  id,
  text,
  is_right,
  answer,
  position,
  question_type,
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
      validationSchema={editAnswerValid(question_type)}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        const answer: AnswerState = values;
        dispatch(editAnswer(answer));

        setSubmitting(false);
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

          {/* <label className={classNames(styles.EditAnswerText)}>
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
            as={Checkbox}
          /> */}

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
