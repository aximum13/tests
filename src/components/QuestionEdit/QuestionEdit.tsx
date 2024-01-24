import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { deleteQuestion, toggleModal } from 'models/tests';
import { test } from 'models/tests/selectors';
import { useAppDispatch, useAppSelector } from 'hooks';

import { questionValid } from 'utils/validation';

import { Button } from 'antd';
import CloseOutlined from '@ant-design/icons/lib/icons/CloseOutlined';
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined';

import Modal from 'components/Modal/Modal';
import ModalChoice from 'components/ModalChoice';
import { FormEditQuestion } from 'components/Form';

import styles from './QuestionEdit.module.sass';

interface Props {
  id: number;
  title: string;
  answer: number;
  question_type: string;
}

const QuestionEdit = ({ id, title, answer, question_type }: Props) => {
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [errorQuestion, setErrorQuestion] = useState('');

  const isQuestions = useAppSelector(test);

  const isQuestion = isQuestions?.questions.find(
    (question) => question.id === id
  );

  const countIsRight =
    isQuestion?.answers?.reduce(
      (count, answer) => (answer.is_right ? count + 1 : count),
      0
    ) || 0;

  const handleModalIsOpen = () => {
    setIsModalOpen(!isModalOpen);
    dispatch(toggleModal());
  };

  const handleModalIsClose = () => {
    setIsModalOpen(false);
    dispatch(toggleModal());
  };

  const handleDeleteQuestion = (id: number) => {
    dispatch(deleteQuestion(id));
  };

  const handleModalDelete = () => {
    setModalDelete(!modalDelete);
  };

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
  }, [answer, countIsRight, question_type, setErrorQuestion]);

  return (
    <>
      <div
        key={id}
        className={classNames(styles.Question, {
          [styles.QuestionError]: !!errorQuestion && !!errorText,
        })}
      >
        <Button
          size="large"
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
          size="large"
          type="text"
          danger
          shape="circle"
          icon={<CloseOutlined />}
          className={styles.ButtonDelete}
          onClick={handleModalDelete}
        ></Button>
        <Modal
          width={700}
          title={`Редактировать вопрос - ${titleModal(question_type)}`}
          content={
            <FormEditQuestion
              id={id}
              title={title}
              answer={answer}
              countIsRight={countIsRight}
              question_type={question_type}
              setErrorText={setErrorText}
              errorText={errorText}
            />
          }
          isOpen={isModalOpen}
          handleCancel={handleModalIsClose}
          footer={null}
        />
        <ModalChoice
          width={560}
          title="Удалить вопрос?"
          isOpen={modalDelete}
          handleCancel={handleModalDelete}
          handleOk={() => handleDeleteQuestion(id)}
        />
      </div>
    </>
  );
};

export default QuestionEdit;
