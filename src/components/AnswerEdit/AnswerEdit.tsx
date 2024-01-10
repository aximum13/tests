import { Button, Spin } from 'antd';
import styles from './AnswerEdit.module.sass';
import classNames from 'classnames';
import FormEditQuestions from 'components/Form/FormEditQuestion';
import ModalCmp from 'components/Modal/Modal';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks';
import { deleteAnswer, deleteQuestion, editQuestion } from 'models/tests';
import { isTest } from 'models/tests/selectors';
import FormEditAnswer from 'components/Form/FormEditAnswer';
import { AnswerState } from 'models/tests/types';
import CloseOutlined from '@ant-design/icons/lib/icons/CloseOutlined';

interface Props {
  id: number;
  text: string;
  is_right: boolean;
  setErrorText: React.Dispatch<React.SetStateAction<string>>;

  answer: number;
  index: number;
  idQuestion: number;
  countIsRight: number;
  titleQuestion: string;
  question_type: string;
}

const AnswerEdit: React.FC<Props> = ({
  id,
  text,
  is_right,
  index,
  idQuestion,
  titleQuestion,
  question_type,
  answer,
  countIsRight,
  setErrorText,
}) => {
  const dispatch = useAppDispatch();

  const handleDeleteAnswer = (isIdQuestion: number, id: number) => {
    dispatch(
      deleteAnswer({
        idQuestion: isIdQuestion,
        idAnswer: id,
      })
    );
  };

  return (
    <div className={styles.Question}>
      <Button
        type="text"
        danger
        shape="circle"
        icon={<CloseOutlined />}
        onClick={() => handleDeleteAnswer(idQuestion, id)}
      ></Button>
      <FormEditAnswer
        question_type={question_type}
        id={id}
        text={text}
        is_right={is_right}
        answer={answer}
        position={index}
        setErrorText={setErrorText}
        countIsRight={countIsRight}
      />
    </div>
  );
};

export default AnswerEdit;
