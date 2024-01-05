import classNames from 'classnames';
import { Field, FieldArray, Form, Formik, FormikHelpers } from 'formik';

import { useAppDispatch } from 'hooks';
import { addTestValid } from 'utils/validation';

import { Button } from 'antd';

import styles from './Form.module.sass';
import { QuestState, TestState } from 'models/tests/types';
import { useState } from 'react';
import FormEditAnswer from './FormEditAnswer';
import FormAddAnswer from './FormAddAnswer';
import { editQuestion } from 'models/tests';

type Values = QuestState;

const FormEditQuestions: React.FC<Values & { idTest: number }> = ({
  id,
  idTest,
  title,
  question_type,
  answer,
}) => {
  const [answers, setAnswers] = useState(answer);
  const initialValues: Values = {
    id,
    title,
    question_type,
    answer: answers,
  };

  const [showFormAddAnswer, setShowFormAddAnswer] = useState(false); // Состояние для отображения/скрытия формы

  const handleButtonClick = () => {
    setShowFormAddAnswer(true);
  };

  const dispatch = useAppDispatch();

  // console.log(title, question_type, answers);

  return (
    <>
      <Formik
        initialValues={initialValues}
        // validationSchema={editTestValid}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          const question: QuestState = values;
          dispatch(editQuestion(question));
          setSubmitting(false);
        }}
      >
        {({ errors, touched }) => (
          <Form className={classNames(styles.FormEdit)}>
            {question_type === 'single' && (
              <>
                <label className={classNames(styles.LabelEdit)}>
                  <Field
                    type="text"
                    autoComplete="off"
                    className={classNames(styles.FieldEdit, styles.Field)}
                    name="title"
                    placeholder="Введите вопрос"
                  />
                  {errors.title && touched.title ? (
                    <div className={classNames(styles.Error)}>
                      {errors.title}
                    </div>
                  ) : null}
                </label>
              </>
            )}
            {/* {question_type === 'multiple' && (
            <>
              {' '}
              <label className={classNames(styles.LabelEdit)}>
                <Field
                  type="text"
                  autoComplete="off"
                  className={classNames(styles.FieldEdit, styles.Field)}
                  name="title"
                  placeholder="Введите вопрос"
                />
                {errors.title && touched.title ? (
                  <div className={classNames(styles.Error)}>{errors.title}</div>
                ) : null}
              </label>
            </>
          )}

          {question_type === 'number' && (
            <>
              {' '}
              <label className={classNames(styles.LabelEdit)}>
                <Field
                  type="text"
                  autoComplete="off"
                  className={classNames(styles.FieldEdit, styles.Field)}
                  name="title"
                  placeholder="Введите вопрос"
                />
                {errors.title && touched.title ? (
                  <div className={classNames(styles.Error)}>{errors.title}</div>
                ) : null}
              </label>
            </>
          )} */}

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
      <button onClick={handleButtonClick}>Добавить ответ</button>
      {showFormAddAnswer && (
        <FormAddAnswer answers={answers} idTest={idTest} idQuestion={id} />
      )}
    </>
  );
};

export default FormEditQuestions;
