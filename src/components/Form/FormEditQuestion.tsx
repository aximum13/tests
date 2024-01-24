import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks';
import { test as testEdit } from 'models/tests/selectors';
import { questionValid, questionTitleValid } from 'utils/validation';
import { editQuestion, reorderAnswer } from 'models/tests';
import { QuestionState } from 'models/tests/types';

import { Field, Form, Formik, FormikHelpers } from 'formik';
import { Button } from 'antd';
import AnswerEdit from 'components/AnswerEdit';
import FormAddAnswer from './FormAddAnswer';
import ResetForm from './ResetForm';

import styles from './Form.module.sass';

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';

interface Values {
  id: number;
  title: string;
}

interface Props {
  id: number;
  question_type: string;
  answer: number;
  countIsRight: number;
  errorText: string;
  setErrorText: React.Dispatch<React.SetStateAction<string>>;
}

const FormEditQuestion = ({
  id,
  title,
  question_type,
  answer,
  countIsRight,
  setErrorText,
  errorText,
}: Values & Props) => {
  const [initialValues, setInitialValues] = useState<Values>({
    id,
    title,
  });

  const [showFormAddAnswer, setShowFormAddAnswer] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useAppDispatch();

  const test = useAppSelector(testEdit);
  const idQuestion = id;
  const question = test?.questions.find((question) => question.id === id);

  const handleShowForm = () => {
    setShowFormAddAnswer(true);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const destinationIndex = result.destination.index;
    const draggableIdNumber = Number(result.draggableId);

    dispatch(
      reorderAnswer({ id: draggableIdNumber, position: destinationIndex })
    );
  };

  useEffect(() => {
    questionValid(question_type, answer, countIsRight, setErrorText);
  }, [question_type, answer, countIsRight, setErrorText]);

  return (
    <div className={styles.FormEditQuestion}>
      <Formik
        initialValues={initialValues}
        validationSchema={questionTitleValid}
        enableReinitialize={true}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          const { id, title }: Partial<QuestionState> = values;
          dispatch(editQuestion({ id, title, question_type, answer }));
          setInitialValues(values);
          setSubmitting(false);
          setIsSubmit(true);
        }}
      >
        {({ errors, touched }) => (
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
              Сохранить
            </Button>
            <ResetForm isSubmit={isSubmit} setIsSubmit={setIsSubmit} />
          </Form>
        )}
      </Formik>

      {question && question.question_type !== 'number' && (
        <>
          <h2 className={styles.TitleAnswerList}>Список ответов</h2>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div
                  className={styles.EditAnswerList}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {question &&
                    question.answers.map(
                      ({ text, is_right, id }, index: number) => (
                        <Draggable
                          key={id}
                          draggableId={id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className={styles.AnswerEdit}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <AnswerEdit
                                title={title}
                                answer={answer}
                                id={id}
                                text={text}
                                is_right={is_right}
                                idQuestion={idQuestion}
                                question_type={question_type}
                                index={index}
                              />
                            </div>
                          )}
                        </Draggable>
                      )
                    )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </>
      )}
      {question && question.question_type === 'number' && (
        <>
          {question &&
            question.answers.map(({ text, is_right, id }, index: number) => (
              <AnswerEdit
                title={title}
                answer={answer}
                id={id}
                text={text}
                is_right={is_right}
                idQuestion={idQuestion}
                question_type={question_type}
                index={index}
                key={id}
              />
            ))}
        </>
      )}
      {(question && question.question_type !== 'number') ||
        (question &&
          question.question_type === 'number' &&
          question.answers.length === 0 && (
            <div className={styles.BlockAddAnswer}>
              <Button className={styles.BtnAddAnswer} onClick={handleShowForm}>
                Добавить ответ
              </Button>
              {showFormAddAnswer && question && question.answers && (
                <FormAddAnswer
                  title={title}
                  answer={question.answers.length}
                  idQuestion={id}
                  question_type={question_type}
                  setShowFormAddAnswer={setShowFormAddAnswer}
                />
              )}
            </div>
          ))}
      {errorText && <p className={styles.ErrorText}>{errorText}</p>}
    </div>
  );
};

export default FormEditQuestion;
