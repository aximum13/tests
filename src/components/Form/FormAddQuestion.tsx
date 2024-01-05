import classNames from 'classnames';
import { Field, Form, Formik, FormikHelpers } from 'formik';

import { useAppDispatch } from 'hooks';
import { addTestValid } from 'utils/validation';

import { Button } from 'antd';
import { createQuestion } from 'models/tests';

import styles from './Form.module.sass';
import { useState } from 'react';

interface QuestionState {
  title: string;
  question_type: string;
  answer: number;
}

interface Props {
  question_type: string;
  idTest: number;
}

const FormAddQuestion: React.FC<Props> = ({ question_type, idTest }) => {
  const initialValues = {
    title: '',
    question_type,
    answer: 0,
  };

  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={editTestValid}
      onSubmit={(
        values: QuestionState,
        { setSubmitting }: FormikHelpers<QuestionState>
      ) => {
        // console.log({
        //   title: values.title,
        //   question_type,
        //   answer: 0,
        //   idTest,
        // });
        dispatch(
          createQuestion({
            title: values.title,
            question_type,
            answer: 0,
          })
        );
        setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <>
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
        </>
      )}
    </Formik>
  );
};

export default FormAddQuestion;
