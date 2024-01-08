import classNames from 'classnames';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks';
import { isTest } from 'models/tests/selectors';
import { editQuestionValid } from 'utils/validation';
import { editQuestion, reorderAnswer } from 'models/tests';
import { AnswerState, QuestState } from 'models/tests/types';

import { Field, Form, Formik, FormikHelpers } from 'formik';
import { Button } from 'antd';
import AnswerEdit from 'components/AnswerEdit';
import FormAddAnswer from './FormAddAnswer';

import styles from './Form.module.sass';

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';

interface Values {
  title: string;
}

interface Props {
  idTest: number;
  setEditQuestionTitle: React.Dispatch<React.SetStateAction<string>>;
  question_type: string;
  answer: number;
  id: number;
}

const FormEditQuestions: React.FC<Values & Props> = ({
  id,
  idTest,
  question_type,
  title,
  answer,
  setEditQuestionTitle,
}) => {
  const initialValues: Values = {
    title,
  };

  const [showFormAddAnswer, setShowFormAddAnswer] = useState(false);

  const handleButtonClick = () => {
    setShowFormAddAnswer(true);
  };

  const isIdQuestion = id;

  const test = useAppSelector(isTest);

  const question = test?.questions.find((question) => question.id === id);

  const dispatch = useAppDispatch();

  

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const destinationIndex = result.destination.index;
    const draggableIdNumber = Number(result.draggableId);

    dispatch(
      reorderAnswer({ id: draggableIdNumber, position: destinationIndex })
    );
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={editQuestionValid}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          const question: string = values.title;
          setEditQuestionTitle(question);
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
            {question_type === 'multiple' && (
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

            {question_type === 'number' && (
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
      {question &&
        question.answers &&
        question?.answers?.length > 0 &&
        question.question_type !== 'number' && (
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
                      question.answers &&
                      question.answers.map(
                        ({ text, is_right, id }, index: number) => (
                          <Draggable
                            key={id}
                            draggableId={id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className={styles.EditAnswer}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <AnswerEdit
                                  id={id}
                                  text={text}
                                  is_right={is_right}
                                  idQuestion={isIdQuestion}
                                  titleQuestion={title}
                                  question_type={question_type}
                                  answer={answer}
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

      {question?.question_type === 'number' && (
        <>
          {question &&
            question.answers &&
            question.answers.map(({ text, is_right, id }, index: number) => (
              <AnswerEdit
                id={id}
                text={text}
                is_right={is_right}
                idQuestion={isIdQuestion}
                titleQuestion={title}
                question_type={question_type}
                answer={answer}
                index={index}
              />
            ))}
        </>
      )}

      {question?.question_type !== 'number' ||
      (question?.question_type === 'number' &&
        question.answers &&
        question?.answers?.length === 0) ? (
        <div className={styles.BlockAddAnswer}>
          <Button className={styles.BtnAddAnswer} onClick={handleButtonClick}>
            Добавить ответ
          </Button>
          {showFormAddAnswer && (
            <FormAddAnswer
              idQuestion={id}
              titleQuestion={title}
              question_type={question_type}
              answer={answer}
              setShowFormAddAnswer={setShowFormAddAnswer}
            />
          )}
        </div>
      ) : null}
    </>
  );
};

export default FormEditQuestions;
