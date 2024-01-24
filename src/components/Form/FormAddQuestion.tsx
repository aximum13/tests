import classNames from 'classnames';
import { useState } from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';

import { useAppDispatch } from 'hooks';
import { questionTitleValid } from 'utils/validation';

import { Button } from 'antd';
import { createQuestion } from 'models/tests';

import ResetForm from './ResetForm';

import styles from './Form.module.sass';

interface QuestionState {
  title: string;
  question_type: string;
  answer: number;
  idTest: number;
}

interface Props {
  question_type: string;
  idTest: number;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormAddQuestion = ({ question_type, idTest, setIsOpenModal }: Props) => {
  const initialValues: QuestionState = {
    title: '',
    question_type,
    answer: 0,
    idTest,
  };

  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={questionTitleValid}
      onSubmit={(
        values: QuestionState,
        { setSubmitting }: FormikHelpers<QuestionState>
      ) => {
        setSubmitting(true);
        dispatch(
          createQuestion({
            title: values.title,
            question_type,
            answer: 0,
            idTest,
          })
        );
        setIsOpenModal(false);
        setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <>
          <Form className={classNames(styles.FormQuestion)}>
            <>
              <label className={classNames(styles.LabelQuestion)}>
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

            <Button
              className={classNames(styles.ButtonEdit)}
              type="primary"
              htmlType="submit"
              size="large"
            >
              Отправить
            </Button>
          </Form>
          <ResetForm isSubmit={isSubmit} setIsSubmit={setIsSubmit} />
        </>
      )}
    </Formik>
  );
};

export default FormAddQuestion;
