import { Button, Spin } from 'antd';
import styles from './QuestionEdit.module.sass';
import classNames from 'classnames';
import FormEditQuestions from 'components/Form/FormEditQuestion';
import ModalCmp from 'components/Modal/Modal';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks';
import { deleteQuestion, editQuestion } from 'models/tests';
import { isLoading, isTest } from 'models/tests/selectors';
import { isLoading as loaded } from 'models/tests';
import { AnswerState, QuestState } from 'models/tests/types';
import FormEditQuestion from 'components/Form/FormEditQuestion';
import { editTestValid } from 'utils/validation';

interface Props {
  id: number;
  title: string;
  idTest: number;
  answer: number;
  question_type: string;
}

const QuestionEdit: React.FC<Props> = ({
  id,
  title,
  idTest,
  answer,
  question_type,
}) => {
  const dispatch = useAppDispatch();

  const [editQuestionTitle, setEditQuestionTitle] = useState(title);
  const [isLoad, setIsLoad] = useState(false);
  const [isEditQuestion, setIsEditQuestion] = useState(false);

  const [errorText, setErrorText] = useState('');

  const testTitle = title;
  const isQuestions = useAppSelector(isTest);
  const isQuestion = isQuestions?.questions.find(
    (question) => question.id === id
  );
  const answerCount = isQuestion?.answers?.length || 0;

  const countIsRight =
    isQuestion?.answers?.reduce(
      (count, answer) => (answer.is_right ? count + 1 : count),
      0
    ) || 0;

  console.log(countIsRight);

  const handleModalEditQuestion = () => {
    setIsEditQuestion(!isEditQuestion);
  };

  const handleDeleteQuestion = (id: number) => {
    dispatch(deleteQuestion(id));
  };

  const handleEditQuestion = (title: string, answer: number) => {
    if (
      editTestValid(question_type, answer, countIsRight, setErrorText) === true
    ) {
      setErrorText('');
      if (title === testTitle) {
        setIsEditQuestion(false);
      } else {
        setIsLoad(true);
        dispatch(editQuestion({ answer, id, title, question_type }));
      }
    }
  };

  useEffect(() => {
    if (isQuestion?.title) setIsLoad(false);
    setIsEditQuestion(false);
  }, [isQuestion?.title]);

  return (
    <>
      <div className={styles.Question}>
        <Button onClick={handleModalEditQuestion}>Редактировать</Button>
        <div>{title}</div>
        <Button
          className={styles.ButtonDelete}
          onClick={() => handleDeleteQuestion(id)}
        >
          Удалить
        </Button>
        <ModalCmp
          width={700}
          title={'Редактировать вопрос'}
          content={
            <FormEditQuestion
              id={id}
              idTest={idTest}
              title={title}
              answer={answerCount}
              question_type={question_type}
              setEditQuestionTitle={setEditQuestionTitle}
            />
          }
          isOpen={isEditQuestion}
          handleCancel={handleModalEditQuestion}
          footer={[
            <div className={styles.EditQuestionFooter}>
              {errorText && <p className={styles.ErrorText}>{errorText}</p>}
              <div>
                <Button key="back" onClick={handleModalEditQuestion}>
                  Отмена
                </Button>
                <Button
                  key="submit"
                  type="primary"
                  onClick={() =>
                    handleEditQuestion(editQuestionTitle, answerCount)
                  }
                >
                  {isLoad ? 'Отправка...' : 'Изменить'}
                </Button>
              </div>
            </div>,
          ]}
        />
      </div>
    </>
  );
};

export default QuestionEdit;
