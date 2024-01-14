import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { deleteQuestion, editQuestion } from 'models/tests';
import { isTest } from 'models/tests/selectors';
import { useAppDispatch, useAppSelector } from 'hooks';

import { questionValid } from 'utils/validation';

import { Button } from 'antd';
import CloseOutlined from '@ant-design/icons/lib/icons/CloseOutlined';
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined';

import ModalCmp from 'components/Modal/Modal';
import ModalChoice from 'components/ModalChoice';
import { FormEditQuestion } from 'components/Form';

import styles from './QuestionEdit.module.sass';

interface Props {
  id: number;
  title: string;
  answer: number;
  question_type: string;
}

const QuestionEdit: React.FC<Props> = ({
  id,
  title,
  answer,
  question_type,
}) => {
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [errorQuestion, setErrorQuestion] = useState('');

  const isQuestions = useAppSelector(isTest);
  const isQuestion = isQuestions?.questions.find(
    (question) => question.id === id
  );
  const answerCount = isQuestion?.answers?.length || 0;

  const [prevAnswerCount, setPrevAnswerCount] = useState(answerCount);

  useEffect(() => {
    if (prevAnswerCount !== answerCount) {
      dispatch(editQuestion({ id, title, question_type, answer: answerCount }));
      setPrevAnswerCount(answerCount);
    }
  }, [
    answer,
    answerCount,
    dispatch,
    id,
    prevAnswerCount,
    question_type,
    title,
  ]);

  const countIsRight =
    isQuestion?.answers?.reduce(
      (count, answer) => (answer.is_right ? count + 1 : count),
      0
    ) || 0;

  useEffect(() => {
    questionValid(question_type, answer, countIsRight, setErrorText);

    const validation = questionValid(
      question_type,
      answer,
      countIsRight,
      setErrorQuestion
    );
    if (!validation) {
      setErrorQuestion('Ошибка, исправьте вопрос');
    } else {
      setErrorQuestion('');
    }
  }, [question_type, answer, countIsRight, setErrorQuestion]);

  const handleModalIsOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDeleteQuestion = (id: number) => {
    dispatch(deleteQuestion(id));
  };

  const handleModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  // useEffect(() => {
  //   questionValid(question_type, answer, countIsRight, setErrorText);
  // }, [question_type, answer, countIsRight, setErrorText]);

  const titleModal = (question_type: string) => {
    switch (question_type) {
      case 'single':
        return 'Один из списка';
      case 'multiple':
        return 'Несколько из списка';
      case 'number':
        return 'Численный ответ';
    }
  };

  return (
    <>
      <div
        key={id}
        className={classNames(styles.Question, {
          [styles.QuestionError]: !!errorQuestion && !!errorText,
        })}
      >
        <Button
          size={'large'}
          type="text"
          shape="circle"
          icon={<EditOutlined />}
          onClick={handleModalIsOpen}
        ></Button>
        <div>{title}</div>
        {errorQuestion && errorText && (
          <p className={styles.ErrorText}>{errorQuestion}</p>
        )}
        <Button
          size={'large'}
          type="text"
          danger
          shape="circle"
          icon={<CloseOutlined />}
          className={styles.ButtonDelete}
          onClick={handleModalDelete}
        ></Button>
        <ModalCmp
          width={700}
          title={`Редактировать вопрос - ${titleModal(question_type)}`}
          content={
            <FormEditQuestion
              id={id}
              title={title}
              answer={answerCount}
              countIsRight={countIsRight}
              question_type={question_type}
              setErrorText={setErrorText}
              errorText={errorText}
            />
          }
          isOpen={isModalOpen}
          handleCancel={handleModalIsOpen}
          footer={null}
        />
        <ModalChoice
          width={560}
          title={'Удалить вопрос?'}
          isOpen={modalDelete}
          handleCancel={handleModalDelete}
          handleOk={() => handleDeleteQuestion(id)}
        />
      </div>
    </>
  );
};

export default QuestionEdit;
