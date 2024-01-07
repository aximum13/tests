import { Button, Spin } from 'antd';
import styles from './QuestionEdit.module.sass';
import classNames from 'classnames';
import FormEditQuestions from 'components/Form/FormEditQuestion';
import ModalCmp from 'components/Modal/Modal';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks';
import { deleteQuestion, editQuestion } from 'models/tests';
import { isTest } from 'models/tests/selectors';

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

  const isAnswers = useAppSelector(isTest);

  const isAns = isAnswers?.questions.find((answer) => answer.id === id);

  const answerCount = isAns?.answers?.length || 0;

  const [isEditQuestion, setIsEditQuestion] = useState(false);

  const handleModalEditQuestion = () => {
    setIsEditQuestion(!isEditQuestion);
  };

  const handleDeleteQuestion = (id: number) => {
    dispatch(deleteQuestion(id));
  };

  const handleEditQuestion = (answer: number) => {
    dispatch(editQuestion({ answer, id, title, question_type }));
  };
  return (
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
          <FormEditQuestions
            id={id}
            idTest={idTest}
            title={title}
            answer={answerCount}
            question_type={question_type}
          />
        }
        isOpen={isEditQuestion}
        handleCancel={handleModalEditQuestion}
        footer={[
          <Button key="back" onClick={handleModalEditQuestion}>
            Отмена
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => handleEditQuestion(answerCount)}
          >
            Изменить
          </Button>,
        ]}
      />
    </div>
  );
};

export default QuestionEdit;
