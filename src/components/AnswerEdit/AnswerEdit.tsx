import { useEffect, useState } from 'react';

import { useAppDispatch } from 'hooks';
import { deleteAnswer } from 'models/tests';

import { Button } from 'antd';
import CloseOutlined from '@ant-design/icons/lib/icons/CloseOutlined';
import { FormEditAnswer } from 'components/Form';
import ModalChoice from 'components/ModalChoice';

import styles from './AnswerEdit.module.sass';
import { useFormikContext } from 'formik';

interface Props {
  id: number;
  text: string;
  is_right: boolean;
  index: number;
  idQuestion: number;
  question_type: string;
  isOpenQuestion: boolean;
}

const AnswerEdit: React.FC<Props> = ({
  id,
  text,
  is_right,
  index,
  idQuestion,
  question_type,
  isOpenQuestion,
}) => {
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalIsOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDeleteAnswer = (isIdQuestion: number, id: number) => {
    dispatch(
      deleteAnswer({
        idQuestion: isIdQuestion,
        idAnswer: id,
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
        isOpenQuestion={isOpenQuestion}
      />
      <ModalChoice
        width={560}
        title={'Удалить ответ?'}
        isOpen={isModalOpen}
        handleCancel={handleModalIsOpen}
        handleOk={() => handleDeleteAnswer(idQuestion, id)}
      />
    </div>
  );
};

export default AnswerEdit;
