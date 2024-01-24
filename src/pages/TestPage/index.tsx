import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'hooks';
import { getTest } from 'models/tests';
import { test as testPlay } from 'models/tests/selectors';
import { checkAnswers } from 'utils/checkAnswers';

import { Button } from 'antd';
import Spin from 'components/Spin';
import LinkToHome from 'components/LinkToHome';
import Title from 'components/Title';
import Modal from 'components/Modal';

import {
  QuestionMultiple,
  QuestionNumber,
  QuestionSingle,
} from 'components/QuestionsPlay';

import styles from './TestPage.module.sass';
import { UserAnswersType } from 'models/tests/types';

const TestPage = () => {
  const [userSelectedAnswers, setUserSelectedAnswers] = useState<
    UserAnswersType[]
  >([]);

  const [userRightAnswers, setUserRightAnswers] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const test = useAppSelector(testPlay);

  const { id = '' } = useParams();
  const idTest = +id;

  const { title, questions } = test ? test : { title: '', questions: [] };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSingleAnswerChange = useCallback((id: number, value: number) => {
    setUserSelectedAnswers((prevAnswers) => {
      const isQuestionChecked = prevAnswers.some(
        (answer) => answer.questionId === id
      );

      if (isQuestionChecked) {
        return prevAnswers.map((answer) =>
          answer.questionId === id ? { ...answer, answer: value } : answer
        );
      } else {
        return [...prevAnswers, { questionId: id, answer: value }];
      }
    });
  }, []);

  const isCheckedSingle = useCallback(
    (id: number, value: number) =>
      userSelectedAnswers.some(
        (answer) => answer.questionId === id && answer.answer === value
      ),
    [userSelectedAnswers]
  );

  const handleMultipleAnswerChange = useCallback(
    (id: number, indexAnswer: number) => {
      setUserSelectedAnswers((prevAnswers) => {
        const isCheckedQuestion = prevAnswers.some(
          (answer) => answer.questionId === id
        );

        if (isCheckedQuestion) {
          const updatedAnswers = prevAnswers.map((answer) => {
            if (
              answer.questionId === id &&
              Array.isArray(answer.answer) &&
              !answer.answer.includes(indexAnswer)
            ) {
              return { ...answer, answer: [...answer.answer, indexAnswer] };
            } else if (
              answer.questionId === id &&
              Array.isArray(answer.answer) &&
              answer.answer.includes(indexAnswer)
            ) {
              return {
                ...answer,
                answer: answer.answer.filter((item) => item !== indexAnswer),
              };
            } else {
              return answer;
            }
          });

          return updatedAnswers;
        } else {
          return [...prevAnswers, { questionId: id, answer: [indexAnswer] }];
        }
      });
    },
    []
  );

  const isCheckedMultiple = useCallback(
    (id: number, value: number) =>
      userSelectedAnswers.some(
        (answer) =>
          answer.questionId === id &&
          Array.isArray(answer.answer) &&
          answer.answer.some((answer) => answer === value)
      ),
    [userSelectedAnswers]
  );

  const valueAnswerNumber = useCallback(
    (id: number) => {
      const answer = userSelectedAnswers.find(
        (answer) => answer.questionId === id
      );

      const answerValue =
        answer?.answer && typeof answer.answer === 'number' ? answer.answer : 0;

      return answerValue;
    },
    [userSelectedAnswers]
  );

  const handleModalOpen = useCallback(() => {
    setIsModalOpen(!isModalOpen);
    if (userSelectedAnswers)
      setUserRightAnswers(checkAnswers(userSelectedAnswers, questions));
  }, [isModalOpen, questions, userSelectedAnswers]);

  const handleGetTests = useCallback(() => {
    navigate(`/`);
  }, [navigate]);

  const handleRetakeTest = useCallback(() => {
    setIsModalOpen(!isModalOpen);
    setUserSelectedAnswers([]);
  }, [isModalOpen]);

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
                    {question.answers.map((answer, indexAnswer) => (
                      <QuestionSingle
                        indexAnswer={indexAnswer}
                        questionId={question.id}
                        handleSingleAnswerChange={handleSingleAnswerChange}
                        answer={answer}
                        key={indexAnswer}
                        isChecked={isCheckedSingle(question.id, indexAnswer)}
                      />
                    ))}
                  </>
                )}
                {question.question_type === 'multiple' && (
                  <>
                    {question.answers.map((answer, indexAnswer) => (
                      <QuestionMultiple
                        answer={answer}
                        indexAnswer={indexAnswer}
                        questionId={question.id}
                        isChecked={isCheckedMultiple(question.id, indexAnswer)}
                        key={indexAnswer}
                        handleMultipleAnswerChange={handleMultipleAnswerChange}
                      />
                    ))}
                  </>
                )}
                {question.question_type === 'number' && (
                  <QuestionNumber
                    questionId={question.id}
                    valueAnswerNumber={valueAnswerNumber(question.id)}
                    handleSingleAnswerChange={handleSingleAnswerChange}
                    retryTest={isModalOpen}
                  />
                )}
              </div>
            ))}
          </div>
          <button className={styles.BtnFinishTest} onClick={handleModalOpen}>
            Закончить прохождение теста
          </button>
          <Modal
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
