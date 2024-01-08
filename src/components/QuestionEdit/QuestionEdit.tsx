import { Button, Spin } from 'antd';
import styles from './QuestionEdit.module.sass';
import classNames from 'classnames';
import FormEditQuestions from 'components/Form/FormEditQuestions';
import ModalCmp from 'components/Modal/Modal';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks';
import { deleteQuestion, editQuestion } from 'models/tests';
import { isLoading, isTest } from 'models/tests/selectors';
import { isLoading as loaded } from 'models/tests';
import { AnswerState, QuestState } from 'models/tests/types';
import FormEditQuestion from 'components/Form/FormEditQuestion';
import { editTestValid } from 'utils/validation';
import CloseOutlined from '@ant-design/icons/lib/icons/CloseOutlined';
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleModalIsOpen = () => {
    setIsModalOpen(!isModalOpen);
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
        setIsModalOpen(false);
      } else {
        setIsLoad(true);
        dispatch(editQuestion({ answer, id, title, question_type }));
      }
    }
  };

  useEffect(() => {
    if (isQuestion?.title) setIsLoad(false);
    setIsModalOpen(false);
  }, [isQuestion?.title]);

  return (
    <>
      <div key={id} className={styles.Question}>
        <Button
          size={'large'}
          type="text"
          shape="circle"
          icon={<EditOutlined />}
          onClick={handleModalIsOpen}
        ></Button>
        <div>{title}</div>
        <Button
          size={'large'}
          type="text"
          danger
          shape="circle"
          icon={<CloseOutlined />}
          className={styles.ButtonDelete}
          onClick={() => handleDeleteQuestion(id)}
        ></Button>
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
          isOpen={isModalOpen}
          handleCancel={handleModalIsOpen}
          footer={[
            <div key={id} className={styles.EditQuestionFooter}>
              {errorText && <p className={styles.ErrorText}>{errorText}</p>}
              <div>
                <Button onClick={handleModalIsOpen}>Отмена</Button>
                <FormEditQuestions
                  countIsRight={countIsRight}
                  setErrorText={setErrorText}
                  id={id}
                  title={title}
                  question_type={question_type}
                  answer={answerCount}
                />
                {/* <Button
                  key="submit"
                  type="primary"
                  onClick={() =>
                    handleEditQuestion(editQuestionTitle, answerCount)
                  }
                >
                  {isLoad ? 'Отправка...' : 'Изменить'}
                </Button> */}
              </div>
            </div>,
          ]}
        />
      </div>
    </>
  );
};

export default QuestionEdit;
