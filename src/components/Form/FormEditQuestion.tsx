import classNames from 'classnames';
import { Field, FieldArray, Form, Formik, FormikHelpers } from 'formik';

import { useAppDispatch, useAppSelector } from 'hooks';
import { addTestValid } from 'utils/validation';

import { Button } from 'antd';

import styles from './Form.module.sass';
import { QuestState, TestState } from 'models/tests/types';
import { useEffect, useState } from 'react';
import FormEditAnswer from './FormEditAnswer';
import FormAddAnswer from './FormAddAnswer';
import { deleteAnswer, editQuestion, reorderAnswer } from 'models/tests';
import { isTest } from 'models/tests/selectors';
import ModalCmp from 'components/Modal/Modal';
import AnswerEdit from 'components/AnswerEdit';

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';

type Values = QuestState;

const FormEditQuestions: React.FC<Values & { idTest: number }> = ({
  id,
  idTest,
  title,
  question_type,
  answer,
}) => {
  const initialValues: Values = {
    id,
    title,
    question_type,
    answer,
  };

  const [showFormAddAnswer, setShowFormAddAnswer] = useState(false); // Состояние для отображения/скрытия формы

  const handleButtonClick = () => {
    setShowFormAddAnswer(true);
  };

  const isIdQuestion = id;

  const isAnswers = useAppSelector(isTest);

  const isAns = isAnswers?.questions.find((answer) => answer.id === id);

  const dispatch = useAppDispatch();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    // Получаем информацию о перемещаемом элементе и пункте назначения
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const draggableIdNumber = Number(result.draggableId);

    // Отправляем запрос на сервер для обновления позиции ответа
    dispatch(
      reorderAnswer({ id: draggableIdNumber, position: destinationIndex })
    );
  };

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
                    type="textarea"
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
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {isAns &&
                isAns.answers &&
                isAns.answers.map(({ text, is_right, id }, index: number) => (
                  <Draggable key={id} draggableId={id.toString()} index={index}>
                    {(provided) => (
                      <div
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
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button onClick={handleButtonClick}>Добавить ответ</Button>
      {showFormAddAnswer && (
        <FormAddAnswer
          idQuestion={id}
          titleQuestion={title}
          question_type={question_type}
          answer={answer}
        />
      )}
    </>
  );
};

export default FormEditQuestions;
