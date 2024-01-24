import { useState } from 'react';

import { useAppDispatch } from 'hooks';
import { deleteAnswer, editQuestion } from 'models/tests';

import { Button } from 'antd';
import CloseOutlined from '@ant-design/icons/lib/icons/CloseOutlined';
import { FormEditAnswer } from 'components/Form';
import ModalChoice from 'components/ModalChoice';

import styles from './AnswerEdit.module.sass';

interface Props {
  id: number;
  text: string;
  is_right: boolean;
  index: number;
  answer: number;
  idQuestion: number;
  question_type: string;
  title: string;
}

const AnswerEdit = ({
  id,
  text,
  is_right,
  index,
  idQuestion,
  question_type,
  title,
  answer,
}: Props) => {
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalIsOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDeleteAnswer = (id: number) => {
    dispatch(
      deleteAnswer({
        idQuestion,
        idAnswer: id,
      })
    );
    dispatch(
      editQuestion({
        id: idQuestion,
        answer: answer - 1,
        title,
        question_type,
      })
    );
  };

  return (
    <div className={styles.Answer}>
      <Button
        type="text"
        danger
        shape="circle"
        icon={<CloseOutlined />}
        onClick={handleModalIsOpen}
      ></Button>
      <FormEditAnswer
        question_type={question_type}
        id={id}
        text={text}
        is_right={is_right}
        position={index}
      />
      <ModalChoice
        width={560}
        title="Удалить ответ?"
        isOpen={isModalOpen}
        handleCancel={handleModalIsOpen}
        handleOk={() => handleDeleteAnswer(id)}
      />
    </div>
  );
};

export default AnswerEdit;
