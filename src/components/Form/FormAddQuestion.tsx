import classNames from 'classnames';
import { Field, Form, Formik, FormikHelpers } from 'formik';

import { useAppDispatch } from 'hooks';
import { questionTitleValid } from 'utils/validation';

import { Button } from 'antd';
import { createQuestion } from 'models/tests';

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

const FormAddQuestion: React.FC<Props> = ({
  question_type,
  idTest,
  setIsOpenModal,
}) => {
  const initialValues: QuestionState = {
    title: '',
    question_type,
    answer: 0,
    idTest,
  };

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
            {question_type === 'single' && (
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
                    <div className={classNames(styles.Error)}>
                      {errors.title}
                    </div>
                  ) : null}
                </label>
              </>
            )}
            {question_type === 'multiple' && (
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
                    <div className={classNames(styles.Error)}>
                      {errors.title}
                    </div>
                  ) : null}
                </label>
              </>
            )}

            {question_type === 'number' && (
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
                    <div className={classNames(styles.Error)}>
                      {errors.title}
                    </div>
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
              Отправить
            </Button>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default FormAddQuestion;
