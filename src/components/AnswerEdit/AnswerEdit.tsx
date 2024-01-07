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

interface Props {
  id: number;
  text: string;
  is_right: boolean;

  answer: number;
  index: number;
  idQuestion: number;
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
}) => {
  const dispatch = useAppDispatch();

  const handleDeleteAnswer = (isIdQuestion: number, id: number) => {
    dispatch(
      deleteAnswer({
        idQuestion: isIdQuestion,
        idAnswer: id,
      })
    );
    dispatch(
      editQuestion({
        id: idQuestion,
        title: titleQuestion,
        question_type,
        answer: answer - 1,
      })
    );
  };

  return (
    <div className={styles.Question}>
      <Button onClick={() => handleDeleteAnswer(idQuestion, id)}>
        Удалить
      </Button>
      <FormEditAnswer
        id={id}
        text={text}
        is_right={is_right}
        answer={index}
        position={index}
      />
    </div>
  );
};

export default AnswerEdit;
