import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks';
import { deleteTest, getTest, redirectToHome, toggleModal } from 'models/tests';
import {
  isReady as ready,
  test as editTest,
  isLoading as load,
} from 'models/tests/selectors';

import Select from 'antd/es/select';
import { Button, message } from 'antd';

import { FormEditTestTitle } from 'components/Form';
import { FormAddQuestion } from 'components/Form';
import Modal from 'components/Modal/Modal';
import Spin from 'components/Spin';
import QuestionEdit from 'components/QuestionEdit';
import LinkToHome from 'components/LinkToHome';
import Title from 'components/Title';
import ModalChoice from 'components/ModalChoice';

import styles from './EditTestPage.module.sass';

const options = [
  {
    value: 'single',
    label: 'Один из списка',
  },
  {
    value: 'multiple',
    label: 'Несколько из списка',
  },
  {
    value: 'number',
    label: 'Численный ответ',
  },
];

const EditTestPage = () => {
  const [questionType, setQuestionType] = useState('');
  const [questionTypeError, setQuestionTypeError] = useState('');

  const [modalAdd, setModalAdd] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const test = useAppSelector(editTest);
  const isLoad = useAppSelector(load);
  const isReady = useAppSelector(ready);

  const { id = '' } = useParams();
  const idTest = +id;

  const { title, created_at, questions } = test
    ? test
    : { title: '', created_at: '', questions: [] };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleModalAddQuestion = () => {
    if (questionType) {
      setModalAdd(!modalAdd);
      dispatch(toggleModal());
    } else {
      setQuestionTypeError('Выберите тип вопроса');
    }
  };

  const handleModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  const handleChangeTypeAnswer = useCallback(
    (value: string) => {
      setQuestionType(value);
    },
    [setQuestionType]
  );

  const handleDeleteTest = () => {
    test && dispatch(deleteTest(test.id));
  };

  useEffect(() => {
    if (isReady) {
      navigate('/');
      dispatch(redirectToHome());
    }
  }, [isReady, navigate, dispatch]);

  useEffect(() => {
    if (questionTypeError) {
      message.error(questionTypeError, 2);
      setTimeout(() => {
        setQuestionTypeError('');
      }, 2000);
    }
  }, [questionTypeError]);

  useEffect(() => {
    if (idTest !== 0) {
      dispatch(getTest(idTest));
    }
  }, [dispatch, idTest]);

  return (
    <>
      {isLoad && <Spin />}
      {!isLoad && test ? (
        <>
          <LinkToHome />
          <Title className={styles.TitlePage} title="Редактировать тест" />
          <div className={styles.EditPage}>
            <FormEditTestTitle
              id={idTest}
              // questions={questions}
              title={title}
              // created_at={created_at}
            />
            {questions && questions.length > 0 && (
              <>
                <h2 className={styles.TitleQuestionList}>Список вопросов</h2>
                <div className={styles.QuestionsList}>
                  {questions.map(({ id, title, answer, question_type }) => (
                    <QuestionEdit
                      id={id}
                      title={title}
                      answer={answer}
                      question_type={question_type}
                      key={id}
                    />
                  ))}
                </div>
              </>
            )}
            <div className={styles.AddQuestion}>
              <div className={styles.BtnTypeQuestion}>
                <Select
                  className={styles.BtnTypeQuestion}
                  placeholder="Тип вопроса"
                  onChange={handleChangeTypeAnswer}
                  options={options}
                ></Select>
              </div>
              <Button onClick={handleModalAddQuestion}>Добавить вопрос</Button>
            </div>

            <div className={styles.BtnDeleteTest}>
              <Button danger onClick={handleModalDelete}>
                Удалить тест
              </Button>
            </div>
          </div>
          <Modal
            width={600}
            title="Добавить вопрос"
            content={
              <FormAddQuestion
                question_type={questionType}
                idTest={idTest}
                setIsOpenModal={setModalAdd}
              />
            }
            isOpen={modalAdd}
            handleCancel={handleModalAddQuestion}
            footer={null}
          />
          <ModalChoice
            width={560}
            title="Удалить тест?"
            isOpen={modalDelete}
            handleCancel={handleModalDelete}
            handleOk={handleDeleteTest}
          />
        </>
      ) : (
        <LinkToHome />
      )}
    </>
  );
};
export default EditTestPage;
