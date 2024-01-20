import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'hooks';
import { getTest } from 'models/tests';
import { isTest } from 'models/tests/selectors';
import { isQuestionId, isUserAnswers } from 'models/playTests/selectors';
import { clearAnswers, getQuestion, setAnswer } from 'models/playTests';
import { checkAnswers } from 'utils/checkAnswers';

import { Button } from 'antd';
import LinkToHome from 'components/LinkToHome';
import Title from 'components/Title';
import ModalCmp from 'components/Modal';

import {
  QuestionMultiple,
  QuestionNumber,
  QuestionSingle,
} from 'components/QuestionsPlay';

import styles from './TestPage.module.sass';
import Spin from 'components/Spin';

const TestPage = () => {
  const [multipleAnswers, setMultipleAnswers] = useState<{
    [key: number]: { id: number; value: number }[];
  }>({});

  const [numberAnswers, setNumberAnswers] = useState<{
    [key: number]: number;
  }>({});

  const [userRightAnswers, setUserRightAnswers] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const test = useAppSelector(isTest);

  const userSelectedAnswers = useAppSelector(isUserAnswers);
  const questionId = useAppSelector(isQuestionId);

  const { id } = useParams();
  const idTest = id ? parseInt(id) : 0;
  const { title, questions } = test ? test : { title: '', questions: [] };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSingleAnswerChange = (id: number, value: number) => {
    dispatch(setAnswer({ questionId: id, answer: value }));
    id !== questionId && dispatch(getQuestion(id));
  };

  const handleMultipleAnswerChange = (
    id: number,
    indexAnswer: number,

    multipleAnswers: {
      id: number;
      value: number;
    }[]
  ) => {
    setMultipleAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers[id] || [];
      const isChecked = updatedAnswers.some(
        (answer) => answer.value === indexAnswer
      );

      if (isChecked) {
        const filteredAnswers = updatedAnswers.filter(
          (answer) => answer.value !== indexAnswer
        );
        return {
          ...prevAnswers,
          [id]: filteredAnswers,
        };
      } else {
        return {
          ...prevAnswers,
          [id]: [...updatedAnswers, { id: id, value: indexAnswer }],
        };
      }
    });

    if (questionId !== id) {
      dispatch(getQuestion(id));
    }

    handleMultipleAnswerSubmit(id, multipleAnswers);
  };

  const handleMultipleAnswerSubmit = (
    id: number,
    multipleAnswers: {
      id: number;
      value: number;
    }[]
  ) => {
    dispatch(
      setAnswer({
        questionId: id,
        answer: multipleAnswers,
      })
    );
  };

  const handleNumberChange = (value: number, id: number) => {
    setNumberAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: value,
    }));
  };

  const handleKeyDownNumber = (
    event: React.KeyboardEvent<HTMLInputElement>,
    id: number,
    numberAnswer: number
  ) => {
    if (event.key === 'Enter') {
      handleSingleAnswerChange(id, numberAnswer);
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
    if (userSelectedAnswers)
      setUserRightAnswers(checkAnswers(userSelectedAnswers, questions));
  };

  const handleGetTests = () => {
    navigate(`/`);
  };

  const handleRetakeTest = () => {
    setNumberAnswers([]);
    setMultipleAnswers([]);
    setIsModalOpen(!isModalOpen);
    dispatch(clearAnswers());
  };

  useEffect(() => {
    if (idTest !== 0) {
      dispatch(getTest(idTest));
    }
  }, [dispatch, idTest]);

  return (
    <div>
      <LinkToHome />

      {!test ? (
        <Spin />
      ) : (
        <>
          <Title className={styles.TestTitle} title={title}></Title>
          <div className={styles.QuestionList}>
            {questions.map((question, indexQuestion) => (
              <div key={question.id} className={styles.QuestionItem}>
                <p className={styles.QuestionTitle}>
                  {indexQuestion + 1}. {question.title}
                </p>
                {question.question_type === 'single' && (
                  <>
                    {question.answers?.map((answer, indexAnswer) => (
                      <QuestionSingle
                        indexAnswer={indexAnswer}
                        userSelectedAnswers={userSelectedAnswers}
                        questionId={question.id}
                        handleSingleAnswerChange={handleSingleAnswerChange}
                        answer={answer}
                        key={indexAnswer}
                      />
                    ))}
                  </>
                )}
                {question.question_type === 'multiple' && (
                  <>
                    {question.answers?.map((answer, indexAnswer) => (
                      <QuestionMultiple
                        answer={answer}
                        indexAnswer={indexAnswer}
                        questionId={question.id}
                        multipleAnswers={multipleAnswers}
                        key={indexAnswer}
                        handleMultipleAnswerChange={handleMultipleAnswerChange}
                      />
                    ))}
                  </>
                )}
                {question.question_type === 'number' && (
                  <QuestionNumber
                    questionId={question.id}
                    numberAnswers={numberAnswers}
                    handleNumberChange={handleNumberChange}
                    handleKeyDownNumber={handleKeyDownNumber}
                    handleSingleAnswerChange={handleSingleAnswerChange}
                  />
                )}
              </div>
            ))}
          </div>
          <button className={styles.BtnFinishTest} onClick={handleModalOpen}>
            Закончить прохождение теста
          </button>
          <ModalCmp
            width={560}
            isOpen={isModalOpen}
            handleCancel={handleRetakeTest}
            content={
              <div>
                <h3 className={styles.ModalTitle}>Результат прохождения:</h3>
                <div className={styles.ModalInfo}>
                  <p className={styles.ModalText}>
                    Количество правильных ответов: {userRightAnswers}
                  </p>
                  <p className={styles.ModalText}>
                    Количество всех вопросов: {questions.length}
                  </p>
                </div>
              </div>
            }
            footer={[
              <div key="buttons" className={styles.BtnGroup}>
                <Button size="large" type="primary" onClick={handleGetTests}>
                  На главную
                </Button>
                <Button size="large" onClick={handleRetakeTest}>
                  Ещё раз
                </Button>
              </div>,
            ]}
          />
        </>
      )}
    </div>
  );
};

export default TestPage;
